export interface Credentials {
    idInstance: string;
    apiToken: string;
}
export interface IncomingMessage {
    chatId: string;
    text: string;
    idMessage: string;
}export interface Message {
    id: string;
    text: string;
    timestamp: number;
    isOutgoing: boolean;
}

