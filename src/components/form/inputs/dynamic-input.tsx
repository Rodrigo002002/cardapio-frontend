import React from 'react';

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void,
    isRequired: boolean
};

const dynamicInput = ({label, value, updateValue, isRequired}: InputProps) => {
    return (
        <>
            <div className="space-y-2">
                <div className="justify-between">
                    <label className="text-white-dark">{label}</label>
                </div>
                <input
                    className="form-input"
                    value={value}
                    onChange={
                        event => updateValue(event.target.value)
                    }
                    required={isRequired}
                />
            </div>
        </>
    )
};

export default dynamicInput;
