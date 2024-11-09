import type React from 'react';
import styles from './CompletionMessage.module.scss';

interface CompletionMessageProps {
    totalRounds: number;
    roundDuration: number;
    onRepeat: () => void;
}

const CompletionMessage: React.FC<CompletionMessageProps> = ({ totalRounds, roundDuration, onRepeat }) => {
    const totalTime = (totalRounds * roundDuration) / 60000; // Calculate total time in minutes

    return (
        <div className={styles.completeMessage}>
            <p>
                Complete! {totalRounds} rounds, {roundDuration / 60000} minutes each, total time: {totalTime} minutes
            </p>
            <button className={styles.repeatButton} onClick={onRepeat}>
                Repeat
            </button>
        </div>
    );
};

export default CompletionMessage;
