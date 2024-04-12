export type Region = "americas | asia | europe"
export type Server = "BR1 | EUN1 | EUW1 | JP1 | KR | LA1 | LA2 | NA1 | OC1 | PH2 | RU | SG2 | TH2 | TR1 | TW2 | VN2"
export type PlayerTier = "UNRANKED" | "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
export type PlayerRank = "I" | "II" | "III" | "IV" | "";
export type QueueDetail = {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}
export type User = {
    puuid: string;
    gameName: string;
    tagLine: string;
}
export type UserDetail = {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}