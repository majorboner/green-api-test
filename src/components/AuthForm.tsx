import { useState } from "react";
import './AuthForm.css';

interface AuthFormProps {
    onSubmit: (credentials: { idInstance: string; apiToken: string }) => void;
    isLoading: boolean;
    error: string | null;
}

export const AuthForm = (props: AuthFormProps) => {
    const { error, isLoading, onSubmit } = props;

    const [idInstance, setIdInstance] = useState('');
    const [apiToken, setApiToken] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!idInstance.trim() || !apiToken.trim()) return;

        onSubmit({ idInstance: idInstance.trim(), apiToken: apiToken.trim() });
    };

    return (
        <div className="AuthForm">

            <h1>Вход</h1>
            <p>Введите учётные данные из личного кабинета GREEN-API</p>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="idInstance">idInstance</label>
                    <input
                        id="idInstance"
                        type="text"
                        value={idInstance}
                        onChange={(e) => setIdInstance(e.target.value)}
                        placeholder="1123456789"
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="apiToken">apiTokenInstance</label>
                    <input
                        id="apiToken"
                        type="password"
                        value={apiToken}
                        onChange={(e) => setApiToken(e.target.value)}
                        placeholder="Введите токен"
                        required
                    />
                </div>

                {error && <div className="error">{error}</div>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Проверка...' : 'Войти'}
                </button>
            </form>
        </div>
    );
}