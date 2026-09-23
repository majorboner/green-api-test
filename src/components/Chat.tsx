import { useState } from "react";
import './Chat.css';

interface Message {
    id: string;
    text: string;
    timestamp: number;
    isOutgoing: boolean;
}

interface ChatProps {
    recipientPhone: string;
    messages: Message[];
    onSend: (text: string) => void;
}

export const Chat = (props: ChatProps) => {
    const { recipientPhone, messages, onSend } = props;
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    return (<div className="chat-container">
        <div className="chat-header">{recipientPhone}</div>

        <div className="chat-messages">
            {messages.length === 0 && (
                <div className="chat-empty">Напишите первое сообщение</div>
            )}
            {messages.map((m) => (
                <div
                    key={m.id}
                    className={`message ${m.isOutgoing ? 'message-outgoing' : 'message-incoming'}`}
                >
                    <div className="message-text">{m.text}</div>
                    <div className="message-time">
                        {new Date(m.timestamp).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            ))}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
            <textarea
                className="chat-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                rows={1}
            />
            <button className="chat-send-button" type="submit" disabled={!text.trim()}>
                Отправить
            </button>
        </form>
    </div>)
}