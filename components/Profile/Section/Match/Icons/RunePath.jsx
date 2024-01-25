'use client'
import Image from "next/image"
import { useImagePathRune } from "@utils/pathUtils"
import { useItemHover } from "@utils/tooltipUtils"
import Tooltip from "../../Tooltip"

const RunePath = ({ styles, rune }) => {
    const path = useImagePathRune(rune.icon)
    const { handleMouseHover, tooltipItemId, event } = useItemHover();

    return (
        <div
            className="relative"
            key={rune}
            style={{ width: styles.width, height: styles.height }}>
            <Image
                onMouseOver={handleMouseHover(rune.id)}
                onMouseLeave={handleMouseHover(rune.id)}
                src={path}
                alt={rune.name || 'Keystone'}
                width={styles.width}
                height={styles.height}
                className='rounded-sm'
            />
            <Tooltip
                data={rune}
                event={event}
                itemId={tooltipItemId}
                dataType={"runepath"} />
        </div>
    )
}
export default RunePath