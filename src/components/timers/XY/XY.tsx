import type React from 'react';
import { useEffect, useState } from 'react';
import styles from '../timer-common.module.scss';
import commonTimerStyles from '../timer-common.module.scss';
import FormattedTimeDisplay from "../../generic/FormattedTimeDisplay";
import TimerControls from "../../menus/TimerControls/TimerControls";
import type { TimerFuncProps } from "../../menus/TimerControls/TimerControls";
import Rounds from "../../visualization/Rounds/Rounds";
import CompletionMessage from "../../visualization/CompletionMessage/CompletionMessage";
import Modal from "../../generic/Modal/Modal";
import TButton from "../../generic/Button/TButton.tsx";

interface XYTimerProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes? : string
}

const XY: React.FC<XYTimerProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [totalRounds, setTotalRounds] = useState(6); // Default rounds
    const [roundDuration, setRoundDuration] = useState(4000); // Default round duration in ms

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
    const applyCustomConfig = (customRounds: number, customDuration: number) => {
        setTotalRounds(customRounds);
        setRoundDuration(customDuration);
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
        <div className={`${styles.actionArea} ${ classes ?? ""}`}>
            {roundsLeft > 0 ? (
                <>
                    <FormattedTimeDisplay milliseconds={remainingTime} />
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
                            <TButton label="configure" btnType="small-rect" actionFunc={toggleModal} />
                        </div>
                    </TimerControls>
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
                        <label>
                            Rounds:
                            <input
                                type="number"
                                value={totalRounds}
                                onChange={(e) => setTotalRounds(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Duration per Round (ms):
                            <input
                                type="number"
                                value={roundDuration}
                                onChange={(e) => setRoundDuration(Number(e.target.value))}
                            />
                        </label>
                        <div className={commonTimerStyles.modalBtns}>
                            <TButton btnType="small-rect" actionFunc={() => applyCustomConfig(totalRounds, roundDuration)} label="Apply" />
                            <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel" />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default XY;
