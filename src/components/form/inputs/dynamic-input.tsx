interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void,
    isRequired: boolean
};

const dynamicInput = ({label, value, updateValue, isRequired}: InputProps) => {
    return (
        <>
            <div className="justify-between">
                <label className="text-2xl">{label}</label>
            </div>
            <input className="form-input" value={value} onChange={event => updateValue(event.target.value)} required={isRequired}/>
        </>
    )
};

export default dynamicInput;
