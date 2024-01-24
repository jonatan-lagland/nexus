'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import SummonerSpell from "../Icons/SummonerSpell";
import Rune from "../Icons/Rune";
import Link from "next/link";
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData } from "@utils/runeUtils";

const Player = ({ player }) => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;
    const styles = { width: '16', height: '16' };
    const playerNameTheme = win
        ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
        : (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300');
    //const router = useRouter()
    //const pageLink = `${router.query.Id}/profile/${player.riotIdGameName}-${player.riotIdTagline}`

    //const pathname = usePathname()

    const runeData = useContext(RuneDataContext);
    const { perks } = matchData;
    const keystoneId = perks.styles[0].selections[0].perk;
    const keystone = useRuneData(keystoneId, runeData);

    return (
        <div className='flex flex-row items-center text-start space-x-2'>
            <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
            {/*}
            <div className='lg:hidden flex flex-row space-x-1'>
                <div className='space-y-1'>
                    <SummonerSpell styles={styles} spell="SummonerFlash"></SummonerSpell>
                    <SummonerSpell styles={styles} spell="SummonerTeleport"></SummonerSpell>
                </div>
                <div className='space-y-1'>
                    <Rune styles={styles} rune={keystone}></Rune>
                    <Rune styles={styles} rune="SummonerTeleport"></Rune>
                </div>
            </div>
    {*/}
            <Link className={`${playerNameTheme} lg:w-[80px] truncate font-abel text-lg`} href={`${"pageLink"}`}>{player.riotIdGameName + ''}</Link>
        </div>
    );
};
export default Player;