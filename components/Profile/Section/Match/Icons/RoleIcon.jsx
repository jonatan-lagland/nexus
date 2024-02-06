'use client'
import Image from "next/image"

const RoleIcon = ({ role }) => {

    return (
        <>
            <Image
                src={`/assets/icons/roles/icon-position-banner-primary-${role}.png`}
                alt={"Role Icon"}
                width={24}
                height={24}
                className='object-contain select-none'
                style={{ filter: 'brightness(1.3)' }}
            />
        </>
    )
}
export default RoleIcon