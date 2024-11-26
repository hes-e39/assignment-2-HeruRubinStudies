import type React from 'react';
import { useState, useEffect } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import Modal from '../../generic/Modal/ModalPopUp/Modal.tsx';
import TButton from '../../generic/Button/TButton';
import NumberedList from '../../NumberedList/NumberedList';
import { formatTimerNumber } from '../../../utils/helpers';
import stopwatchStyles from './Stopwatch.module.scss';
import commonBtnStyles from '../../generic/Button/TButton.module.scss';
import listStyles from '../../NumberedList/numberdList.module.scss';
import MenuContainer from '../../menus/MenuContainer/MenuContainer.tsx';
import StopwatchEditor from '../../ConfigurationViews/StopwatchEditor.tsx';
import type { TimerSequenceItem } from '../../../hooks/useTimer.tsx';

interface StopWatchProps {
    milliseconds: number;
    isRunning: boolean;
    reset: () => void;
    pause: () => void;
    start: () => void;
    index?: number; // Index in the sequence
    updateTimer?: (index: number, updatedProperties: Partial<TimerSequenceItem>) => void; // Function to update the timer
    classes?: string;
    onComplete?: () => void; // Callback for when the goal is reached
}

const StopWatch: React.FC<StopWatchProps> = ({
                                                 milliseconds,
                                                 isRunning,
                                                 reset,
                                                 pause,
                                                 start,
                                                 index,
                                                 updateTimer,
                                                 classes,
                                                 onComplete,
                                             }) => {
    const [laps, setLaps] = useState<{ numberLabel: string; nameLabel: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Configuration state for goal time
    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    // Calculate goal time in milliseconds
    const goalTime = (goalHours * 3600 + goalMinutes * 60 + goalSeconds) * 1000;

    // Initialize goal time states when the modal is opened
    useEffect(() => {
        if (isModalOpen) {
            const totalSeconds = Math.floor(goalTime / 1000);
            setGoalHours(Math.floor(totalSeconds / 3600));
            setGoalMinutes(Math.floor((totalSeconds % 3600) / 60));
            setGoalSeconds(totalSeconds % 60);
        }
    }, [isModalOpen, goalTime]);

    // Check if the goal time is reached
    useEffect(() => {
        if (milliseconds >= goalTime && goalTime > 0) {
            pause();
            onComplete?.(); // Notify parent (e.g., useTimer) that the timer has completed
        }
    }, [milliseconds, goalTime, pause, onComplete]);

    const addLap = () => {
        setLaps((prevLaps) => [
            { numberLabel: formatTimerNumber(laps.length + 1), nameLabel: `${formatTimerNumber(milliseconds)}` },
            ...prevLaps,
        ]);
    };

    const clearLaps = () => {
        setLaps([]);
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const applyGoalConfig = () => {
        const updatedGoalTime = (goalHours * 3600 + goalMinutes * 60 + goalSeconds) * 1000;

        // Update the timer's goal time in the sequence
        if(updateTimer && index){
            updateTimer(index, { initialTime: updatedGoalTime });
        }

        setIsModalOpen(false);
        reset();
    };

    return (
        <div className={`${stopwatchStyles.stopwatchContainer} ${classes ?? ''}`}>
            <FormattedTimeDisplay milliseconds={milliseconds} size="large" useSemicolon />
            <TimerControls reset={reset} isRunning={isRunning} pause={pause} start={start}>
                <div className={stopwatchStyles.lapsControlsArea}>
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
                <div className={stopwatchStyles.goalReadout}>
                    {goalTime > 0 ? (
                        <>
                            <span className={stopwatchStyles.goalText}>Goal:</span>{' '}
                            <FormattedTimeDisplay
                                milliseconds={goalTime}
                                useSemicolon={false}
                                mode="units"
                                size="small"
                            />
                            <TButton
                                classes={commonBtnStyles.config}
                                btnType="small-rect"
                                label="Edit"
                                actionFunc={toggleModal}
                            />
                        </>
                    ) : (
                        <TButton
                            classes={commonBtnStyles.config}
                            btnType="small-rect"
                            label="Set Goal"
                            actionFunc={toggleModal}
                        />
                    )}
                </div>
            </MenuContainer>

            {/* Laps display */}
            {laps.length > 0 && (
                <div className={stopwatchStyles.lapsContainer}>
                    <ul className={stopwatchStyles.lapList}>
                        <NumberedList
                            presets="light-on-dark"
                            classes={stopwatchStyles.lapList}
                            listItems={laps.slice(0, 3)}
                        />
                        {laps.length > 3 && (
                            <li className={`${listStyles.item} ${listStyles.lightOnDark}`}>
                                <span className={`${listStyles.label}`}>{laps.length - 3} more laps</span>
                            </li>
                        )}
                    </ul>
                    <div className={stopwatchStyles.lapActionsArea}>
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

            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn title="Set Goal Time">
                    <StopwatchEditor
                        showMenu={true}
                        toggleModal={toggleModal}
                        goalHours={goalHours}
                        goalMinutes={goalMinutes}
                        goalSeconds={goalSeconds}
                        applyCustomConfig={applyGoalConfig}
                        setGoalMinutes={setGoalMinutes}
                        setGoalHours={setGoalHours}
                        setGoalSeconds={setGoalSeconds}
                    />
                </Modal>
            )}
        </div>
    );
};

export default StopWatch;
