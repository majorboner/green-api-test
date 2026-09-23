import { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { checkInstance } from './api/checkInstance';
import { NewChatForm } from './components/NewChatForm';
import { Chat } from './components/Chat';
import { useNotifications } from './hooks/useNotifications';
import { sendMessage } from './api/sendMessage';
import type { Message } from './types/types';

function App() {
  const [credentials, setCredentials] = useState<{
    idInstance: string;
    apiToken: string;
  } | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [displayPhone, setDisplayPhone] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useNotifications({
    credentials,
    enabled: !!credentials && !!chatId,
    onMessage: (msg) => {
      const incoming: Message = {
        id: msg.idMessage,
        text: msg.text,
        timestamp: Date.now(),
        isOutgoing: false,
      };
      setMessages((prev) => [...prev, incoming]);
    },
  });

  const handleLogin = async (creds: { idInstance: string; apiToken: string }) => {
    setIsChecking(true);
    setAuthError(null);

    try {
      const state = await checkInstance(creds.idInstance, creds.apiToken);

      if (state !== 'authorized') {
        setAuthError(
          state === 'notAuthorized'
            ? 'Инстанс не авторизован.'
            : `Инстанс в состоянии "${state}". Попробуйте позже.`
        );
        return;
      }

      setCredentials(creds);
    } catch {
      setAuthError('Не удалось подключиться. Проверьте idInstance и токен.');
    } finally {
      setIsChecking(false);
    }
  };


  const handleSend = async (text: string) => {
    if (!chatId || !credentials) return;

    const tempId = `local-${Date.now()}`;
    const outgoing: Message = {
      id: tempId,
      text,
      timestamp: Date.now(),
      isOutgoing: true,
    };
    setMessages((prev) => [...prev, outgoing]);

    try {
      const res = await sendMessage(credentials, chatId, text);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, id: res.idMessage } : m))
      );
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  if (!credentials) {
    return <AuthForm error={authError} isLoading={isChecking} onSubmit={handleLogin} />
  }

  if (!chatId) {
    return <NewChatForm onSubmit={(id, display) => {
      setChatId(id);
      setDisplayPhone(display);
    }} />
  }

  return (
    <Chat recipientPhone={displayPhone!}
      messages={messages}
      onSend={handleSend} />
  )
}

export default App
