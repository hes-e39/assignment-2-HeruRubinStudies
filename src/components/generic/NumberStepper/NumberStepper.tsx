import type React from "react";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./NumberStepper.module.scss";
import { formatTimerNumber } from "../../../utils/helpers.tsx";

interface NumberStepperProps {
    label?: string | ReactNode;
    value: number; // Current value of the stepper
    onChange: (newValue: number) => void; // Function to update the value
    min?: number; // Minimum value
    max?: number; // Maximum value
    step?: number; // Increment/decrement step
}

const NumberStepper: React.FC<NumberStepperProps> = ({
                                                         value,
                                                         onChange,
                                                         min = Number.NEGATIVE_INFINITY,
                                                         max = Number.POSITIVE_INFINITY,
                                                         step = 1,
                                                         label,
                                                     }) => {
    const [isEditing, setIsEditing] = useState(false); // State to toggle between input and display mode
    const [localValue, setLocalValue] = useState(value); // Local state for handling the current value
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input field

    useEffect(() => {
        setLocalValue(value); // Keep local state in sync with the external value
    }, [value]);

    // Handle increment
    const increment = () => {
        const newValue = Math.min(localValue + step, max);
        setLocalValue(newValue);
        onChange(newValue);
    };

    // Handle decrement
    const decrement = () => {
        const newValue = Math.max(localValue - step, min);
        setLocalValue(newValue);
        onChange(newValue);
    };

    // Handle switching to input mode
    const enterEditMode = () => {
        setIsEditing(true);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = localValue ?? 0;
        if (/^\d*$/.test(e.target.value)) {
            // Allow only digits
            newValue = Math.min(Math.max(Number(e.target.value), min), max);
        }
        setLocalValue(newValue);
    };

    // Handle input blur (exit edit mode and save value)
    const handleInputBlur = () => {
        setIsEditing(false);
        onChange(localValue); // Commit the updated value
    };

    // Handle input key press (e.g., Enter to save)
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            onChange(localValue);
        }
    };

    // Focus and select all text in input when entering edit mode
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select(); // Select all text
        }
    }, [isEditing]);

    return (
        <div className={styles.numberStepperContainer}>
            {label && <div className={styles.label}>{label}</div>}
            <div className={styles.interactionArea}>
                <button
                    className={styles.stepperButton}
                    onClick={increment}
                    aria-label="Increment"
                >
                    ▲
                </button>
                {!isEditing ? (
                    <div
                        className={styles.clickableDisplay}
                        onClick={enterEditMode}
                        aria-label="Click to edit value"
                    >
                        <h2 className={styles.valueDisplay}>
                            {formatTimerNumber(localValue)}
                        </h2>
                    </div>
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={localValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        className={styles.numberInput}
                    />
                )}
                <button
                    className={styles.stepperButton}
                    onClick={decrement}
                    aria-label="Decrement"
                >
                    ▼
                </button>
            </div>
        </div>
    );
};

export default NumberStepper;
