import { useState, useRef, useCallback, useEffect } from 'react';

export type TimerType = 'countdown' | 'tabata' | 'stopwatch' | 'xy';

export type TimerSequenceItem = {
    type: TimerType;
    initialTime?: number;
    rounds?: number;
    workDuration?: number;
    breakDuration?: number;
    roundMinutes?: number;
    roundSeconds?: number;
    label?: string;
};

const useTimer = () => {
    const [milliseconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [sequence, setSequence] = useState<TimerSequenceItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSequenceMode, setIsSequenceMode] = useState(false);

    const timerRef = useRef<number | null>(null);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = window.setInterval(() => {
                setMilliseconds((prev) => prev + 10);
            }, 10);
        }
    }, [isRunning]);

    const pause = useCallback(() => {
        if (isRunning && timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
        }
    }, [isRunning]);

    const reset = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setMilliseconds(0);
        setIsRunning(false);
    }, []);

    const setTimerSequence = useCallback(
        (newSequence: TimerSequenceItem[]) => {
            setSequence(newSequence);
            setCurrentIndex(0);
            setIsSequenceMode(true);
            reset();
        },
        [reset]
    );

    const addTimer = useCallback((newTimer: TimerSequenceItem) => {
        setSequence((prev) => [...prev, newTimer]);
    }, []);

    const updateTimer = useCallback(
        (index: number, updatedProperties: Partial<TimerSequenceItem>) => {
            setSequence((prevSequence) =>
                prevSequence.map((timer, i) =>
                    i === index ? { ...timer, ...updatedProperties } : timer
                )
            );
        },
        []
    );

    const deleteTimer = useCallback(
        (index: number) => {
            setSequence((prev) => prev.filter((_, i) => i !== index));
            if (index <= currentIndex && currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            }
        },
        [currentIndex]
    );

    const nextTimer = useCallback(() => {
        if (currentIndex < sequence.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            reset();
        } else {
            setIsSequenceMode(false);
            pause();
        }
    }, [currentIndex, sequence.length, reset, pause]);

    // Handle stopwatch goal time
    useEffect(() => {
        const currentTimer = sequence[currentIndex];
        if (currentTimer?.type === 'stopwatch' && currentTimer.initialTime) {
            if (milliseconds >= currentTimer.initialTime) {
                pause();
                nextTimer();
            }
        }
    }, [milliseconds, sequence, currentIndex, pause, nextTimer]);

    const handleTimerCompletion = useCallback(() => {
        nextTimer();
    }, [nextTimer]);

    return {
        milliseconds,
        isRunning,
        start,
        pause,
        reset,
        setTimerSequence,
        updateTimer,
        addTimer,
        deleteTimer,
        nextTimer,
        isSequenceMode,
        currentIndex,
        sequence,
        handleTimerCompletion,
        setCurrentIndex,
    };
};

export default useTimer;
