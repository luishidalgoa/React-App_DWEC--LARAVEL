import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Button from "../components/button";
import Label from "../components/label"; // Importa el componente Label
import ValidationErrors from "../components/validation-errors"; // Importa el componente ValidationErrors
import AuthenticationCard from "../components/authentication-card"; // Importa el componente AuthenticationCard
import AuthenticationCardLogo from "../components/authentication-card-logo"; // Importa el logo
import Input from "../components/input"; // Importa el componente Input
import Checkbox from "../components/checkbox"; // Importa el componente Checkbox

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]); // Cambié error a errors para manejar múltiples errores
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    if (!email || !password) {
      setErrors(["Por favor ingresa tu correo y contraseña."]);
      return;
    }

    setErrors([]); // Limpiar errores previos
    setLoading(true);

    try {

      // Enviar la solicitud POST a la API de Laravel para iniciar sesión
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          remember,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);
        // Guardar el token en el almacenamiento local
        localStorage.setItem("access_token", data.access_token); // Asegúrate de que la API devuelva el token

        // Redirigir al usuario al dashboard
        navigate("/dashboard"); // Usa navigate para redirigir
      } else {
        setErrors([data.message || "Hubo un problema con el inicio de sesión."]);
      }
    } catch (err) {
      setErrors(["Ocurrió un error al intentar iniciar sesión."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <ValidationErrors errors={errors} />

      {status && <div className="status">{status}</div>}

      <form method="POST" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="block mt-1 w-full" // Añade clases para coincidir con el estilo de Blade
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block mt-1 w-full" // Añade clases para coincidir con el estilo de Blade
            autoComplete="current-password" // Añade autocompletado
          />
        </div>

        {/* Remember me */}
        <div className="block mt-4">
          <Label htmlFor="remember_me" className="flex items-center">
            <Checkbox
              id="remember_me"
              name="remember"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <span className="ms-2 text-sm text-gray-600">Recordarme</span>
          </Label>
        </div>

        {/* Forgot Password */}
        <div className="flex items-center justify-end mt-4">
          <a
            href="/forgot-password"
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ¿Olvidaste tu contraseña?
          </a>

          {/* Usa el componente Button aquí */}
          <Button type="submit" className="ms-4" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
};

export default LoginPage;