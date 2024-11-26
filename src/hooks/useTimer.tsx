import { useState, useRef, useCallback  } from 'react';

export type TimerType = 'countdown' | 'tabata';

export type TimerSequenceItem = {
    type: TimerType;
    initialTime?: number;
    rounds?: number;
    workDuration?: number;
    breakDuration?: number;
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

    const setTimerSequence = useCallback((newSequence: TimerSequenceItem[]) => {
        setSequence(newSequence);
        setCurrentIndex(0);
        setIsSequenceMode(true);
        reset();
    }, [reset]);

    const addTimer = useCallback((newTimer: TimerSequenceItem) => {
        setSequence((prev) => [...prev, newTimer]);
    }, []);

    const deleteTimer = useCallback((index: number) => {
        setSequence((prev) => prev.filter((_, i) => i !== index));
        if (index <= currentIndex && currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    const nextTimer = useCallback(() => {
        if (currentIndex < sequence.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            reset();
        } else {
            setIsSequenceMode(false);
            pause();
        }
    }, [currentIndex, sequence.length, reset, pause]);

    // Handle completion of current timer
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
        addTimer,
        deleteTimer,
        nextTimer,
        isSequenceMode,
        currentIndex,
        sequence,
        handleTimerCompletion,
        setCurrentIndex
    };
};

export default useTimer;
