import { Schema, model, models } from "mongoose";

const playerSchema = new Schema({
    puuid: { type: String, required: true },
    tier: { type: String, required: true },
    rank: { type: String, required: true }
});

const matchHistorySchema = new Schema({
    matchId: { type: String, required: true, unique: true },
    players: [playerSchema],
    averageTier: { type: String, required: true }
});

const MatchHistory = models.MatchHistory || model('MatchHistory', matchHistorySchema)

export default MatchHistory;