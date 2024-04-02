'use server'
import { RankEmblem } from '@components/ui/rankemblem';
import { ProfileAvatar } from '@components/ui/profileAvatar';
import RefreshButton from './refreshButton';
import LiveGameButton from './LiveGameButton';
import MenuButton from './MenuButton';
import { PlayerTier, PlayerRank, QueueDetail, UserInfo, UserDetail } from '@utils/types';

type HeaderProps = {
    rankedDetails?: QueueDetail[];
    user: UserInfo;
    server: string;
    region: string;
    userDetails?: UserDetail;
}

async function Header({ rankedDetails, user, region, server, userDetails }: HeaderProps) {
    const rankedSoloDetails: QueueDetail = rankedDetails && rankedDetails.find(detail => detail.queueType === "RANKED_SOLO_5x5");
    const wins: number = rankedSoloDetails ? rankedSoloDetails.wins : null;
    const losses: number = rankedSoloDetails ? rankedSoloDetails.losses : null;
    const winrate: number = (wins + losses === 0) ? null : (wins === 0 ? 0 : (losses === 0 ? 100 : Math.floor(wins / (wins + losses) * 100)));
    const totalGames: number = wins || losses ? wins + losses : null;
    const summonerId: string = userDetails && userDetails.id ? userDetails.id : null;

    return (
        <section className='flex flex-col px-9 gap-4'>
            <div className="flex flex-row text-start py-3">
                <div className="flex flex-row gap-3 items-center">
                    <div className='relative'>
                        <ProfileAvatar userDetails={userDetails} size={120}></ProfileAvatar>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className="flex flex-row flex-wrap gap-3 items-end">
                            <h1>
                                <span className="text-3xl lg:text-6xl font-bold font-oswald text-white">{user.gameName}</span>
                                <span className="text-lg lg:text-3xl font-bold font-oswald text-viola"> #{user.tagLine}</span>
                            </h1>
                            {
                                winrate &&
                                <RankEmblem tier={rankedSoloDetails.tier as PlayerTier} rank={rankedSoloDetails.rank as PlayerRank} type={"playerRank"}></RankEmblem>
                            }
                        </div>
                        {
                            rankedSoloDetails && totalGames &&
                            <div className='ps-1'>
                                <h2 className=' text-slate-300'>
                                    <span className='text-white font-bold'>{user.gameName} #{user.tagLine} </span>
                                    has an overall winrate of
                                    <span className=' text-orange-500 font-semibold'> {winrate}% </span>
                                    over {totalGames} games with the rank of
                                    <span className=' font-semibold'> {rankedSoloDetails.tier} {rankedSoloDetails.rank}. </span>
                                </h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div className="flex flex-row gap-2 justify-start">
                    <RefreshButton user={user} region={region} server={server} summonerId={summonerId}></RefreshButton>
                    <LiveGameButton server={server} region={region} summonerId={summonerId} gameName={user.gameName} tagLine={user.tagLine}></LiveGameButton>
                </div>
                <div className='block md:hidden'>
                    <MenuButton></MenuButton>
                </div>
            </div>
        </section >
    )
}

export default Header