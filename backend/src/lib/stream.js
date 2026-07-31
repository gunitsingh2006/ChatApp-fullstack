import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const secretKey = process.env.STREAM_API_SECRET;

if (!apiKey || !secretKey) {
    console.error("Stream API key or secret is missing. Check your .env file");
}

const streamClient = StreamChat.getInstance(apiKey, secretKey);

export async function upsertStreamUser(userData) {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        throw error;
    }
}

// TODO
export const generateStreamToken = (userId) => {

};