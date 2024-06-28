import React, { useEffect, useState } from 'react';

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
    type?: string;
    isRequired: boolean;
}

const PriceInput: React.FC<InputProps> = ({ label, value, updateValue, type, isRequired }) => {
    const [formattedValue, setFormattedValue] = useState<string>("");

    useEffect(() => {
        if (typeof value === 'string') {
            setFormattedValue(value);
        } else if (typeof value === 'number') {
            setFormattedValue(value.toFixed(2)); // Formata para duas casas decimais
        }
    }, [value]);

    const applyCurrencyMask = (inputValue: string) => {
        const onlyDigits = inputValue
            .split("")
            .filter(s => /\d/.test(s))
            .join("")
            .padStart(3, "0");

        const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

        // Atualiza a versão formatada
        setFormattedValue(maskCurrency(Number(digitsFloat)));
        // Atualiza o valor não formatado
        updateValue(Number(digitsFloat));
    };

    const maskCurrency = (valor: number, locale: string = 'pt-BR', currency: string = 'BRL'): string => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = event.target;
        applyCurrencyMask(inputValue);
    };

    return (
        <>
            <div className="space-y-2">
                <div className="justify-between">
                    <label className="text-white-dark">{label}</label>
                </div>
                <input
                    type={type}
                    className="form-input"
                    value={formattedValue} // Mostra o valor formatado
                    onChange={handleChange}
                    required={isRequired}
                />
            </div>
        </>
    );
};

export default PriceInput;
