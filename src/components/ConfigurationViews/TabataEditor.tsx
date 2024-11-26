import type React from "react";
import commonTimerStyles from "../timers/timer-common.module.scss";
import NumberStepper from "../generic/NumberStepper/NumberStepper.tsx";
import ConfirmationMenu from "../menus/ConfirmationMenu/ModalConfirmation.tsx";

interface TabataEditorProps{
    totalRounds : number;
    setTotalRounds : (totalRounds : number) => void;
    workMinutes : number;
    setWorkMinutes : (workMinutes : number) => void;
    workSeconds : number;
    setWorkSeconds : (workSeconds : number) => void;
    breakMinutes : number;
    setBreakMinutes : (breakMinutes : number) => void;
    breakSeconds : number;
    setBreakSeconds : (breakSeconds : number) => void;
    applyCustomConfig : () => void;
    toggleModal : () => void;
    showMenu : boolean;
}

const TabataEditor: React.FC<TabataEditorProps> = ({showMenu, totalRounds, setTotalRounds, setWorkMinutes, workMinutes, setWorkSeconds, workSeconds, setBreakMinutes, breakMinutes, setBreakSeconds, breakSeconds, applyCustomConfig, toggleModal}) => {
    return(
        <>
            <div className={`${commonTimerStyles.inputsArea}`}>
                <div className={`${commonTimerStyles.steppersArea} ${commonTimerStyles.noGap}`}>
                    <section className={commonTimerStyles.nonTimeInputArea}>
                        <NumberStepper
                            label="Rounds"
                            value={totalRounds}
                            onChange={(newValue: number) => setTotalRounds(newValue)}
                            min={1}
                            max={100}
                            step={1}
                        />
                    </section>
                    <section className={commonTimerStyles.timeInputArea}>
                        <h3>
                            Work Periods
                        </h3>
                        <div className={commonTimerStyles.groupedInputs}>
                            <NumberStepper
                                label="Minutes"
                                value={workMinutes}
                                onChange={(newValue: number) => setWorkMinutes(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                            <NumberStepper
                                label="Seconds"
                                value={workSeconds}
                                onChange={(newValue: number) => setWorkSeconds(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                        </div>
                    </section>
                    <section className={`${commonTimerStyles.timeInputArea}`}>
                        <h3>
                            Break Periods
                        </h3>
                        <div className={commonTimerStyles.groupedInputs}>
                            <NumberStepper
                                label="Minutes"
                                value={breakMinutes}
                                onChange={(newValue: number) => setBreakMinutes(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                            <NumberStepper
                                label="Break Seconds"
                                value={breakSeconds}
                                onChange={(newValue: number) => setBreakSeconds(newValue)}
                                min={0}
                                max={59}
                                step={1}
                            />
                        </div>
                    </section>
                </div>
            </div>
            {
                showMenu && <ConfirmationMenu cancelLabel="Cancel" applyLabel="Apply" apply={applyCustomConfig} cancel={toggleModal} />
            }
        </>
    )
}

export default TabataEditor;