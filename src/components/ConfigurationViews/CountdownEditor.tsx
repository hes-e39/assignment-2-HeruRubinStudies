import commonTimerStyles from '../timers/timer-common.module.scss';
import NumberStepper from '../generic/NumberStepper/NumberStepper.tsx';
import TButton from '../generic/Button/TButton.tsx';
import type React from 'react';

interface CountDownEditorProps {
    goalHours: number;
    setGoalHours: (newValue: number) => void;
    goalMinutes: number;
    setGoalMinutes: (newValue: number) => void;
    goalSeconds: number;
    setGoalSeconds: (newValue: number) => void;
    applyCustomTime: () => void;
    toggleModal: () => void;
}

const CountdownEditor: React.FC<CountDownEditorProps> = ({ goalHours, setGoalHours, setGoalMinutes, goalMinutes, setGoalSeconds, goalSeconds, toggleModal, applyCustomTime }) => {
    return (
        <>
            <div className={commonTimerStyles.inputsArea}>
                <div className={commonTimerStyles.steppersArea}>
                    <NumberStepper label="Hours" value={goalHours} onChange={(newValue: number) => setGoalHours(newValue)} min={0} max={100} step={1} />
                    <NumberStepper label="Minutes" value={goalMinutes} onChange={(newValue: number) => setGoalMinutes(newValue)} min={0} max={59} step={1} />
                    <NumberStepper label="Seconds" value={goalSeconds} onChange={(newValue: number) => setGoalSeconds(newValue)} min={0} max={59} step={1} />
                </div>
            </div>
            <div className={commonTimerStyles.modalBtns}>
                <TButton btnType="small-rect" label="Apply" actionFunc={applyCustomTime} />
                <TButton btnType="small-rect" label="Cancel" actionFunc={toggleModal} />
            </div>
        </>
    );
};

export default CountdownEditor;
