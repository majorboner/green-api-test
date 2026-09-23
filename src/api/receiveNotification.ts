import type { Credentials } from "../types/types";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function receiveNotification(
    { idInstance, apiToken }: Credentials
): Promise<{ receiptId: number; body: any } | null> {
    const url = `${API_BASE}/waInstance${idInstance}/receiveNotification/${apiToken}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Receive failed: ${res.status}`);

    const data = await res.json();

    if (!data || !data.body) return null;
    return data;
}
