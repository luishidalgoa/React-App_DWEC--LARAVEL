import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Label from '../components/label';
import ValidationErrors from '../components/validation-errors';
import AuthenticationCard from '../components/authentication-card';
import AuthenticationCardLogo from '../components/authentication-card-logo';
import Input from '../components/input';
import Checkbox from '../components/checkbox';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!name || !email || !age || !gender || !address || !telephone || !password || !passwordConfirmation || !terms) {
            setError('Por favor complete todos los campos.');
            return;
        } 
        
        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    age,
                    gender,
                    address,
                    telephone,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(data.message || 'Hubo un problema con el registro.');
            }
        } catch (err) {
            setError('Ocurrió un error al registrar al usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticationCard logo={<AuthenticationCardLogo />}>
            <ValidationErrors errors={error ? [error] : []} />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="18"
                        max="100"
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="gender">Género</Label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="block mt-1 w-full"
                    >
                        <option value="" disabled>Seleccione género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                <div className="mb-3">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        maxLength={150}
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="telephone">Teléfono</Label>
                    <Input
                        type="tel"
                        id="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        pattern="[0-9]{9}"
                        title="9 dígitos numéricos"
                        placeholder="Ej. 612345678"
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="mb-3">
                    <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                    <Input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className="block mt-1 w-full"
                    />
                </div>

                <div className="block mt-4">
                    <Label htmlFor="terms" className="flex items-center">
                        <Checkbox
                            id="terms"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            required
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Acepto los <Link to="/terms" className="text-decoration-none">Términos de Servicio</Link> y la <Link to="/privacy-policy" className="text-decoration-none">Política de Privacidad</Link>
                        </span>
                    </Label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        to="/login"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ¿Ya estás registrado?
                    </Link>
                    <Button type="submit" className="ms-4" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default RegisterPage;