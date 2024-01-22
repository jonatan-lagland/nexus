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
                className='rounded-sm select-none'
            //style={{ minWidth: '32px', minHeight: '32px' }}
            />
        </>
    )
}
export default Rune