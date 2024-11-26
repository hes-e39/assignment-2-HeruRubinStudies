import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import commonTimerStyles from '../timer-common.module.scss';
import Modal from '../../generic/Modal/ModalPopUp/Modal.tsx';
import TButton from '../../generic/Button/TButton.tsx';
import MenuContainer from '../../menus/MenuContainer/MenuContainer.tsx';
import CountdownEditor from '../../ConfigurationViews/CountdownEditor.tsx';
import ProgressBar from '../../visualization/ProgressBar/ProgressBar.tsx';
import type { TimerSequenceItem } from '../../../hooks/useTimer.tsx';

interface CountdownProps {
    milliseconds: number;
    isRunning: boolean;
    initialTime: number; // The initial countdown time in milliseconds
    updateTimer?: (index: number, updatedProperties: Partial<TimerSequenceItem>) => void;
    index?: number;
    classes?: string;
    reset: () => void;
    pause: () => void;
    start: () => void;
    onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ milliseconds, isRunning, initialTime, reset, index, pause, start, classes, onComplete, updateTimer }) => {
    const [customTime, setCustomTime] = useState(initialTime);
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isCountdownStopped, setIsCountdownStopped] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [goalHours, setGoalHours] = useState(0);
    const [goalMinutes, setGoalMinutes] = useState(0);
    const [goalSeconds, setGoalSeconds] = useState(0);

    const progressPercentage = Math.max((remainingTime / customTime) * 100, 0);

    // Update goal states when the modal opens
    useEffect(() => {
        if (isModalOpen) {
            const totalSeconds = Math.floor(initialTime / 1000);
            setGoalHours(Math.floor(totalSeconds / 3600));
            setGoalMinutes(Math.floor((totalSeconds % 3600) / 60));
            setGoalSeconds(totalSeconds % 60);
        }
    }, [isModalOpen, initialTime]);

    // Control completion action
    useEffect(() => {
        if (remainingTime <= 0) {
            onComplete?.();
        }
    }, [remainingTime, onComplete]);

    useEffect(() => {
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

                if (!hasCompleted && onComplete) {
                    onComplete();
                    setHasCompleted(true);
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, customTime, isCountdownStopped, hasCompleted, onComplete]);

    const resetCountdown = () => {
        setRemainingTime(customTime);
        setIsCountdownStopped(false);
        setHasCompleted(false);
        reset();
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const applyCustomTime = () => {
        const totalMilliseconds = goalHours * 3600000 + goalMinutes * 60000 + goalSeconds * 1000;
        if (updateTimer && index) {
            updateTimer(index, { initialTime: totalMilliseconds });
            setCustomTime(totalMilliseconds);
            setRemainingTime(totalMilliseconds);
            setIsCountdownStopped(false);
            setHasCompleted(false);
            reset();
            setIsModalOpen(false);
        }
    };

    return (
        <div className={`${commonTimerStyles.timerContainer} ${classes ?? ''}`}>
            <>
                <FormattedTimeDisplay milliseconds={remainingTime} size="large" useSemicolon />
                <TimerControls reset={resetCountdown} isRunning={isRunning} pause={pause} start={start}>
                    <ProgressBar progressPercentage={progressPercentage} />
                </TimerControls>
                <MenuContainer>
                    <TButton actionFunc={toggleModal} classes={`${commonTimerStyles.config}`} btnType="small-rect" label="Configure" />
                </MenuContainer>
            </>

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
                        showMenu={true}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Countdown;
