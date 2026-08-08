import { generateStreamToken } from "../lib/stream.js"

export async function getStreamToken(req,res) {
    try {
        const token = generateStreamToken(req.user.id)

        res.status(200).json({ message: "Stream token generated successfully", token })
    } catch (error) {
        console.log("Error in the getStreamToken Controller", error.message)
        res.status(500).json({ message: "Error in getting stream token"})
    }
}