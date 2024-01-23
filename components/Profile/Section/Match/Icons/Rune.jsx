'use client'
import Image from "next/image"

const Rune = ({ styles, rune }) => {
    return (
        <>
            <Image
                src={`/assets/images/${rune}.png`}
                alt={"Rune Icon"}
                width={styles.width}
                height={styles.height}
                className='rounded-sm border border-zinc-800 select-none'
            />
        </>
    )
}
export default Rune