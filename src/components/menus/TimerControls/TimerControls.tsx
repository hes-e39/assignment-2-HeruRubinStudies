import type React from "react";
import styles from "./TimerControls.module.scss";
import type {StylingBase} from "../../DataInterfaces/CommonInterfaces.tsx";


export interface TimerFuncProps{
    isRunning: boolean;
    start: ()=>void;
    pause: () => void;
    reset: () => void;
}
export interface TimerSpecificProps{
    children?: React.ReactNode
}

export interface TimerControlsProps extends StylingBase, TimerFuncProps, TimerSpecificProps{}

const TimerControls: React.FC<TimerControlsProps> = ({isRunning, start, pause, reset, children}) => {
    return (
        <div className={styles.actionArea}>
            {
                !isRunning &&
                <button onClick={start} className={`${styles.startButton}  ${styles.actionBtn} `} disabled={isRunning}>
                    Start
                </button>
            }
            {
                isRunning &&
                <button className={styles.actionBtn} onClick={pause} disabled={!isRunning}>
                    Pause
                </button>
            }
            {children}
            <button className={styles.actionBtn} onClick={reset}>
                Reset
            </button>
        </div>
    )
}

export default TimerControls;