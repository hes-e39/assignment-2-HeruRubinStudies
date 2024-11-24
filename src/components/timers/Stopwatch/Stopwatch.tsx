import type React from 'react';
import { useState, useEffect } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import Modal from '../../generic/Modal/Modal';
import TButton from '../../generic/Button/TButton';
import CompletionMessage from '../../visualization/CompletionMessage/CompletionMessage';
import NumberedList from '../../NumberedList/NumberedList';
import { formatTimerNumber } from '../../../utils/helpers';
import styles from './Stopwatch.module.scss';
import commonBtnStyles from '../../generic/Button/TButton.module.scss';
import listStyles from '../../NumberedList/numberdList.module.scss';
import MenuContainer from '../../menus/MenuContainer/MenuContainer.tsx';

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
    const [goalMinutes, setGoalMinutes] = useState(1);
    const [goalSeconds, setGoalSeconds] = useState(30);

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
        setLaps(prevLaps => [{ numberLabel: formatTimerNumber(laps.length + 1), nameLabel: `${formatTimerNumber(milliseconds)}` }, ...prevLaps]);
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

    return (
        <div className={`${styles.stopwatchContainer} ${classes ?? ''}`}>
            {!isGoalReached ? (
                <>
                    <FormattedTimeDisplay milliseconds={milliseconds} size="large" useSemicolon />
                    <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                        <div className={styles.lapsControlsArea}>
                            <TButton
                                iconClasses={{
                                    classes: `${commonBtnStyles.darkOnLight}`,
                                    fillClass: commonBtnStyles.filled,
                                    strokeClass: commonBtnStyles.stroked,
                                }}
                                classes={`${commonBtnStyles.config}`}
                                btnType="small-rect"
                                label="Lap"
                                icon="plus"
                                actionFunc={addLap}
                            />
                        </div>
                    </TimerControls>

                    <MenuContainer>
                        <div className={styles.goalReadout}>
                            {goalTime > 0 ? (
                                <>
                                    <span className={styles.goalText}>Goal:</span> <FormattedTimeDisplay milliseconds={goalTime} useSemicolon={false} mode="units" size="small" />
                                    <TButton classes={commonBtnStyles.config} btnType="small-rect" label="Edit" actionFunc={toggleModal} />
                                </>
                            ) : (
                                <TButton classes={commonBtnStyles.config} btnType="small-rect" label="Set Goal" actionFunc={toggleModal} />
                            )}
                        </div>
                    </MenuContainer>

                    {/*laps display*/}
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
                                {laps.length > 3 && <TButton classes={commonBtnStyles.config} btnType="small-rect" label="View All" actionFunc={toggleModal} />}
                                <TButton
                                    classes={`${commonBtnStyles.config}`}
                                    iconClasses={{
                                        classes: `${commonBtnStyles.darkOnLight}`,
                                        strokeClass: commonBtnStyles.stroked,
                                    }}
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
                <CompletionMessage totalRounds={1} roundDuration={goalTime} onRepeat={resetAndRepeat} />
            )}

            {/* Modal for Configuring Goal */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} title="Set Goal Time">
                    <div className={styles.goalConfigInputs}>
                        <label>
                            Hours:
                            <input type="number" value={goalHours} onChange={e => setGoalHours(Number(e.target.value))} />
                        </label>
                        <label>
                            Minutes:
                            <input type="number" value={goalMinutes} onChange={e => setGoalMinutes(Number(e.target.value))} />
                        </label>
                        <label>
                            Seconds:
                            <input type="number" value={goalSeconds} onChange={e => setGoalSeconds(Number(e.target.value))} />
                        </label>
                    </div>
                    <div className={styles.modalButtons}>
                        <TButton btnType="small-rect" actionFunc={applyGoalConfig} label="Apply" />
                        <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel" />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default StopWatch;
