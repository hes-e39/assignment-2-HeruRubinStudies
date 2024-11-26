import type React from 'react';
import { useEffect, useState } from 'react';
import commonTimerStyles from '../timer-common.module.scss';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import Rounds from '../../visualization/Rounds/Rounds';
import Modal from '../../generic/Modal/ModalPopUp/Modal';
import TButton from '../../generic/Button/TButton';
import MenuContainer from '../../menus/MenuContainer/MenuContainer';
import type { TimerSequenceItem } from '../../../hooks/useTimer';
import XYEditor from "../../ConfigurationViews/XYeditor.tsx";

interface XYTimerProps {
    milliseconds: number;
    isRunning: boolean;
    reset: () => void;
    pause: () => void;
    start: () => void;
    index?: number; // Index in the sequence
    updateTimer?: (index: number, updatedProperties: Partial<TimerSequenceItem>) => void; // Function to update the timer
    totalRoundsExternal?: number;
    roundMinutesExternal?: number;
    roundSecondsExternal?: number;
    classes?: string;
}

const XY: React.FC<XYTimerProps> = ({
                                        milliseconds,
                                        isRunning,
                                        reset,
                                        pause,
                                        start,
                                        index,
                                        updateTimer,
                                        totalRoundsExternal = 6,
                                        roundMinutesExternal = 0,
                                        roundSecondsExternal = 4,
                                        classes,
                                    }) => {
    const [totalRounds, setTotalRounds] = useState(totalRoundsExternal);
    const [roundMinutes, setRoundMinutes] = useState(roundMinutesExternal);
    const [roundSeconds, setRoundSeconds] = useState(roundSecondsExternal);

    const [roundDuration, setRoundDuration] = useState(
        (roundMinutesExternal * 60 + roundSecondsExternal) * 1000
    );
    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(roundDuration);
    const [isXYStopped, setIsXYStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetXY = () => {
        setRoundsLeft(totalRounds);
        setRoundStartTime(0);
        setRemainingTime(roundDuration);
        setIsXYStopped(false);
        setCompletedRounds([]);
        reset(); // Reset external timer state
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const applyCustomConfig = () => {
        const updatedRoundDuration = (roundMinutes * 60 + roundSeconds) * 1000;

        // Update the timer in the sequence
        if(updateTimer && index){
            updateTimer(index, {
                rounds: totalRounds,
                roundMinutes,
                roundSeconds,
            });
        }

        setRoundDuration(updatedRoundDuration);
        setRoundsLeft(totalRounds);
        resetXY(); // Reset with new settings
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (isModalOpen) {
            // Sync editor state when the modal is opened
            setRoundMinutes(Math.floor(roundDuration / 60000));
            setRoundSeconds((roundDuration % 60000) / 1000);
        }
    }, [isModalOpen, roundDuration]);

    useEffect(() => {
        if (!isXYStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - roundStartTime;
            const timeLeft = roundDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (roundsLeft - 1 > 0) {
                    setRoundsLeft(roundsLeft - 1);
                    setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
                    setRoundStartTime(milliseconds);
                    setRemainingTime(roundDuration);
                } else {
                    setRoundsLeft(0);
                    setRemainingTime(0);
                    setIsXYStopped(true);
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, isRunning, isXYStopped, roundsLeft, roundStartTime, roundDuration, totalRounds]);

    return (
        <div className={`${commonTimerStyles.timerContainer} ${classes ?? ''}`}>
            <FormattedTimeDisplay milliseconds={remainingTime} useSemicolon size="large" />
            <TimerControls reset={resetXY} isRunning={isRunning} pause={pause} start={start}>
                <div className={commonTimerStyles.readout}>
                    <h2>Rounds Left: {roundsLeft}</h2>
                    <Rounds
                        completedRounds={completedRounds}
                        roundsLeft={roundsLeft}
                        totalRounds={totalRounds}
                        workDuration={roundDuration}
                        remainingTime={remainingTime}
                    />
                </div>
            </TimerControls>
            <MenuContainer>
                <TButton
                    label="Configure"
                    btnType="small-rect"
                    classes={commonTimerStyles.config}
                    actionFunc={toggleModal}
                />
            </MenuContainer>

            {/* Modal for Configuring Timer */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn title="Configure XY Timer">
                    <XYEditor
                        toggleModal={toggleModal}
                        setRoundSeconds={setRoundSeconds}
                        roundSeconds={roundSeconds}
                        totalRounds={totalRounds}
                        setRoundMinutes={setRoundMinutes}
                        roundMinutes={roundMinutes}
                        applyCustomConfig={applyCustomConfig}
                        setTotalRounds={setTotalRounds}
                        showMenu={true}
                    />
                </Modal>
            )}
        </div>
    );
};

export default XY;
