import type React from 'react';
import { useState, useMemo } from 'react';
import styles from './TimerTracker.module.scss';
import type { timerType } from '../../views/Timers/TimersView.tsx';
import type { iconGraphic } from '../Icons/Icon.tsx';
import Icon from '../Icons/Icon.tsx';
import Modal from '../generic/Modal/ModalPopUp/Modal.tsx';
import TButton from '../generic/Button/TButton.tsx';
import { formatTimerNumber } from '../../utils/helpers.tsx';
import FormattedTimeDisplay from '../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import ProgressBar from '../visualization/ProgressBar/ProgressBar.tsx';

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
    elapsedMilliseconds: number; // Total elapsed time in the sequence
    onTimerSelect: (index: number) => void;
    onDelete: (index: number) => void;
    onAddTimer: () => void;
}

const TimerTracker: React.FC<TimerTrackerProps> = ({
                                                       timerSequence,
                                                       currentTimerIndex,
                                                       elapsedMilliseconds,
                                                       onTimerSelect,
                                                       onDelete,
                                                       onAddTimer,
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);



    // Calculate total time for all timers
    const totalMilliseconds = useMemo(() => {
        return timerSequence.reduce((total, timer) => {
            if (timer.type === 'countdown') {
                return total + (timer.initialTime ?? 0);
            } else if (timer.type === 'tabata') {
                const rounds = timer.rounds ?? 0;
                const workTime = timer.workDuration ?? 0;
                const breakTime = timer.breakDuration ?? 0;
                return total + rounds * (workTime + breakTime);
            }
            return total;
        }, 0);
    }, [timerSequence]);

    // Calculate progress percentage
    const progressPercentage = useMemo(() => {
        if (totalMilliseconds === 0) return 0;

        // Calculate total elapsed time including completed timers
        const completedMilliseconds = timerSequence.slice(0, currentTimerIndex).reduce((total, timer) => {
            if (timer.type === 'countdown') {
                return total + (timer.initialTime ?? 0);
            } else if (timer.type === 'tabata') {
                const rounds = timer.rounds ?? 0;
                const workTime = timer.workDuration ?? 0;
                const breakTime = timer.breakDuration ?? 0;
                return total + rounds * (workTime + breakTime);
            }
            return total;
        }, 0);

        const totalElapsedMilliseconds = completedMilliseconds + elapsedMilliseconds;

        return (totalElapsedMilliseconds / totalMilliseconds) * 100;
    }, [timerSequence, currentTimerIndex, elapsedMilliseconds, totalMilliseconds]);


    const handleDeleteClick = (index: number) => {
        setPendingDeleteIndex(index);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (pendingDeleteIndex !== null) {
            onDelete(pendingDeleteIndex);
            setPendingDeleteIndex(null);
        }
        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setPendingDeleteIndex(null);
        setIsModalOpen(false);
    };



    return (
        <div className={styles.trackerContainer}>
            {/* Total time and progress bar */}
            <div className={styles.totalTimeContainer}>
                <h3>Total Workout Time</h3>
                <FormattedTimeDisplay milliseconds={totalMilliseconds} size="small" useSemicolon />
                <ProgressBar progressPercentage={progressPercentage} />
            </div>

            {/* Add Timer Button */}
            <div className={styles.addTimer}>
                <TButton
                    label="Add Timer"
                    btnType="small-rect"
                    actionFunc={onAddTimer}
                />
            </div>

            {/* Timer sequence items */}
            <div className={styles.trackerChipsArea}>
                {timerSequence.map((item, index) => (
                    <div key={index} className={styles.sequenceItem}>
                        <div
                            className={`${styles.timerSquare} ${
                                index < currentTimerIndex ? styles.completed : ''
                            } ${index === currentTimerIndex ? styles.active : ''}`}
                            onClick={() => onTimerSelect(index)}
                        >
                            <div className={styles.completeIndicator}>
                                <Icon
                                    iconName="checkmark"
                                    classes={styles.completedMark}
                                    strokedClasses={styles.completedStroke}
                                />
                            </div>
                            <div className={styles.incomplete}>
                                <div className={styles.indicator}>
                                    <h2>{item.label ?? ''}</h2>
                                    <div className={styles.activeIndicator} />
                                </div>
                                <div className={styles.labelArea}>
                                    <h2>{formatTimerNumber(index + 1)}</h2>
                                    {item.icon && (
                                        <Icon
                                            iconName={item.icon}
                                            classes={styles.iconTrack}
                                            filledClasses={styles.filled}
                                            filledHighlightsClasses={styles.filled}
                                            strokedClasses={styles.stroked}
                                            strokedHighlightsClasses={styles.stroked}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <TButton
                            label="Delete"
                            btnType="small-rect"
                            actionFunc={() => handleDeleteClick(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <Modal closeFunc={cancelDelete} hasCloseBtn={true} title="Confirm Deletion">
                    <p>Are you sure you want to delete this timer?</p>
                    <div className={styles.modalButtons}>
                        <TButton
                            btnType="small-rect"
                            label="Yes, Delete"
                            actionFunc={confirmDelete}
                        />
                        <TButton
                            btnType="small-rect"
                            label="Cancel"
                            actionFunc={cancelDelete}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TimerTracker;
