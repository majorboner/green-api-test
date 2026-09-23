import { useState } from "react";
import { parsePhone } from "../helpers/parsePhone";

interface NewChatFormProps {
    onSubmit: (chatId: string, displayPhone: string) => void;
}

export const NewChatForm = (props: NewChatFormProps) => {
    const { onSubmit } = props;

    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const parsed = parsePhone(phone);
        if (!parsed) {
            setError('Введите номер РФ (+7XXXXXXXXXX) или РБ (+375XXXXXXXXX)');
            return;
        }

        onSubmit(parsed.chatId, parsed.displayPhone);
    };

    return (<form className="phone-form" onSubmit={handleSubmit}>
        <h2>Новый чат</h2>
        <p>Введите номер телефона получателя</p>
        <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+79991234567"
            autoFocus
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">Создать чат</button>
    </form>)
}