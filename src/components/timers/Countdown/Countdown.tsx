import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import commonTimerStyles from '../timer-common.module.scss';
import Modal from '../../generic/Modal/ModalPopUp/Modal.tsx';
import TButton from '../../generic/Button/TButton.tsx';
import MenuContainer from '../../menus/MenuContainer/MenuContainer.tsx';
import CountdownEditor from '../../ConfigurationViews/CountdownEditor.tsx';
import ProgressBar from '../../visualization/ProgressBar/ProgressBar.tsx';

interface CountdownProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
    classes?: string;
    onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
                                                 milliseconds,
                                                 isRunning,
                                                 initialTime,
                                                 reset,
                                                 pause,
                                                 start,
                                                 classes,
                                                 onComplete,
                                             }) => {
    const [customTime, setCustomTime] = useState(initialTime);
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate the progress as a percentage
    const progressPercentage = Math.max((remainingTime / customTime) * 100, 0);

    //control completion action
    useEffect(() => {
        if(remainingTime <= 0){
            onComplete!()
        }
    }, [remainingTime, onComplete]);

    useEffect(() => {
        // Reset state when the initialTime changes
        setCustomTime(initialTime);
        setRemainingTime(initialTime);
        setIsCountdownStopped(false);
        setHasCompleted(false);
    }, [initialTime]);

    useEffect(() => {
        if (!isCountdownStopped) {
            const timeLeft = customTime - milliseconds;

            if (timeLeft <= 0) {
                setRemainingTime(0);
                setIsCountdownStopped(true);

                // Trigger onComplete only once
                if (!hasCompleted && onComplete) {
                    onComplete();
                    setHasCompleted(true);
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, customTime, isCountdownStopped, hasCompleted, onComplete]);

    // Reset the countdown and all related states
    const resetCountdown = () => {
        setRemainingTime(customTime);
        setIsCountdownStopped(false);
        setHasCompleted(false);
        reset();
    };

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Apply new timer duration from custom input
    const applyCustomTime = () => {
        const totalMilliseconds =
            goalHours * 3600000 +
            goalMinutes * 60000 +
            goalSeconds * 1000;

        setCustomTime(totalMilliseconds);
        setRemainingTime(totalMilliseconds);
        setIsCountdownStopped(false);
        setHasCompleted(false);
        reset();
        setIsModalOpen(false);
    };

    // Separate states for goal time configuration
    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    return (
        <div className={`${commonTimerStyles.timerContainer} ${classes ?? ''}`}>

                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} size="large" useSemicolon />
                    <TimerControls reset={resetCountdown} isRunning={isRunning} pause={pause} start={start}>
                        <ProgressBar progressPercentage={progressPercentage} />
                    </TimerControls>
                    <MenuContainer>
                        <TButton
                            actionFunc={toggleModal}
                            classes={`${commonTimerStyles.config}`}
                            btnType="small-rect"
                            label="Configure"
                        />
                    </MenuContainer>
                </>


            {/* Modal for Configuring Timer */}
            {isModalOpen && (
                <Modal title="Configure Countdown" closeFunc={toggleModal} hasCloseBtn={true}>
                    <CountdownEditor
                        applyCustomConfig={applyCustomTime}
                        toggleModal={toggleModal}
                        setGoalHours={setGoalHours}
                        setGoalSeconds={setGoalSeconds}
                        setGoalMinutes={setGoalMinutes}
                        goalSeconds={goalSeconds}
                        goalMinutes={goalMinutes}
                        goalHours={goalHours}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Countdown;
