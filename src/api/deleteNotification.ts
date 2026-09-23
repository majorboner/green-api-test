import type { Credentials } from "../types/types";

const API_BASE = import.meta.env.VITE_API_BASE;

export async function deleteNotification(
    { idInstance, apiToken }: Credentials,
    receiptId: number
): Promise<boolean> {
    const url = `${API_BASE}/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`;

    const res = await fetch(url, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

    const data = await res.json();
    return data.result;
}