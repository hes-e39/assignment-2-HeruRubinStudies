import type React from 'react';
import styles from './CompletionMessage.module.scss';
import btnStyles from '../../generic/Button/TButton.module.scss';
import Icon from "../../Icons/Icon.tsx";
import TButton from "../../generic/Button/TButton.tsx";

interface CompletionMessageProps {
    totalRounds: number;
    roundDuration: number;
    onRepeat: () => void;
}

// Utility to format time into hours, minutes, and seconds
const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
};

const CompletionMessage: React.FC<CompletionMessageProps> = ({ totalRounds, roundDuration, onRepeat }) => {
    const totalTimeMilliseconds = totalRounds * roundDuration;
    const { hours, minutes, seconds } = formatTime(totalTimeMilliseconds);
    const { minutes: roundMinutes, seconds: roundSeconds } = formatTime(roundDuration);

    return (
        <div className={styles.completeMessage}>
            <p>
                <div className={styles.completionBanner}>
                    <Icon iconName="checkmark" classes={styles.completeIcon} strokedClasses={styles.stroke} />
                    <span>Complete!</span>
                </div>
                <div className={styles.rounds}>
                    <span className={styles.number}>{totalRounds}</span>
                    <span className={styles.label}> rounds</span>
                </div>

                    {roundMinutes > 0 && (
                        <>
                            <span className={styles.number}>{roundMinutes}</span>
                            <span className={styles.label}> min </span>
                        </>
                    )}
                    {roundSeconds > 0 && (
                        <>
                            <span className={styles.number}>{roundSeconds}</span>
                            <span className={styles.label}> sec </span>
                        </>
                    )}
                    each, total time:{' '}
                    {hours > 0 && (
                        <>
                            <span className={styles.number}>{hours}</span>
                            <span className={styles.label}> hour </span>
                        </>
                    )}
                    {minutes > 0 && (
                        <>
                            <span className={styles.number}>{minutes}</span>
                            <span className={styles.label}> min </span>
                        </>
                    )}
                    {seconds > 0 && (
                        <>
                            <span className={styles.number}>{seconds}</span>
                            <span className={styles.label}> sec</span>
                        </>
                    )}
            </p>
            <TButton btnType="small-rect" label="REPEAT" actionFunc={onRepeat} classes={btnStyles.config} />
        </div>
    );
};

export default CompletionMessage;
