import type React from 'react';
import styles from './TimerTracker.module.scss';
import type { timerType } from '../../views/Timers/TimersView.tsx';
import type { iconGraphic } from '../Icons/Icon.tsx';
import Icon from '../Icons/Icon.tsx';
import {formatTimerNumber} from "../../utils/helpers.tsx";


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
                <div  key={index} className={styles.sequenceItem}>

                    <div
                        className={`${styles.timerSquare} ${index < currentTimerIndex ? styles.completed : ''} ${index === currentTimerIndex ? styles.active : ''}`}
                        onClick={() => onTimerSelect(index)}
                    >
                        <div className={styles.completeIndicator}>
                            <Icon iconName="checkmark" classes={styles.completedMark}  strokedClasses={styles.completedStroke} />
                        </div>
                        <div className={styles.incomplete}>
                            <div className={styles.indicator}>
                                <h2>{item.label ?? ''}</h2>
                                <div className={styles.activeIndicator} />
                            </div>
                            <div className={styles.labelArea}>
                                <h2>{formatTimerNumber(index + 1)}</h2>
                                {
                                    item.icon &&
                                    <Icon iconName={item.icon}
                                          classes={styles.iconTrack}
                                          filledClasses={styles.filled}
                                          filledHighlightsClasses={styles.filled}
                                          strokedClasses={styles.stroked}
                                          strokedHighlightsClasses={styles.stroked}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TimerTracker;
