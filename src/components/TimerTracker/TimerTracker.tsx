import type React from 'react';
import { useMemo, useState } from 'react';
import type { TimerType } from '../../hooks/useTimer';
import type { TimerSequenceItem } from '../../hooks/useTimer';
import { formatTimerNumber } from '../../utils/helpers';
import CountdownEditor from '../ConfigurationViews/CountdownEditor';
import StopwatchEditor from '../ConfigurationViews/StopwatchEditor';
import TabataEditor from '../ConfigurationViews/TabataEditor';
import XYEditor from "../ConfigurationViews/XYeditor.tsx";
import Icon from '../Icons/Icon';
import TButton from '../generic/Button/TButton';
import Modal from '../generic/Modal/ModalPopUp/Modal';
import FormattedTimeDisplay from '../visualization/FormattedTimeDisplay/FormattedTimeDisplay';
import ProgressBar from '../visualization/ProgressBar/ProgressBar';
import styles from './TimerTracker.module.scss';

export type timerSequenceItem = TimerSequenceItem;

interface TimerTrackerProps {
    timerSequence: timerSequenceItem[];
    currentTimerIndex: number;
    elapsedMilliseconds: number;
    onTimerSelect: (index: number) => void;
    onDelete: (index: number) => void;
    onAddTimer: (newTimer: TimerSequenceItem) => void;
}

const TimerTracker: React.FC<TimerTrackerProps> = ({
                                                       timerSequence,
                                                       currentTimerIndex,
                                                       elapsedMilliseconds,
                                                       onTimerSelect,
                                                       onDelete,
                                                       onAddTimer,
                                                   }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTimerType, setSelectedTimerType] = useState<TimerType>('countdown');

    // State variables for timer configurations
    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    const [workMinutes, setWorkMinutes] = useState(0);
    const [workSeconds, setWorkSeconds] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [totalRounds, setTotalRounds] = useState(1);

    const [roundMinutes, setRoundMinutes] = useState(0);
    const [roundSeconds, setRoundSeconds] = useState(0);

    // Calculate total time for all timers
    const totalMilliseconds = useMemo(() => {
        return timerSequence.reduce((total, timer) => {
            switch (timer.type) {
                case 'countdown': {
                    return total + (timer.initialTime ?? 0);
                }
                case 'tabata': {
                    const rounds = timer.rounds ?? 0;
                    const workTime = timer.workDuration ?? 0;
                    const breakTime = timer.breakDuration ?? 0;
                    return total + rounds * (workTime + breakTime);
                }
                case 'stopwatch': {
                    return total + (timer.initialTime ?? 0);
                }
                case 'xy': {
                    const xyRounds = timer.rounds ?? 0;
                    const roundDuration =
                        ((timer.roundMinutes ?? 0) * 60 + (timer.roundSeconds ?? 0)) * 1000;
                    return total + xyRounds * roundDuration;
                }
                default: {
                    return total;
                }
            }
        }, 0);
    }, [timerSequence]);

    // Calculate progress percentage
    const progressPercentage = useMemo(() => {
        if (totalMilliseconds === 0) return 0;

        const completedMilliseconds = timerSequence.slice(0, currentTimerIndex).reduce((total, timer) => {
            switch (timer.type) {
                case 'countdown': {
                    return total + (timer.initialTime ?? 0);
                }
                case 'tabata': {
                    const rounds = timer.rounds ?? 0;
                    const workTime = timer.workDuration ?? 0;
                    const breakTime = timer.breakDuration ?? 0;
                    return total + rounds * (workTime + breakTime);
                }
                case 'stopwatch': {
                    return total + (timer.initialTime ?? 0);
                }
                case 'xy': {
                    const xyRounds = timer.rounds ?? 0;
                    const roundDuration =
                        ((timer.roundMinutes ?? 0) * 60 + (timer.roundSeconds ?? 0)) * 1000;
                    return total + xyRounds * roundDuration;
                }
                default:
                    return total;
            }
        }, 0);

        const totalElapsedMilliseconds = completedMilliseconds + elapsedMilliseconds;

        return (totalElapsedMilliseconds / totalMilliseconds) * 100;
    }, [timerSequence, currentTimerIndex, elapsedMilliseconds, totalMilliseconds]);

    // Handler for "Add Timer" button click
    const handleAddTimerClick = () => {
        setIsAddModalOpen(true);
        setSelectedTimerType('countdown'); // Default selection
        // Reset configuration states
        setGoalHours(0);
        setGoalMinutes(0);
        setGoalSeconds(0);

        setWorkMinutes(0);
        setWorkSeconds(0);
        setBreakMinutes(0);
        setBreakSeconds(0);
        setTotalRounds(1);

        setRoundMinutes(0);
        setRoundSeconds(0);
    };

    const handleAddTimerConfirm = () => {
        // Construct the timer object based on selectedTimerType and configuration state
        let newTimer: TimerSequenceItem;

        switch (selectedTimerType) {
            case 'countdown': {
                const initialTime = (goalHours * 3600 + goalMinutes * 60 + goalSeconds) * 1000;
                newTimer = {
                    type: 'countdown',
                    initialTime,
                    label: 'Countdown Timer',
                };
                break;
            }
            case 'tabata': {
                const workDuration = (workMinutes * 60 + workSeconds) * 1000;
                const breakDuration = (breakMinutes * 60 + breakSeconds) * 1000;
                newTimer = {
                    type: 'tabata',
                    rounds: totalRounds,
                    workDuration,
                    breakDuration,
                    label: 'Tabata Timer',
                };
                break;
            }
            case 'stopwatch': {
                const goalTime = (goalHours * 3600 + goalMinutes * 60 + goalSeconds) * 1000;
                newTimer = {
                    type: 'stopwatch',
                    initialTime: goalTime,
                    label: 'Stopwatch Timer',
                };
                break;
            }
            case 'xy': {
                newTimer = {
                    type: 'xy',
                    rounds: totalRounds,
                    roundMinutes,
                    roundSeconds,
                    label: 'XY Timer',
                };
                break;
            }
            default:
                return;
        }

        // Add the new timer
        onAddTimer(newTimer);

        // Close the modal
        setIsAddModalOpen(false);
    };

    const handleAddTimerCancel = () => {
        // Close the modal without adding anything
        setIsAddModalOpen(false);
    };

    const handleDeleteClick = (index: number) => {
        setPendingDeleteIndex(index);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (pendingDeleteIndex !== null) {
            onDelete(pendingDeleteIndex);
            setPendingDeleteIndex(null);
        }
        setIsDeleteModalOpen(false);
    };

    const cancelDelete = () => {
        setPendingDeleteIndex(null);
        setIsDeleteModalOpen(false);
    };

    return (

        <>
            {/* Add Timer Modal */}
            {isAddModalOpen && (
                <Modal closeFunc={handleAddTimerCancel} hasCloseBtn title="Add Timer">
                    <div>
                        <label>Select Timer Type:</label>
                        <select
                            value={selectedTimerType}
                            onChange={(e) => setSelectedTimerType(e.target.value as TimerType)}
                        >
                            <option value="countdown">Countdown</option>
                            <option value="tabata">Tabata</option>
                            <option value="stopwatch">Stopwatch</option>
                            <option value="xy">XY</option>
                        </select>
                    </div>

                    {/* Render the appropriate Editor component */}
                    {selectedTimerType === 'countdown' && (
                        <CountdownEditor
                            applyCustomConfig={() => {}} // Not used here
                            toggleModal={() => {}}
                            setGoalHours={setGoalHours}
                            setGoalMinutes={setGoalMinutes}
                            setGoalSeconds={setGoalSeconds}
                            goalHours={goalHours}
                            goalMinutes={goalMinutes}
                            goalSeconds={goalSeconds}
                            showMenu={false}
                        />
                    )}
                    {selectedTimerType === 'tabata' && (
                        <TabataEditor
                            setTotalRounds={setTotalRounds}
                            totalRounds={totalRounds}
                            setWorkMinutes={setWorkMinutes}
                            workMinutes={workMinutes}
                            setWorkSeconds={setWorkSeconds}
                            workSeconds={workSeconds}
                            setBreakMinutes={setBreakMinutes}
                            breakMinutes={breakMinutes}
                            setBreakSeconds={setBreakSeconds}
                            breakSeconds={breakSeconds}
                            toggleModal={() => {}}
                            applyCustomConfig={() => {}}
                            showMenu={false}
                        />
                    )}
                    {selectedTimerType === 'stopwatch' && (
                        <StopwatchEditor
                            toggleModal={() => {}}
                            goalHours={goalHours}
                            goalMinutes={goalMinutes}
                            goalSeconds={goalSeconds}
                            applyCustomConfig={() => {}} // Not used here
                            setGoalMinutes={setGoalMinutes}
                            setGoalHours={setGoalHours}
                            setGoalSeconds={setGoalSeconds}
                            showMenu={false}
                        />
                    )}
                    {selectedTimerType === 'xy' && (
                        <XYEditor
                            toggleModal={() => {}}
                            setRoundSeconds={setRoundSeconds}
                            roundSeconds={roundSeconds}
                            totalRounds={totalRounds}
                            setRoundMinutes={setRoundMinutes}
                            roundMinutes={roundMinutes}
                            applyCustomConfig={() => {}} // Not used here
                            setTotalRounds={setTotalRounds}
                            showMenu={false}
                        />
                    )}

                    {/* Add and Cancel buttons */}
                    <div className={styles.modalButtons}>
                        <TButton btnType="small-rect" label="Add" actionFunc={handleAddTimerConfirm} />
                        <TButton btnType="small-rect" label="Cancel" actionFunc={handleAddTimerCancel} />
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <Modal closeFunc={cancelDelete} hasCloseBtn title="Confirm Deletion">
                    <p>Are you sure you want to delete this timer?</p>
                    <div className={styles.modalButtons}>
                        <TButton btnType="small-rect" label="Yes, Delete" actionFunc={confirmDelete} />
                        <TButton btnType="small-rect" label="Cancel" actionFunc={cancelDelete} />
                    </div>
                </Modal>
            )}
        <div className={styles.trackerContainer}>
            {/* Total time and progress bar */}
            <div className={styles.timeOverviewContainer}>
                <div className={styles.totalTime}>
                    <h3>Total Workout Time</h3>
                    <FormattedTimeDisplay milliseconds={totalMilliseconds} size="small" useSemicolon />
                </div>
                <ProgressBar progressPercentage={progressPercentage} />
            </div>

            {/* Timer sequence items */}
            <div className={styles.trackerChipsArea}>
                {/* Add Timer Button */}
                <div className={styles.addTimer}>
                    <TButton label="Add Timer" btnType="small-rect" actionFunc={handleAddTimerClick} />
                </div>
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
                                    {item.type && (
                                        <Icon
                                            iconName={item.type}
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
        </div>
            </>
    );
};

export default TimerTracker;
