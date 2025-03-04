import React, { useState } from 'react';
import Button from '../components/button'; // Importa el componente Button
import Label from '../components/label'; // Importa el componente Label
import ValidationErrors from '../components/validation-errors'; // Importa el componente ValidationErrors
import AuthenticationCard from '../components/authentication-card'; // Importa el componente AuthenticationCard
import AuthenticationCardLogo from '../components/authentication-card-logo'; // Importa el logo
import Input from '../components/input'; // Importa el componente Input

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ email?: string[] }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors and status
        setErrors({});
        setStatus(null);

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus(data.status || 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ email: ['Hubo un error al procesar la solicitud.'] });
        }
    };

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo />}>
            <ValidationErrors errors={errors.email ? errors.email : []} />

            {status && (
                <div className="mb-4 text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                        className="mt-1 block w-full"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>
                    )}
                </div>

                <div className="flex items-center justify-end">
                    <Button type="submit" className="ms-4">
                        Enviar Enlace de Restablecimiento
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default ForgotPassword;