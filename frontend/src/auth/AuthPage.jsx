import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("choose"); // "choose" | "email"
  const [authType, setAuthType] = useState("login"); // "login" | "signup"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleEmailContinue = () => {
    setMode("email");
    setError("");
  };

  const handleBack = () => {
    setMode("choose");
    setError("");
    setSuccess("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const BASE = import.meta.env.VITE_API_URL || "";
    const endpoint = authType === "signup" ? `${BASE}/api/auth/signup` : `${BASE}/api/auth/login`;
    const body =
      authType === "signup"
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong");
      } else {
        localStorage.setItem("bhava_token", data.token);
        localStorage.setItem("bhava_user", JSON.stringify(data.user));
        setSuccess(
          authType === "signup"
            ? `Welcome to Bhava, ${data.user.name}!`
            : `Welcome back, ${data.user.name}!`
        );
        setTimeout(() => navigate("/"), 1500);
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Temple Background */}
      <div className={styles.bgWrapper}>
        <img
          src="/temple(4).jpeg"
          alt="Temple"
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Floating particles */}
      <div className={styles.particles}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.particle} style={{ "--i": i }} />
        ))}
      </div>

      {/* Close / Back button */}
      <button className={styles.closeBtn} onClick={() => navigate(-1)} aria-label="Close">
        &#x2715;
      </button>

      {/* Card */}
      <div className={`${styles.card} ${mode === "email" ? styles.cardExpanded : ""}`}>
        {/* Logo / Om symbol */}
        <div className={styles.omSymbol}>ॐ</div>

        <h1 className={styles.title}>Bhava</h1>
        <p className={styles.subtitle}>
          {mode === "choose"
            ? "Choose your path below"
            : authType === "login"
            ? "Sign in to your sacred space"
            : "Begin your spiritual journey"}
        </p>

        {/* CHOOSE MODE */}
        {mode === "choose" && (
          <div className={styles.chooseSection}>
            {/* Continue with Email */}
            <button
              className={styles.btnEmail}
              onClick={handleEmailContinue}
            >
              Continue with Email
            </button>

            {/* Continue with Google */}
            <button className={styles.btnSocial}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Continue with Apple */}
            <button className={styles.btnSocial}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>

            <div className={styles.dividerLine} />
            <p className={styles.termsText}>
              By using Bhava you agree to our{" "}
              <span className={styles.termsLink}>Terms of Service</span> and{" "}
              <span className={styles.termsLink}>Privacy Policy</span>
            </p>
          </div>
        )}

        {/* EMAIL MODE */}
        {mode === "email" && (
          <div className={styles.emailSection}>
            {/* Tab toggle */}
            <div className={styles.tabRow}>
              <button
                className={`${styles.tab} ${authType === "login" ? styles.tabActive : ""}`}
                onClick={() => { setAuthType("login"); setError(""); }}
              >
                Sign In
              </button>
              <button
                className={`${styles.tab} ${authType === "signup" ? styles.tabActive : ""}`}
                onClick={() => { setAuthType("signup"); setError(""); }}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {authType === "signup" && (
                <div className={styles.inputGroup}>
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              )}

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus={authType === "login"}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}
              {success && <p className={styles.successMsg}>{success}</p>}

              <button
                type="submit"
                className={styles.btnSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinner} />
                ) : authType === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <button className={styles.backBtn} onClick={handleBack}>
              &#8592; Other options
            </button>

            <p className={styles.termsText}>
              By using Bhava you agree to our{" "}
              <span className={styles.termsLink}>Terms of Service</span> and{" "}
              <span className={styles.termsLink}>Privacy Policy</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
