import type React from 'react';
import { useEffect, useState } from 'react';
import commonTimerStyles from '../timer-common.module.scss';
import FormattedTimeDisplay from "../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx";
import TimerControls from "../../menus/TimerControls/TimerControls";
import type { TimerFuncProps } from "../../menus/TimerControls/TimerControls";
import Rounds from "../../visualization/Rounds/Rounds";
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";
import Modal from "../../generic/Modal/Modal";
import TButton from "../../generic/Button/TButton.tsx";
import MenuContainer from "../../menus/MenuContainer/MenuContainer.tsx";
import NumberStepper from "../../generic/NumberStepper/NumberStepper.tsx";

interface XYTimerProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes?: string;
}

const XY: React.FC<XYTimerProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [totalRounds, setTotalRounds] = useState(6); // Default rounds
    const [roundMinutes, setRoundMinutes] = useState(0); // Round duration in minutes
    const [roundSeconds, setRoundSeconds] = useState(4); // Round duration in seconds

    const [roundDuration, setRoundDuration] = useState((roundMinutes * 60 + roundSeconds) * 1000); // Duration in ms
    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [roundStartTime, setRoundStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(roundDuration);
    const [isXYStopped, setIsXYStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reset function
    const resetXY = () => {
        setRoundsLeft(totalRounds);
        setRoundStartTime(0);
        setRemainingTime(roundDuration);
        setIsXYStopped(false);
        setCompletedRounds([]);
        reset(); // Reset external timer state
    };

    // Open or close the modal
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Apply custom configuration from modal
    const applyCustomConfig = () => {
        const updatedRoundDuration = (roundMinutes * 60 + roundSeconds) * 1000;
        setRoundDuration(updatedRoundDuration);
        setRoundsLeft(totalRounds);
        resetXY(); // Reset with new settings
        setIsModalOpen(false); // Close the modal
    };

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
        <div className={`${commonTimerStyles.timerContainer} ${classes ?? ""}`}>
            {roundsLeft > 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} useSemicolon={true} size="large" />
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
                        <TButton label="Configure" btnType="small-rect" classes={commonTimerStyles.config} actionFunc={toggleModal} />
                    </MenuContainer>
                </>
            ) : (
                <CompletionMessage
                    totalRounds={totalRounds}
                    roundDuration={roundDuration}
                    onRepeat={resetXY}
                />
            )}

            {/* Modal for Configuring Timer */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} title="Configure XY Timer">
                    <div className={commonTimerStyles.inputsArea}>
                        <div className={commonTimerStyles.steppersArea}>
                            <NumberStepper
                                label="Rounds"
                                value={totalRounds}
                                onChange={(newValue: number) => setTotalRounds(newValue)}
                                min={1}
                                max={100}
                                step={1}
                            />
                            <NumberStepper
                                label="Minutes per Round"
                                value={roundMinutes}
                                onChange={(newValue: number) => setRoundMinutes(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                            <NumberStepper
                                label="Seconds per Round"
                                value={roundSeconds}
                                onChange={(newValue: number) => setRoundSeconds(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                        </div>
                    </div>
                    <div className={commonTimerStyles.modalBtns}>
                        <TButton btnType="small-rect" actionFunc={applyCustomConfig} label="Apply" />
                        <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel" />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default XY;
