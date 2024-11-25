import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";

import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import styles from './Countdown.module.scss';
import commonTimerStyles from "../timer-common.module.scss";
import Modal from "../../generic/Modal/Modal.tsx";
import TButton from "../../generic/Button/TButton.tsx";
import MenuContainer from "../../menus/MenuContainer/MenuContainer.tsx";
import NumberStepper from "../../generic/NumberStepper/NumberStepper.tsx";

interface CountdownProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
    classes?: string;
    onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ milliseconds, isRunning, initialTime, reset, pause, start, classes, onComplete }) => {
    const [customTime, setCustomTime] = useState(initialTime); // State to hold custom time input
    const [remainingTime, setRemainingTime] = useState(customTime ?? initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Separate states for hours, minutes, and seconds
    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    // Calculate the progress as a percentage
    const progressPercentage = (remainingTime / customTime) * 100;

    // Update the remaining time based on elapsed milliseconds
    useEffect(() => {
        if (!isCountdownStopped) {
            const timeLeft = customTime - milliseconds;
            if (timeLeft < 0) {
                setIsCountdownStopped(true);
                setRemainingTime(0);
            } else {
                setRemainingTime(timeLeft);
            }
        }
        if (onComplete) {
            onComplete();
        }
    }, [milliseconds, customTime, isCountdownStopped, onComplete]);

    // Reset the countdown without starting it automatically
    const resetCountdown = () => {
        setRemainingTime(customTime);
        setIsCountdownStopped(false);
        reset(); // Reset external timer state without starting
    };

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Apply new timer duration from custom input
    const applyCustomTime = () => {
        const totalMilliseconds =
            goalHours * 3600000 + // Convert hours to milliseconds
            goalMinutes * 60000 + // Convert minutes to milliseconds
            goalSeconds * 1000; // Convert seconds to milliseconds

        setCustomTime(totalMilliseconds); // Update custom time
        setRemainingTime(totalMilliseconds); // Update remaining time
        setIsCountdownStopped(false);
        reset(); // Reset external timer state
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className={`${commonTimerStyles.timerContainer} ${classes ?? ""}`}>
            {remainingTime >= 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} size="large" useSemicolon={true} />
                    <TimerControls reset={resetCountdown} isRunning={isRunning} pause={pause} start={start}>
                        <div className={styles.countDownArea}>
                            <div className={styles.progressBarContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </TimerControls>
                    <MenuContainer>
                        <TButton actionFunc={toggleModal} classes={`${commonTimerStyles.config} `} btnType="small-rect" label="Configure" />
                    </MenuContainer>
                </>
            ) : (
                <CompletionMessage
                    totalRounds={1}
                    roundDuration={customTime}
                    onRepeat={() => {
                        resetCountdown();
                        start(); // Start the countdown only on explicit user action
                    }}
                />
            )}

            {/* Modal for Configuring Timer */}
            {isModalOpen && (
                <Modal title="Configure Countdown" closeFunc={toggleModal} hasCloseBtn={true}>
                    <div className={commonTimerStyles.inputsArea}>
                        <div className={commonTimerStyles.steppersArea}>
                            <NumberStepper
                                label="Hours"
                                value={goalHours}
                                onChange={(newValue: number) => setGoalHours(newValue)}
                                min={0}
                                max={100}
                                step={1}
                            />
                            <NumberStepper
                                label="Minutes"
                                value={goalMinutes}
                                onChange={(newValue: number) => setGoalMinutes(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                            <NumberStepper
                                label="Seconds"
                                value={goalSeconds}
                                onChange={(newValue: number) => setGoalSeconds(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                        </div>
                    </div>
                    <div className={commonTimerStyles.modalBtns}>
                        <TButton btnType="small-rect" label="Apply" actionFunc={applyCustomTime}/>
                        <TButton btnType="small-rect" label="Cancel" actionFunc={toggleModal}/>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Countdown;
