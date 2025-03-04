import React from 'react';

interface ValidationErrorsProps {
    errors: string[];
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
    if (errors.length === 0) return null;

    return (
        <div className="mt-3">
            <div className="font-medium text-red-600">Whoops! Something went wrong.</div>
            <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ValidationErrors;
