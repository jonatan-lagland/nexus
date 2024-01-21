'use client'
import Image from "next/image"

const Rune = ({ styles, rune }) => {
    if (styles) {
        return (
            <>
                <Image
                    src={`/assets/images/${rune}.png`}
                    alt={"Champion Icon"}
                    width={16}
                    height={16}
                    className='rounded-sm'
                />
            </>
        )
    }
    return (
        <>
            <Image
                src={`/assets/images/${rune}.png`}
                alt={"Champion Icon"}
                width={32}
                height={32}
                className='rounded-sm'
                style={{ minWidth: '32px', minWidth: '32px' }}
            />
        </>
    )
}
export default Rune