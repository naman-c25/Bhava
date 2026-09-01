import { useEffect, useState } from "react";

export const REPS_OPTIONS = [
  { value: 21, label: "Beginner" },
  { value: 51, label: "Intermediate" },
  { value: 108, label: "Traditional" },
  { value: 1008, label: "Advanced" },
];

export const TIME_OPTIONS = ["05:00", "06:00", "06:30", "07:00", "07:30", "08:00", "09:00", "18:00", "19:00", "20:00", "21:00"];

export function formatTime12(time24) {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const DEFAULT_DRAFT = { repsPerDay: 108, totalDays: 21, preferredTime: "07:00", reminderOn: false };

/**
 * Shared "Ritual Planner & Tracker" state — a plan (daily repetition
 * target, total days, preferred time, reminder) plus per-day completion
 * progress, all persisted to localStorage under `storageKey`. Days unlock
 * sequentially based on completing the previous one, not by calendar date.
 */
export function useRitualPlan(storageKey, practiceName) {
  const [plan, setPlan] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || null;
    } catch {
      return null;
    }
  });
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [draftPlan, setDraftPlan] = useState(plan || DEFAULT_DRAFT);
  const [counterDay, setCounterDay] = useState(null);

  const openEdit = () => {
    setDraftPlan(plan || DEFAULT_DRAFT);
    setPlanModalOpen(true);
  };

  const calendarDay = plan
    ? Math.min(Math.max(Math.floor((Date.now() - new Date(plan.startDate).getTime()) / 86400000) + 1, 1), plan.totalDays)
    : 0;

  const getDayStatus = (dayNum) => {
    if (!plan || dayNum > plan.totalDays) return "locked";
    const reps = plan.progress?.[dayNum]?.reps || 0;
    if (reps >= plan.repsPerDay) return "completed";
    const prevReps = dayNum === 1 ? plan.repsPerDay : plan.progress?.[dayNum - 1]?.reps || 0;
    return dayNum === 1 || prevReps >= plan.repsPerDay ? "unlocked" : "locked";
  };

  const currentStreak = (() => {
    if (!plan) return 0;
    let streak = 0;
    for (let d = calendarDay; d >= 1; d--) {
      if ((plan.progress?.[d]?.reps || 0) >= plan.repsPerDay) streak++;
      else break;
    }
    return streak;
  })();

  const savePlan = () => {
    const startDate = plan?.startDate || new Date().toISOString();
    const newPlan = { ...draftPlan, startDate, progress: plan?.progress || {} };
    localStorage.setItem(storageKey, JSON.stringify(newPlan));
    setPlan(newPlan);
    setPlanModalOpen(false);
    if (newPlan.reminderOn && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const setDayReps = (day, reps) => {
    if (!plan) return;
    const clamped = Math.min(Math.max(reps, 0), plan.repsPerDay);
    const updated = {
      ...plan,
      progress: {
        ...plan.progress,
        [day]: {
          reps: clamped,
          completedAt: clamped >= plan.repsPerDay ? new Date().toISOString() : plan.progress?.[day]?.completedAt,
        },
      },
    };
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setPlan(updated);
  };

  // Best-effort daily reminder — only fires while this tab is open, since a
  // real background reminder needs a service worker + push subscription.
  useEffect(() => {
    if (!plan?.reminderOn) return;
    const interval = setInterval(() => {
      if (Notification.permission !== "granted") return;
      const now = new Date();
      const [h, m] = plan.preferredTime.split(":").map(Number);
      if (now.getHours() !== h || now.getMinutes() !== m) return;
      const reps = plan.progress?.[calendarDay]?.reps || 0;
      if (reps < plan.repsPerDay) {
        new Notification(`Time for your ritual — ${practiceName}`, {
          body: `Day ${calendarDay} — ${plan.repsPerDay} repetitions await.`,
        });
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [plan, calendarDay, practiceName]);

  return {
    plan,
    planModalOpen,
    setPlanModalOpen,
    openEdit,
    draftPlan,
    setDraftPlan,
    counterDay,
    setCounterDay,
    calendarDay,
    getDayStatus,
    currentStreak,
    savePlan,
    setDayReps,
  };
}
