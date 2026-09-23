import type { Credentials } from "../types/types";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function sendMessage(
    { idInstance, apiToken }: Credentials,
    chatId: string,
    message: string
): Promise<{ idMessage: string }> {
    const url = `${API_BASE}/waInstance${idInstance}/sendMessage/${apiToken}`;

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, message }),
    });

    if (!res.ok) throw new Error(`Send failed: ${res.status}`);
    return res.json();
}