import { REPS_OPTIONS, TIME_OPTIONS, formatTime12 } from "../hooks/useRitualPlan";
import styles from "./RitualPlanner.module.css";

export function RitualPlanBar({ ritual }) {
  const { plan, openEdit, setPlanModalOpen, calendarDay, currentStreak } = ritual;

  return (
    <div className={styles.planBar}>
      {plan ? (
        <>
          <div className={styles.planBarHeader}>
            <span className={styles.planBarTitle}>
              <span className="material-symbols-outlined">event_note</span>
              Your Ritual Plan <em>Summary</em>
            </span>
            <button className={styles.planEditBtn} onClick={openEdit}>
              <span className="material-symbols-outlined">edit_calendar</span> View / Edit Plan
            </button>
          </div>
          <div className={styles.planBarStats}>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Daily Repetitions</span>
              <span className={styles.planStatValue}>{plan.repsPerDay}</span>
            </div>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Total Days</span>
              <span className={styles.planStatValue}>{plan.totalDays} Days</span>
            </div>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Preferred Time</span>
              <span className={styles.planStatValue}>{formatTime12(plan.preferredTime)}</span>
            </div>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Reminder</span>
              <span className={styles.planStatValue}>{plan.reminderOn ? "🔔 On" : "Off"}</span>
            </div>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Progress</span>
              <span className={styles.planStatValue}>Day {calendarDay} of {plan.totalDays}</span>
            </div>
            <div className={styles.planStat}>
              <span className={styles.planStatLabel}>Streak</span>
              <span className={styles.planStatValue}>🔥 {currentStreak}</span>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.planBarEmpty}>
          <span className={styles.planBarTitle}>
            <span className="material-symbols-outlined">event_note</span>
            Set up a Ritual Plan to track your daily repetitions and streak.
          </span>
          <button className={styles.planEditBtn} onClick={() => setPlanModalOpen(true)}>
            <span className="material-symbols-outlined">add_circle</span> Create Plan
          </button>
        </div>
      )}
    </div>
  );
}

export function RitualPlanModal({ ritual }) {
  const { planModalOpen, setPlanModalOpen, draftPlan, setDraftPlan, savePlan } = ritual;
  if (!planModalOpen) return null;

  return (
    <div className={styles.planModalOverlay} onClick={() => setPlanModalOpen(false)}>
      <div className={styles.planModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.planModalHeader}>
          <h3>
            <span className="material-symbols-outlined">event_note</span>
            Ritual Planner &amp; Tracker
          </h3>
          <button className={styles.planModalClose} onClick={() => setPlanModalOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p className={styles.planModalSub}>Plan your sacred practice. We'll help you stay consistent.</p>

        <p className={styles.planFieldLabel}>1. Choose Daily Repetitions</p>
        <div className={styles.repsGrid}>
          {REPS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={draftPlan.repsPerDay === opt.value ? styles.repsOptActive : styles.repsOpt}
              onClick={() => setDraftPlan({ ...draftPlan, repsPerDay: opt.value })}
            >
              <span className={styles.repsOptNum}>{opt.value}</span>
              <span className={styles.repsOptLabel}>{opt.label}</span>
            </button>
          ))}
        </div>

        <p className={styles.planFieldLabel}>2. For How Many Days?</p>
        <div className={styles.daysStepper}>
          <button onClick={() => setDraftPlan({ ...draftPlan, totalDays: Math.max(1, draftPlan.totalDays - 1) })}>−</button>
          <span>{draftPlan.totalDays} Days</span>
          <button onClick={() => setDraftPlan({ ...draftPlan, totalDays: Math.min(108, draftPlan.totalDays + 1) })}>+</button>
        </div>

        <p className={styles.planFieldLabel}>3. Preferred Practice Time</p>
        <select
          className={styles.timeSelect}
          value={draftPlan.preferredTime}
          onChange={(e) => setDraftPlan({ ...draftPlan, preferredTime: e.target.value })}
        >
          {TIME_OPTIONS.map((t) => (
            <option key={t} value={t}>{formatTime12(t)}</option>
          ))}
        </select>

        <label className={styles.reminderToggleRow}>
          <span>
            <span className="material-symbols-outlined">notifications</span> Daily Reminder
          </span>
          <input
            type="checkbox"
            checked={draftPlan.reminderOn}
            onChange={(e) => setDraftPlan({ ...draftPlan, reminderOn: e.target.checked })}
          />
        </label>
        {draftPlan.reminderOn && (
          <p className={styles.reminderNote}>
            We'll try to remind you at {formatTime12(draftPlan.preferredTime)} while this page is open in your browser
            (background reminders when the tab is closed aren't supported yet).
          </p>
        )}

        <div className={styles.planSummaryBox}>
          <p className={styles.planSummaryTitle}>Your Ritual Plan</p>
          <div className={styles.planSummaryRow}><span>Daily Repetitions</span><span>{draftPlan.repsPerDay}</span></div>
          <div className={styles.planSummaryRow}><span>Total Days</span><span>{draftPlan.totalDays}</span></div>
          <div className={styles.planSummaryRow}><span>Total Repetitions</span><span>{(draftPlan.repsPerDay * draftPlan.totalDays).toLocaleString()}</span></div>
          <div className={styles.planSummaryRow}><span>Preferred Time</span><span>{formatTime12(draftPlan.preferredTime)}</span></div>
        </div>

        <button className={styles.savePlanBtn} onClick={savePlan}>
          <span className="material-symbols-outlined">bookmark</span> Save My Ritual Plan
        </button>
      </div>
    </div>
  );
}

export function RitualDayTracker({ ritual, day }) {
  const { plan, getDayStatus, counterDay, setCounterDay, setDayReps } = ritual;
  if (!plan) return null;

  const dayStatus = getDayStatus(day);
  const dayReps = plan.progress?.[day]?.reps || 0;

  return (
    <>
      <div className={styles.trackerRow} onClick={(e) => e.stopPropagation()}>
        {dayStatus === "locked" && (
          <span className={styles.lockedTag}>
            <span className="material-symbols-outlined">lock</span> Locked
          </span>
        )}
        {dayStatus === "completed" && (
          <span className={styles.completedTag}>
            <span className="material-symbols-outlined">check_circle</span>
            Completed {dayReps}/{plan.repsPerDay}
          </span>
        )}
        {dayStatus === "unlocked" && (
          <>
            <span className={styles.inProgressTag}>
              {dayReps > 0 ? "In Progress" : "Available"} {dayReps}/{plan.repsPerDay}
            </span>
            <button
              className={styles.continueBtn}
              onClick={() => setCounterDay(counterDay === day ? null : day)}
            >
              {counterDay === day ? "Close" : dayReps > 0 ? "Continue" : "Start"}
            </button>
          </>
        )}
      </div>

      {counterDay === day && (
        <div className={styles.counterRow} onClick={(e) => e.stopPropagation()}>
          <span className={styles.counterCount}>{dayReps} / {plan.repsPerDay}</span>
          <button className={styles.counterTapBtn} onClick={() => setDayReps(day, dayReps + 1)}>
            +1 Rep
          </button>
          <button
            className={styles.counterCompleteBtn}
            onClick={() => { setDayReps(day, plan.repsPerDay); setCounterDay(null); }}
          >
            Mark Complete
          </button>
        </div>
      )}
    </>
  );
}

export function isDayLocked(ritual, day) {
  return Boolean(ritual.plan) && ritual.getDayStatus(day) === "locked";
}
