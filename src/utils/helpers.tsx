
import type React from "react";
import styles from "../components/timers/Stopwatch/Stopwatch.module.scss";
//formats numbers like 01, 02, 03, 04... for that sci-fi aesthetic
export function formatTimerNumber(index: number): string {
    return index < 10 ? `0${index}` : `${index}`;
}

export const formatTimeWithUnits = (hours:number, minutes:number, seconds:number): React.ReactNode => {
    const elements = [];
    if (hours > 0) {
        elements.push(
            <span key="hours" className={styles.number}>
            {hours}
            </span>,
            <span key="hours-label" className={styles.label}>
            hour{hours > 1 ? "s" : ""}
        </span>
    );
    }
    if (minutes > 0) {
        elements.push(
            <span key="minutes" className={styles.number}>
            {minutes}
            </span>,
            <span key="minutes-label" className={styles.label}>
            min
            </span>
    );
    }
    if (seconds > 0) {
        elements.push(
            <span key="seconds" className={styles.number}>
            {seconds}
            </span>,
            <span key="seconds-label" className={styles.label}>
            sec
            </span>
    );
    }
    return elements;
};
