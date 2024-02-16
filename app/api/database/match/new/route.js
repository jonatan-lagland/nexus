import { connectToDB } from "@utils/database/database"
import MatchHistory from "@models/matchHistory"

export async function POST(request) {
    try {
        const { matchId, players, averageTier } = await request.json();
        await connectToDB()

        const match = new MatchHistory({
            matchId: matchId,
            players: players,
            averageTier: averageTier
        })

        await match.save();
        return Response.json(JSON.stringify(match), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new match", { status: 500 })
    }
}