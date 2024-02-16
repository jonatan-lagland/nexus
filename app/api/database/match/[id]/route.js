import { connectToDB } from "@utils/database/database"
import MatchHistory from "@models/matchHistory"

export async function POST(request, { params }) {
    await connectToDB()

    try {
        const match = await MatchHistory.findOne({ matchId: params.matchId })

        if (match) {
            return Response.json({ matchHistory: match }, { status: 200 })

        } else {
            return Response.json({ message: "No match was found with given matchId" }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: `${error}` }, { status: 500 })
    }
}