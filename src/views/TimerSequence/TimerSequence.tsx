import type React from 'react';
import { useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import Countdown from '../../components/timers/Countdown/Countdown';
import Tabata from '../../components/timers/Tabata/Tabata';
import TimerTracker from '../../components/TimerTracker/TimerTracker';
import mainStyles from '../../main.module.scss';

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
        isSequenceMode,
        currentIndex,
        setCurrentIndex,
        sequence,
        handleTimerCompletion,
    } = useTimer();

    useEffect(() => {
        // Example sequence
        setTimerSequence([
            { type: 'countdown', label: 'Warm Up', initialTime: 2000 },
            { type: 'tabata', label: 'Stretch', rounds: 2, workDuration: 2000, breakDuration: 1000 },
            { type: 'countdown', label: 'Cool Down', initialTime: 3000 },
        ]);
    }, [setTimerSequence]);

    return (
        <div className={mainStyles.mainContainer}>
            {isSequenceMode && sequence[currentIndex]?.type === 'countdown' && (
                <Countdown
                    initialTime={sequence[currentIndex]?.initialTime ?? 0}
                    milliseconds={milliseconds}
                    isRunning={isRunning}
                    reset={reset}
                    pause={pause}
                    start={start}
                    onComplete={handleTimerCompletion} // Use handleTimerCompletion
                />
            )}
            {isSequenceMode && sequence[currentIndex]?.type === 'tabata' && (
                <Tabata
                    totalRoundsExternal={sequence[currentIndex]?.rounds}
                    workDurationExternal={sequence[currentIndex]?.workDuration}
                    breakDurationExternal={sequence[currentIndex]?.breakDuration}
                    milliseconds={milliseconds}
                    isRunning={isRunning}
                    reset={reset}
                    pause={pause}
                    start={start}
                    onComplete={handleTimerCompletion} // Use handleTimerCompletion
                />
            )}
            <button onClick={nextTimer}>Next</button>
            <TimerTracker
                timerSequence={sequence}
                currentTimerIndex={currentIndex}
                elapsedMilliseconds={milliseconds}
                onTimerSelect={(index) => setCurrentIndex(index)}
                onDelete={deleteTimer}
                onAddTimer={() => addTimer({
                    type: 'countdown',
                    label: 'New Timer',
                    initialTime: 5000,
                })}
            />
        </div>
    );
};

export default TimerSequence;
