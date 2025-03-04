import React from 'react';

interface ResponsiveNavLinkProps {
    active?: boolean;
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const ResponsiveNavLink: React.FC<ResponsiveNavLinkProps> = ({
    active = false,
    href,
    children,
    className = '',
    onClick,
}) => {
    // Definir las clases base
    const baseClasses =
        'block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium focus:outline-none transition duration-150 ease-in-out';

    // Clases condicionales basadas en el estado `active`
    const activeClasses = active
        ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300';

    // Combinar las clases base, condicionales y las clases adicionales pasadas como prop
    const combinedClasses = `${baseClasses} ${activeClasses} ${className}`;

    return (
        <a
            href={href}
            className={combinedClasses}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

export default ResponsiveNavLink;