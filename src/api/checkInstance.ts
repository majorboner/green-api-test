export async function checkInstance(
    idInstance: string,
    apiToken: string
): Promise<string> {
    const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiToken}`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.stateInstance;
}