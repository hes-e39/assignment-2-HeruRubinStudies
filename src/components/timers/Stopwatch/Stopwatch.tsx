import type React from 'react';
import { useState, useEffect } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import Modal from "../../generic/Modal/Modal";
import TButton from "../../generic/Button/TButton";
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";
import NumberedList from "../../NumberedList/NumberedList";
import { formatTimerNumber } from "../../../utils/helpers";
import styles from './Stopwatch.module.scss';
import commonBtnStyles from "../../generic/Button/TButton.module.scss";
import listStyles from "../../NumberedList/numberdList.module.scss";

interface StopWatchProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes?: string;
}

const StopWatch: React.FC<StopWatchProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [laps, setLaps] = useState<{ numberLabel: string; nameLabel: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGoalReached, setIsGoalReached] = useState(false);

    // Configuration state for goal time
    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    // Calculate goal time in milliseconds
    const goalTime = (goalHours * 3600 + goalMinutes * 60 + goalSeconds) * 1000;

    // Check if the goal time is reached
    useEffect(() => {
        if (milliseconds >= goalTime && goalTime > 0) {
            setIsGoalReached(true);
            pause(); // Pause the stopwatch when the goal is reached
        }
    }, [milliseconds, goalTime, pause]);

    // Add a new lap
    const addLap = () => {
        setLaps((prevLaps) => [
            { numberLabel: formatTimerNumber(laps.length + 1), nameLabel: `${formatTime(milliseconds)}` },
            ...prevLaps,
        ]);
    };

    const clearLaps = () => {
        setLaps([]);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const applyGoalConfig = () => {
        setIsModalOpen(false);
        reset(); // Reset the stopwatch when applying a new goal
        setIsGoalReached(false); // Reset goal reached state
    };

    const resetAndRepeat = () => {
        reset();
        setIsGoalReached(false);
        start(); // Automatically start the stopwatch again
    };

    // Format the time for lap display
    const formatTime = (ms: number): string => {
        const hundredths = ms % 100;
        const seconds = Math.floor(ms / 100) % 60;
        const minutes = Math.floor(ms / (100 * 60)) % 60;
        const hours = Math.floor(ms / (100 * 60 * 60));

        return `${hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(
            seconds
        ).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
    };

    return (
        <div className={`${styles.stopwatchContainer} ${classes ?? ""}`}>
            {!isGoalReached ? (
                <>
                    <FormattedTimeDisplay milliseconds={milliseconds} />
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                        <div className={styles.lapsControlsArea}>
                            <TButton
                                iconClasses={{
                                    classes: `${commonBtnStyles.darkOnLight}`,
                                    fillClass: commonBtnStyles.filled,
                                    strokeClass: commonBtnStyles.stroked,
                                }}
                                classes={`${isRunning ? '' : styles.hidden} ${commonBtnStyles.config}`}
                                btnType="small-rect"
                                label="Lap"
                                icon="plus"
                                actionFunc={addLap}
                            />
                            <TButton
                                classes={commonBtnStyles.config}
                                btnType="small-rect"
                                label="Set Goal"
                                actionFunc={toggleModal}
                            />
                        </div>
                    </TimerControls>

                    {laps.length > 0 && (
                        <div className={styles.lapsContainer}>
                            <ul className={styles.lapList}>
                                <NumberedList presets="light-on-dark" classes={styles.lapList} listItems={laps.slice(0, 3)} />
                                {laps.length > 3 && (
                                    <li className={`${listStyles.item} ${listStyles.lightOnDark}`}>
                                        <span className={`${listStyles.label}`}>{laps.length - 3} more laps</span>
                                    </li>
                                )}
                            </ul>
                            <div className={styles.lapActionsArea}>
                                {laps.length > 3 && (
                                    <TButton
                                        classes={commonBtnStyles.config}
                                        btnType="small-rect"
                                        label="View All"
                                        actionFunc={toggleModal}
                                    />
                                )}
                                <TButton
                                    classes={`${commonBtnStyles.config}`}
                                    iconClasses={{ classes: `${commonBtnStyles.darkOnLight}`, strokeClass: commonBtnStyles.stroked }}
                                    btnType="small-rect"
                                    label="Clear"
                                    icon="close-x"
                                    actionFunc={clearLaps}
                                />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <CompletionMessage
                    totalRounds={1}
                    roundDuration={goalTime}
                    onRepeat={resetAndRepeat}
                />
            )}

            {/* Modal for Configuring Goal */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} title="Set Goal Time">
                    <div className={styles.goalConfigInputs}>
                        <label>
                            Hours:
                            <input
                                type="number"
                                value={goalHours}
                                onChange={(e) => setGoalHours(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Minutes:
                            <input
                                type="number"
                                value={goalMinutes}
                                onChange={(e) => setGoalMinutes(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Seconds:
                            <input
                                type="number"
                                value={goalSeconds}
                                onChange={(e) => setGoalSeconds(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <div className={styles.modalButtons}>
                        <TButton
                            btnType="small-rect"
                            actionFunc={applyGoalConfig}
                            label="Apply"
                        />
                        <TButton
                            btnType="small-rect"
                            actionFunc={toggleModal}
                            label="Cancel"
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default StopWatch;
