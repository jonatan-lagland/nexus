'use client'
import Image from "next/image"
import { useImagePathRune } from "@utils/pathUtils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const Rune = ({ rune, size, padding }) => {
    const path = useImagePathRune(rune)
    // Note: In some cases runes aren't used, e.g. QuickPlay or Arena.
    // In such scenarios, skip rendering altogether
    if (!rune) {
        return null;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="hover:cursor-pointer">
                    <Image
                        src={path}
                        alt={rune.name || 'Keystone'}
                        width={size}
                        height={size}
                        className={`bg-inherit backdrop-brightness-[0.4] border border-stone-950 p-[${padding}px] rounded-full select-none`}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className=" bg-black whitespace-break-spaces">
                <div>
                    <p className='font-bold text-base text-crimson-grey mb-2'>{rune.name}</p>
                    <p className="text-dark-dust italic text-sm">{rune.shortDesc}</p>
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default Rune