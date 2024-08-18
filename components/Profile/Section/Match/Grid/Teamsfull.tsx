'use client'

import { Player, PlayerScores } from "@utils/types";
import Playerfull from "./Playerfull";

export type FullTeamsProps = {
    participants: Player[]
    gameMode: string
    playerScores: PlayerScores[]
    isRemake: boolean
}

const TeamTableStandard = ({ team, teamResult, teamResultBg, teamResultTitleColor, highestDamageDealtTeam, playerScores }) => {
    return (
        <table className={`${teamResultBg} ${teamResultTitleColor} py-3`}>
            <thead className="hidden lg:block">
                <tr className="detailed-match items-center text-xs">
                    <th></th>
                    <th>{teamResult}</th>
                    <th>Kill Participation</th>
                    <th>KDA</th>
                    <th>Damage Dealt</th>
                    <th>Items</th>
                </tr>
            </thead>
            <tbody>
                {team.map((player: Player, i: number) => (
                    <Playerfull
                        highestDamageDealtTeam={highestDamageDealtTeam}
                        key={player.puuid + i}
                        player={player}
                        playerScores={playerScores}
                    />
                ))}
            </tbody>
        </table>
    );
};


function FullTeams({ participants, gameMode, playerScores, isRemake }: FullTeamsProps) {
    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        const blueTeam = participants.slice(0, 5);
        const redTeam = participants.slice(5);

        const blueTeamResult = isRemake ? '' : blueTeam[0].win ? 'Victory (Blue Team)' : 'Defeat (Blue Team)'
        const blueTeamResultBg = isRemake ? 'container-remake-colorblind' : blueTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const blueTeamResultTitleColor = isRemake ? 'text-white' : blueTeam[0].win ? 'text-blue-300/80' : 'text-red-300/80'

        const redTeamResult = isRemake ? '' : redTeam[0].win ? 'Victory (Red Team)' : 'Defeat (Red Team)'
        const redTeamResultBg = isRemake ? 'container-remake-colorblind' : redTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const redTeamResultTitleColor = isRemake ? 'text-white' : redTeam[0].win ? 'text-blue-300/80' : 'text-red-300/80'

        const highestDamageDealtBlueTeam = Math.max(...blueTeam.map(player => player.totalDamageDealtToChampions));
        const highestDamageDealtRedTeam = Math.max(...redTeam.map(player => player.totalDamageDealtToChampions));

        return (
            <div className="flex flex-col bg-dark-grey-secondary border-[#2C2F42] border rounded-md">
                <TeamTableStandard
                    team={blueTeam}
                    teamResult={blueTeamResult}
                    teamResultBg={blueTeamResultBg}
                    teamResultTitleColor={blueTeamResultTitleColor}
                    highestDamageDealtTeam={highestDamageDealtBlueTeam}
                    playerScores={playerScores}
                />
                <TeamTableStandard
                    team={redTeam}
                    teamResult={redTeamResult}
                    teamResultBg={redTeamResultBg}
                    teamResultTitleColor={redTeamResultTitleColor}
                    highestDamageDealtTeam={highestDamageDealtRedTeam}
                    playerScores={playerScores}
                />
            </div>
        );
    }

    if (gameMode === "CHERRY") { // arena

        const teamsMap = {};

        // Group participants by subteamPlacement
        participants.forEach((player) => {
            if (!teamsMap[player.subteamPlacement]) {
                teamsMap[player.subteamPlacement] = [];
            }
            teamsMap[player.subteamPlacement].push(player);
        });

        // Convert the teamsMap to an array and sort by subteamPlacement
        const sortedTeams = Object.entries(teamsMap)
            .sort(([placementA], [placementB]) => Number(placementA) - Number(placementB))
            .map(([placement, team]) => team);


        const getBgClass = (placement) => {
            switch (placement) {
                case 1:
                    return 'badge-gold';
                case 2:
                    return 'badge-silver';
                case 3:
                    return 'badge-bronze';
                default:
                    return 'bg-slate-900 text-zinc-400 ';
            }
        };

        const mainPlayer = playerScores.find(playerScore => playerScore.mainPlayer === true);
        return (
            <div className="container-victory-colorblind p-1 rounded-lg border border-[#2C2F42]">
                {sortedTeams.map((team: any, index) => {
                    // Check if any player's puuid in the team matches the mainPlayer's puuid
                    const isMainPlayerInTeam = team.some(player => player.puuid === mainPlayer.puuid);
                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-between border border-[#494d6b] p-1 ${isMainPlayerInTeam ? 'backdrop-brightness-150' : ''}`}
                        >
                            <div className={`font-abel ${getBgClass(team[0].subteamPlacement)} shadow rounded-sm text-white font-medium px-2 text-xs flex items-center justify-center`}>
                                {team[0].subteamPlacement}
                            </div>
                            {team.map((player) => (
                                <Playerfull key={player.puuid} containerStyle='arena-match' player={player} playerScores={playerScores} />
                            ))}
                        </div>
                    );
                })}
            </div>
        );

    }
    return null;
}

export default FullTeams;

