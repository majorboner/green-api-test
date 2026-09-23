export function parsePhone(input: string): { chatId: string; displayPhone: string; } | null {
    const digits = input.replace(/\D/g, '');

    if (digits.length === 11 && digits.startsWith('7')) {
        return {
            chatId: `${digits}@c.us`,
            displayPhone: `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`,
        };
    }

    if (digits.length === 12 && digits.startsWith('375')) {
        return {
            chatId: `${digits}@c.us`,
            displayPhone: `+375 ${digits.slice(3, 5)} ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10)}`,
        };
    }

    return null;
}
