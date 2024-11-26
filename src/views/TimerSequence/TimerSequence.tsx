import type React from 'react';
import { useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import Countdown from '../../components/timers/Countdown/Countdown';
import Tabata from '../../components/timers/Tabata/Tabata';
import TimerTracker from '../../components/TimerTracker/TimerTracker';
import mainStyles from '../../main.module.scss';
import commonStyles from '../../common-styles/common-styles.module.scss';
import Stopwatch from "../../components/timers/Stopwatch/Stopwatch.tsx";
import XY from "../../components/timers/XY/XY.tsx";

const TimerSequence: React.FC = () => {
    const {
        milliseconds,
        isRunning,
        start,
        pause,
        reset,
        setTimerSequence,
        addTimer,
        deleteTimer,
        nextTimer,
        currentIndex,
        setCurrentIndex,
        sequence,
        handleTimerCompletion,
        updateTimer,
    } = useTimer();

    useEffect(() => {
        // Example sequence
        setTimerSequence([
            { type: 'countdown', label: 'Warm Up', initialTime: 2000 },
            { type: 'tabata', label: 'Stretch', rounds: 2, workDuration: 2000, breakDuration: 1000 },
            { type: 'stopwatch', label: 'Cool Down', initialTime: 2000 },
            { type: 'xy', rounds:3, label: 'Jumping jacks', roundMinutes :1, roundSeconds: 20 },
        ]);
    }, [setTimerSequence]);

    const currentTimer = sequence[currentIndex]; // Access the current timer in the sequence

    return (
        <div
            className={`${mainStyles.mainContainer} ${commonStyles.flexVertCenter} ${commonStyles.flexVert} ${commonStyles.flexHorzCenter}`}
        >
            <div className={mainStyles.timerArea}>
                {/* Render only the current timer */}
                {currentTimer?.type === 'countdown' && (
                    <Countdown
                        key={`countdown-${currentIndex}`}
                        index={currentIndex}
                        milliseconds={milliseconds}
                        isRunning={isRunning}
                        initialTime={currentTimer.initialTime ?? 0}
                        updateTimer={updateTimer}
                        reset={reset}
                        pause={pause}
                        start={start}
                        onComplete={nextTimer}
                    />
                )}
                {currentTimer?.type === 'tabata' && (
                    <Tabata
                        key={`tabata-${currentIndex}`}
                        index={currentIndex}
                        totalRoundsExternal={currentTimer.rounds}
                        workDurationExternal={currentTimer.workDuration}
                        breakDurationExternal={currentTimer.breakDuration}
                        milliseconds={milliseconds}
                        isRunning={isRunning}
                        updateTimer={updateTimer}
                        reset={reset}
                        pause={pause}
                        start={start}
                        onComplete={handleTimerCompletion}
                    />
                )}
                {currentTimer?.type === 'stopwatch' && (
                    <Stopwatch
                        key={`stopwatch-${currentIndex}`}
                        index={currentIndex}
                        updateTimer={updateTimer}
                        milliseconds={milliseconds}
                        isRunning={isRunning}
                        start={start}
                        pause={pause}
                        reset={reset}
                    />
                )
                }
                {currentTimer?.type === 'xy' && (
                    <XY
                        key={`xy-${currentIndex}`}
                        index={currentIndex}
                        updateTimer={updateTimer}
                        milliseconds={milliseconds}
                        isRunning={isRunning}
                        start={start}
                        pause={pause}
                        reset={reset}
                        totalRoundsExternal={currentTimer.rounds}
                        roundMinutesExternal={Math.floor(currentTimer.initialTime ?? 100000 / 60000)}
                        roundSecondsExternal={(currentTimer.initialTime ?? 100000 % 60000) / 1000}
                    />
                )}


                <button className={mainStyles.skip} onClick={nextTimer}>
                    Next
                </button>
            </div>
            <TimerTracker
                timerSequence={sequence}
                currentTimerIndex={currentIndex}
                elapsedMilliseconds={milliseconds}
                onTimerSelect={(index) => setCurrentIndex(index)}
                onDelete={deleteTimer}
                onAddTimer={() =>
                    addTimer({
                        type: 'countdown',
                        label: 'New Timer',
                        initialTime: 5000,
                    })
                }
            />
        </div>
    );
};

export default TimerSequence;
