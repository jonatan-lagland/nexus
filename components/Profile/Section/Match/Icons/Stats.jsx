'use client'
const Stats = ({ kills, deaths, assists }) => {
    return (
        <p className='font-oswald space-x-1 text-2xl'>
            <span className='text-white'>{kills}</span>
            <span className='text-zinc-400'> / </span>
            <span className='text-white'>{deaths}</span>
            <span className='text-zinc-400'> / </span>
            <span className=' text-white'>{assists}</span>
        </p>
    );
}

export default Stats