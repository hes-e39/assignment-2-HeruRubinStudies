import type React from 'react';
import styles from './TimerTracker.module.scss';
import type { timerType } from '../../views/Timers/TimersView.tsx';
import type { iconGraphic } from '../Icons/Icon.tsx';
import Icon from '../Icons/Icon.tsx';

export type timerSequenceItem = {
    type: timerType;
    initialTime?: number;
    rounds?: number;
    workDuration?: number;
    breakDuration?: number;
    label?: string;
    icon?: iconGraphic;
};

interface TimerTrackerProps {
    timerSequence: timerSequenceItem[];
    currentTimerIndex: number;
    onTimerSelect: (index: number) => void;
}

const TimerTracker: React.FC<TimerTrackerProps> = ({ timerSequence, currentTimerIndex, onTimerSelect }) => {
    return (
        <div className={styles.trackerContainer}>
            {timerSequence.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.timerSquare} ${index < currentTimerIndex ? styles.completed : ''} ${index === currentTimerIndex ? styles.active : ''}`}
                    onClick={() => onTimerSelect(index)}
                >
                    {item.icon && <Icon iconName={item.icon} classes={styles.icon} />}

                    <div>
                        <h1>{item.label ?? ''}</h1>
                        <h2>{item.type.toString()}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimerTracker;
