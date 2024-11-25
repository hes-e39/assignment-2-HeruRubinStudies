import type React from 'react';
import { useState } from 'react';
import styles from './TimerTracker.module.scss';
import type { timerType } from '../../views/Timers/TimersView.tsx';
import type { iconGraphic } from '../Icons/Icon.tsx';
import Icon from '../Icons/Icon.tsx';
import Modal from '../generic/Modal/Modal.tsx';
import TButton from '../generic/Button/TButton.tsx';
import { formatTimerNumber } from '../../utils/helpers.tsx';

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
    onDelete: (index: number) => void;
}

const TimerTracker: React.FC<TimerTrackerProps> = ({
                                                       timerSequence,
                                                       currentTimerIndex,
                                                       onTimerSelect,
                                                       onDelete,
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null); // Timer index to delete

    const handleDeleteClick = (index: number) => {
        setPendingDeleteIndex(index);
        setIsModalOpen(true); // Show confirmation modal
    };

    const confirmDelete = () => {
        if (pendingDeleteIndex !== null) {
            onDelete(pendingDeleteIndex);
            setPendingDeleteIndex(null);
        }
        setIsModalOpen(false); // Close the modal
    };

    const cancelDelete = () => {
        setPendingDeleteIndex(null); // Reset pending delete index
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className={styles.trackerContainer}>
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
                        actionFunc={() => handleDeleteClick(index)} // Trigger delete modal
                    />
                </div>
            ))}

            {/* Confirmation Modal */}
            {isModalOpen && (
                <Modal closeFunc={cancelDelete} hasCloseBtn={true} title="Confirm Deletion">
                    <p>Are you sure you want to delete this timer?</p>
                    <div className={styles.modalButtons}>
                        <TButton
                            btnType="small-rect"
                            label="Yes, Delete"
                            actionFunc={confirmDelete} // Confirm deletion
                        />
                        <TButton
                            btnType="small-rect"
                            label="Cancel"
                            actionFunc={cancelDelete} // Cancel deletion
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TimerTracker;
