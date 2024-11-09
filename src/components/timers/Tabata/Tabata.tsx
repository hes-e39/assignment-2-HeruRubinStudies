import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../generic/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import Rounds from '../../visualization/Rounds/Rounds';
import styles from './Tabata.module.scss';
import commonTimerStyles from '../timer-common.module.scss';
import CompletionMessage from '../../visualization/CompletionMessage/CompletionMessage';
import Modal from '../../generic/Modal/Modal';
import TButton from "../../generic/Button/TButton.tsx";

interface TabataProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes? : string;
}

const Tabata: React.FC<TabataProps> = ({ milliseconds, isRunning, reset, pause, start, classes }) => {
    const [totalRounds, setTotalRounds] = useState(5); // Configurable total rounds
    const [workDuration, setWorkDuration] = useState(10 * 1000); // Configurable work duration in ms
    const [breakDuration, setBreakDuration] = useState(0.5 * 10 * 1000); // Configurable break duration in ms

    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [phase, setPhase] = useState<'Work' | 'Break'>('Work');
    const [phaseStartTime, setPhaseStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(workDuration);
    const [isPomodoroStopped, setIsPomodoroStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Reset Tabata timer state
    const resetTabata = () => {
        setRoundsLeft(totalRounds);
        setPhase('Work');
        setPhaseStartTime(0);
        setRemainingTime(workDuration);
        setIsPomodoroStopped(false);
        setCompletedRounds([]);
        reset(); // Reset external timer state
    };

    // Toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Apply custom configuration from modal
    const applyCustomConfig = (customRounds: number, customWork: number, customBreak: number) => {
        setTotalRounds(customRounds);
        setWorkDuration(customWork);
        setBreakDuration(customBreak);
        resetTabata(); // Reset with new settings
        setIsModalOpen(false); // Close the modal
    };

    useEffect(() => {
        if (!isPomodoroStopped && isRunning && roundsLeft > 0) {
            const elapsedTime = milliseconds - phaseStartTime;
            const currentPhaseDuration = phase === 'Work' ? workDuration : breakDuration;
            const timeLeft = currentPhaseDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (phase === 'Work') {
                    setPhase('Break');
                    setPhaseStartTime(milliseconds);
                    setRemainingTime(breakDuration);
                } else {
                    if (roundsLeft - 1 > 0) {
                        setRoundsLeft(roundsLeft - 1);
                        setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
                        setPhase('Work');
                        setPhaseStartTime(milliseconds);
                        setRemainingTime(workDuration);
                    } else {
                        setRoundsLeft(0);
                        setRemainingTime(0);
                        setIsPomodoroStopped(true);
                    }
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [milliseconds, isRunning, isPomodoroStopped, roundsLeft, totalRounds, phase, phaseStartTime, workDuration, breakDuration]);

    return (
        <div className={`${styles.tabataContainer} ${classes ?? ""}`}>
            {roundsLeft > 0 ? (
                <>
                    <h2>
                        <FormattedTimeDisplay milliseconds={remainingTime} />
                    </h2>
                    <TimerControls reset={resetTabata} isRunning={isRunning} pause={pause} start={start}>
                        <div className={commonTimerStyles.readout}>
                            <h2>Current Phase: {phase}</h2>
                            <h2>Rounds Left: {roundsLeft}</h2>
                            <Rounds
                                completedRounds={completedRounds}
                                roundsLeft={roundsLeft}
                                totalRounds={totalRounds}
                                workDuration={workDuration}
                                remainingTime={remainingTime}
                                breakDuration={breakDuration}
                            />
                            <TButton actionFunc={toggleModal} label="Configure" btnType="small-rect" />
                        </div>
                    </TimerControls>
                </>
            ) : (
                <CompletionMessage totalRounds={totalRounds} roundDuration={workDuration} onRepeat={resetTabata} />
            )}

            {/* Modal for Configuring Timer */}
            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} title="Configure Tabata Timer" >
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
                            Work Duration (ms):
                            <input
                                type="number"
                                value={workDuration}
                                onChange={(e) => setWorkDuration(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Break Duration (ms):
                            <input
                                type="number"
                                value={breakDuration}
                                onChange={(e) => setBreakDuration(Number(e.target.value))}
                            />
                        </label>
                    </div>
                    <div className={styles.modalButtons}>
                        <TButton btnType="small-rect" actionFunc={() => applyCustomConfig(totalRounds, workDuration, breakDuration)} label="Apply" />
                        <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel" />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Tabata;
