import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";

import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import styles from './Countdown.module.scss';
import commonStyles from '../../../main.module.scss';
import commonTimerStyles from "../timer-common.module.scss";
import Modal from "../../generic/Modal/Modal.tsx";
import TButton from "../../generic/Button/TButton.tsx";

interface CountdownProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
    classes? : string;
}

const Countdown: React.FC<CountdownProps> = ({ milliseconds, isRunning, initialTime, reset, pause, start, classes }) => {
    const [customTime, setCustomTime] = useState(initialTime); // State to hold custom time input
    const [remainingTime, setRemainingTime] = useState(customTime ?? initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Calculate the progress as a percentage
    const progressPercentage = (remainingTime / initialTime) * 100;

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
    }, [milliseconds, customTime, isCountdownStopped]);

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
        reset(); // Reset external timer state
        setRemainingTime(customTime);
        setIsCountdownStopped(false);
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className={`${styles.countdownContainer} ${classes ?? ""}`}>
            {remainingTime >= 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} />
                    <TimerControls reset={resetCountdown} isRunning={isRunning} pause={pause} start={start}>
                        <div className={styles.countDownArea}>
                            <TButton actionFunc={toggleModal} classes={commonStyles.spacer} btnType="small-rect" label="Configure"/>
                            <div className={styles.progressBarContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{width: `${progressPercentage}%`}}
                                />
                            </div>
                            <TButton actionFunc={toggleModal} btnType="small-rect" label="Configure"/>
                        </div>
                    </TimerControls>
                </>
            ) : (
                <CompletionMessage
                    totalRounds={1}
                    roundDuration={initialTime}
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
                        <label>
                            Duration (ms):
                            <input
                                type="number"
                                value={customTime}
                                onChange={(e) => setCustomTime(Number(e.target.value))}
                            />
                        </label>
                        <div className={commonTimerStyles.modalBtns}>
                            <TButton btnType="small-rect" label="Apply" actionFunc={applyCustomTime}/>
                            <TButton btnType="small-rect" label="Cancel" actionFunc={toggleModal}/>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Countdown;
