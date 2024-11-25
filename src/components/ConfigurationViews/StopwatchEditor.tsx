import styles from "../timers/timer-common.module.scss";
import NumberStepper from "../generic/NumberStepper/NumberStepper.tsx";
import TButton from "../generic/Button/TButton.tsx";
import type React from "react";

interface StopwatchEditorProps {
    goalHours : number;
    setGoalHours : (hours : number) => void;
    goalMinutes : number;
    setGoalMinutes : (minutes : number) => void;
    goalSeconds: number;
    setGoalSeconds : (seconds : number) => void;
    applyGoalConfig : () => void;
    toggleModal : () => void;
}

const StopwatchEditor : React.FC <StopwatchEditorProps> = ({ applyGoalConfig, toggleModal, goalHours, setGoalHours, setGoalSeconds, goalSeconds, setGoalMinutes, goalMinutes}) => {
    return(
        <>
            <div className={styles.goalConfigInputs}>
                <div className={styles.steppersArea}>
                    <NumberStepper
                        label="Hours"
                        value={goalHours}
                        onChange={setGoalHours}
                        min={0}
                        max={100}
                        step={1}
                    />
                    <NumberStepper
                        label="Minutes"
                        value={goalMinutes}
                        onChange={setGoalMinutes}
                        min={0}
                        max={59}
                        step={1}
                    />
                    <NumberStepper
                        label="Seconds"
                        value={goalSeconds}
                        onChange={setGoalSeconds}
                        min={0}
                        max={59}
                        step={1}
                    />
                </div>
            </div>
            <div className={styles.modalBtns}>
                <TButton btnType="small-rect" actionFunc={applyGoalConfig} label="Apply"/>
                <TButton btnType="small-rect" actionFunc={toggleModal} label="Cancel"/>
            </div>
        </>
    )
}

export default StopwatchEditor;