import type React from 'react';
import { useEffect, useState } from 'react';
import FormattedTimeDisplay from '../../visualization/FormattedTimeDisplay/FormattedTimeDisplay';
import TimerControls from '../../menus/TimerControls/TimerControls';
import Rounds from '../../visualization/Rounds/Rounds';
import styles from './Tabata.module.scss';
import commonTimerStyles from '../timer-common.module.scss';
import Modal from '../../generic/Modal/ModalPopUp/Modal';
import TButton from '../../generic/Button/TButton';
import MenuContainer from '../../menus/MenuContainer/MenuContainer';
import TabataEditor from '../../ConfigurationViews/TabataEditor';
import type {TimerSequenceItem} from "../../../hooks/useTimer.tsx";

interface TabataProps {
    milliseconds: number;
    isRunning: boolean;
    reset: () => void;
    pause: () => void;
    start: () => void;
    index?: number; // Index in the sequence
    updateTimer?: (index: number, updatedProperties: Partial<TimerSequenceItem>) => void; // Function to update the timer
    totalRoundsExternal?: number;
    workDurationExternal?: number;
    breakDurationExternal?: number;
    classes?: string;
    onComplete?: () => void;
}

const Tabata: React.FC<TabataProps> = ({
                                           milliseconds,
                                           isRunning,
                                           reset,
                                           pause,
                                           start,
                                           index,
                                           updateTimer,
                                           totalRoundsExternal = 5,
                                           workDurationExternal = 10000,
                                           breakDurationExternal = 5000,
                                           classes,
                                           onComplete,
                                       }) => {
    const [totalRounds, setTotalRounds] = useState(totalRoundsExternal);
    const [workMinutes, setWorkMinutes] = useState(Math.floor(workDurationExternal / 60000));
    const [workSeconds, setWorkSeconds] = useState((workDurationExternal % 60000) / 1000);
    const [breakMinutes, setBreakMinutes] = useState(Math.floor(breakDurationExternal / 60000));
    const [breakSeconds, setBreakSeconds] = useState((breakDurationExternal % 60000) / 1000);

    const [workDuration, setWorkDuration] = useState(workDurationExternal);
    const [breakDuration, setBreakDuration] = useState(breakDurationExternal);

    const [roundsLeft, setRoundsLeft] = useState(totalRounds);
    const [phase, setPhase] = useState<'Work' | 'Break'>('Work');
    const [phaseStartTime, setPhaseStartTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(workDuration);
    const [isPomodoroStopped, setIsPomodoroStopped] = useState(false);
    const [completedRounds, setCompletedRounds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetTabata = () => {
        setRoundsLeft(totalRounds);
        setPhase('Work');
        setPhaseStartTime(0);
        setRemainingTime(workDuration);
        setIsPomodoroStopped(false);
        setCompletedRounds([]);
        reset();
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const applyCustomConfig = () => {
        const updatedWorkDuration = (workMinutes * 60 + workSeconds) * 1000;
        const updatedBreakDuration = (breakMinutes * 60 + breakSeconds) * 1000;

        setWorkDuration(updatedWorkDuration);
        setBreakDuration(updatedBreakDuration);
        setRoundsLeft(totalRounds);

        // Update the timer in the sequence
        if(updateTimer && index){
            updateTimer(index, {
                rounds: totalRounds,
                workDuration: updatedWorkDuration,
                breakDuration: updatedBreakDuration,
            });
        }

        resetTabata();
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (roundsLeft === 0 && remainingTime === 0) {
            onComplete?.();
        }
    }, [roundsLeft, remainingTime, onComplete]);

    useEffect(() => {
        if (!isPomodoroStopped && isRunning) {
            const elapsedTime = milliseconds - phaseStartTime;
            const currentPhaseDuration = phase === 'Work' ? workDuration : breakDuration;
            const timeLeft = currentPhaseDuration - elapsedTime;

            if (timeLeft <= 0) {
                if (phase === 'Work') {
                    setPhase('Break');
                    setPhaseStartTime(milliseconds);
                    setRemainingTime(breakDuration);
                } else {
                    if (roundsLeft > 1) {
                        setRoundsLeft((prev) => prev - 1);
                        setCompletedRounds((prev) => [...prev, totalRounds - roundsLeft]);
                        setPhase('Work');
                        setPhaseStartTime(milliseconds);
                        setRemainingTime(workDuration);
                    } else {
                        setRoundsLeft(0);
                        setRemainingTime(0);
                        setIsPomodoroStopped(true);
                        onComplete?.();
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
                    <FormattedTimeDisplay size="large" useSemicolon milliseconds={remainingTime} />
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
                <Modal closeFunc={toggleModal} hasCloseBtn title="Configure Tabata Timer">
                    <TabataEditor
                        showMenu={true}
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
