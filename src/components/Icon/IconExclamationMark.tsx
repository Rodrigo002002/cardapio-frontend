import React, { FC } from 'react';

interface ExclamationIconProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const ExclamationIcon: FC<ExclamationIconProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {!fill ? (
                <>
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
                    <path
                        opacity={duotone ? '0.5' : '1'}
                        d="M12 8V14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                </>
            ) : (
                <>
                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                    <path
                        d="M12 7.5V10.5"
                        stroke={!duotone ? 'white' : 'currentColor'}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <circle cx="12" cy="16" r="1" fill={!duotone ? 'white' : 'currentColor'} />
                </>
            )}
        </svg>
    );
};

export default ExclamationIcon;
