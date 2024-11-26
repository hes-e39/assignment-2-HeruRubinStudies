import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay.tsx';
import TimerControls from '../../menus/TimerControls/TimerControls';
import type { TimerFuncProps } from '../../menus/TimerControls/TimerControls';
import Rounds from '../../visualization/Rounds/Rounds';
import styles from './Tabata.module.scss';
import commonTimerStyles from '../timer-common.module.scss';
import Modal from '../../generic/Modal/ModalPopUp/Modal.tsx';
import TButton from "../../generic/Button/TButton.tsx";
import MenuContainer from "../../menus/MenuContainer/MenuContainer.tsx";
import TabataEditor from "../../ConfigurationViews/TabataEditor.tsx";

interface TabataProps extends TimerFuncProps {
    milliseconds: number;
    isRunning: boolean;
    classes?: string;
    totalRoundsExternal?: number;
    workDurationExternal?: number;
    breakDurationExternal?: number;
    onComplete?: () => void; // Notify parent of completion
}

const Tabata: React.FC<TabataProps> = ({
                                           milliseconds,
                                           isRunning,
                                           reset,
                                           pause,
                                           start,
                                           classes,
                                           totalRoundsExternal,
                                           workDurationExternal,
                                           breakDurationExternal,
                                           onComplete,
                                       }) => {
    const [totalRounds, setTotalRounds] = useState(totalRoundsExternal ?? 5); // Default total rounds
    const [workMinutes, setWorkMinutes] = useState(Math.floor((workDurationExternal ?? 10000) / 60000)); // Work minutes
    const [workSeconds, setWorkSeconds] = useState(((workDurationExternal ?? 10000) % 60000) / 1000); // Work seconds
    const [breakMinutes, setBreakMinutes] = useState(Math.floor((breakDurationExternal ?? 5000) / 60000)); // Break minutes
    const [breakSeconds, setBreakSeconds] = useState(((breakDurationExternal ?? 5000) % 60000) / 1000); // Break seconds

    const [workDuration, setWorkDuration] = useState((workMinutes * 60 + workSeconds) * 1000); // Work duration in ms
    const [breakDuration, setBreakDuration] = useState((breakMinutes * 60 + breakSeconds) * 1000); // Break duration in ms

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
    const applyCustomConfig = () => {
        const updatedWorkDuration = (workMinutes * 60 + workSeconds) * 1000;
        const updatedBreakDuration = (breakMinutes * 60 + breakSeconds) * 1000;

        setWorkDuration(updatedWorkDuration);
        setBreakDuration(updatedBreakDuration);
        setRoundsLeft(totalRounds);
        resetTabata(); // Reset with new settings
        setIsModalOpen(false); // Close the modal
    };

    //control completion action
    useEffect(() => {
        if(roundsLeft === 0 && remainingTime === 0){
            onComplete!()
        }
    }, [roundsLeft, remainingTime, onComplete]);



    useEffect(() => {
        if (!isPomodoroStopped && isRunning) {
            const elapsedTime = milliseconds - phaseStartTime;
            const currentPhaseDuration = phase === 'Work' ? workDuration : breakDuration;
            const timeLeft = currentPhaseDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (phase === 'Work') {
                    // Transition to Break Phase
                    setPhase('Break');
                    setPhaseStartTime(milliseconds);
                    setRemainingTime(breakDuration);
                } else {
                    if (roundsLeft > 1) {
                        // Transition to Next Round
                        setRoundsLeft(roundsLeft - 1);
                        setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
                        setPhase('Work');
                        setPhaseStartTime(milliseconds);
                        setRemainingTime(workDuration);
                    } else {
                        // Final Round Completed
                        setRoundsLeft(0);
                        setRemainingTime(0);
                        setIsPomodoroStopped(true);
                        if (onComplete) {
                            onComplete(); // Notify Parent
                        }
                    }
                }
            } else {
                setRemainingTime(timeLeft);
            }
        }
    }, [
        milliseconds,
        isRunning,
        isPomodoroStopped,
        roundsLeft,
        totalRounds,
        phase,
        phaseStartTime,
        workDuration,
        breakDuration,
        onComplete,
    ]);


    return (
        <div className={`${styles.tabataContainer} ${classes ?? ''}`}>
            <>
                <h2>
                    <FormattedTimeDisplay size="large" useSemicolon={true} milliseconds={remainingTime} />
                </h2>
                <TimerControls reset={resetTabata} isRunning={isRunning} pause={pause} start={start}>
                    <div className={commonTimerStyles.readout}>
                        <h2>{phase}</h2>
                        <Rounds
                            completedRounds={completedRounds}
                            roundsLeft={roundsLeft}
                            totalRounds={totalRounds}
                            workDuration={workDuration}
                            remainingTime={remainingTime}
                            breakDuration={breakDuration}
                        />
                    </div>
                </TimerControls>
                <MenuContainer>
                    <TButton
                        classes={commonTimerStyles.config}
                        actionFunc={toggleModal}
                        label="Configure"
                        btnType="small-rect"
                    />
                </MenuContainer>
            </>

            {isModalOpen && (
                <Modal closeFunc={toggleModal} hasCloseBtn={true} title="Configure Tabata Timer">
                    <TabataEditor
                        setTotalRounds={setTotalRounds}
                        totalRounds={totalRounds}
                        setBreakMinutes={setBreakMinutes}
                        breakMinutes={breakMinutes}
                        setWorkMinutes={setWorkMinutes}
                        workMinutes={workMinutes}
                        setWorkSeconds={setWorkSeconds}
                        workSeconds={workSeconds}
                        setBreakSeconds={setBreakSeconds}
                        breakSeconds={breakSeconds}
                        toggleModal={toggleModal}
                        applyCustomConfig={applyCustomConfig}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Tabata;

