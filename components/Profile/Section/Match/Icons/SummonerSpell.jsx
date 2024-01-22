'use client'
import Image from "next/image"

const SummonerSpell = ({ styles, spell }) => {
    return (
        <>
            <Image
                src={`/assets/images/${spell}.png`}
                alt={"Summoner Spell Icon"}
                width={styles.width}
                height={styles.height}
                className='rounded-sm select-none'
            //style={{ minWidth: '32px', minHeight: '32px' }}
            />
        </>
    )
}
export default SummonerSpell