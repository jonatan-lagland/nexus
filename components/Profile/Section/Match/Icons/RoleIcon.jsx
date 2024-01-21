'use client'
import Image from "next/image"

const RoleIcon = ({ role }) => {
    return (
        <>
            <Image
                src={`/assets/icons/roles/icon-position-banner-primary-${role}.png`}
                alt={"Role Icon"}
                width={36}
                height={36}
                className='object-contain'
            />
        </>
    )
}
export default RoleIcon