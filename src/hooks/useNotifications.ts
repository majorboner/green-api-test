import { useEffect, useRef } from 'react';
import type { Credentials, IncomingMessage } from '../types/types';
import { receiveNotification } from '../api/receiveNotification';
import { deleteNotification } from '../api/deleteNotification';

interface UseNotificationsProps {
    credentials: Credentials | null;
    enabled: boolean;
    onMessage: (msg: IncomingMessage) => void;
}

export function useNotifications({ credentials, enabled, onMessage }: UseNotificationsProps) {
    const onMessageRef = useRef(onMessage);

    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(() => {
        if (!credentials || !enabled) return;

        let isMounted = true;

        const poll = async () => {
            while (isMounted) {
                try {
                    const notification = await receiveNotification(credentials);

                    if (!notification) continue;

                    const { receiptId, body } = notification;

                    if (body?.typeWebhook === 'incomingMessageReceived') {
                        const messageData = body.messageData;
                        const senderData = body.senderData;

                        if (messageData?.typeMessage === 'textMessage') {
                            onMessageRef.current({
                                chatId: senderData.chatId,
                                text: messageData.textMessageData.textMessage,
                                idMessage: body.idMessage,
                            });
                        }
                    }

                    await deleteNotification(credentials, receiptId);
                } catch (err) {
                    console.error('Polling error:', err);
                    await new Promise((r) => setTimeout(r, 3000));
                }
            }
        };

        poll();

        return () => {
            isMounted = false;
        };
    }, [credentials, enabled]);
}