import React from 'react'

interface RadioInputProps {
    value: string;
    id: string;
    label: string;
    error?: string; // Added error prop for displaying validation messages
}

export const RadioInput: React.FC<RadioInputProps> = ({ value, id, label }) => {
    return (
        <div>
            <input type="radio" name={"radio"} id={id} value={value} className="accent-main" />
            <label htmlFor={id} className="text-lg text-mindfulBlack ml-2">{label}</label>
        </div>
    )
}
