import styles from "../timers/timer-common.module.scss";
import NumberStepper from "../generic/NumberStepper/NumberStepper.tsx";
import type React from "react";
import ConfirmationMenu from "../menus/ConfirmationMenu/ModalConfirmation.tsx";

interface StopwatchEditorProps {
    goalHours : number;
    setGoalHours : (hours : number) => void;
    goalMinutes : number;
    setGoalMinutes : (minutes : number) => void;
    goalSeconds: number;
    setGoalSeconds : (seconds : number) => void;
    applyCustomConfig : () => void;
    toggleModal : () => void;
    showMenu : boolean;
}

const StopwatchEditor : React.FC <StopwatchEditorProps> = ({ showMenu, applyCustomConfig, toggleModal, goalHours, setGoalHours, setGoalSeconds, goalSeconds, setGoalMinutes, goalMinutes}) => {
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
            {
                showMenu &&
                <ConfirmationMenu cancelLabel="Cancel" applyLabel="Apply" apply={applyCustomConfig} cancel={toggleModal} />
            }
        </>
    )
}

export default StopwatchEditor;