import React from 'react'
import Image from 'next/image';

export default function ItemData({ data }) {
    const formatLabelForFilename = (label) => {
        return label.replace(/\s/g, '');
    };

    const renderdataStat = (value, label) => {
        return value ? (
            <div className='flex flex-row items-center'>
                <div className='me-3'>
                    <div className='relative h-[15px] w-[15px]'>
                        <Image
                            src={`/assets/icons/stats/${formatLabelForFilename(label)}.png`}
                            alt={label}
                            fill={true}
                            quality={50}
                            sizes="(max-width: 768px) 15px"
                            className="object-contain select-none"
                        />
                    </div>
                </div>
                <span className="text-cream mx-1">{value} <span className="text-dust"> {label}</span></span>
            </div>
        ) : null;
    };

    const renderdataDetails = (detail, dataType) => {
        if (detail) {
            return (
                <div>
                    <span className="text-rose text-sm font-semibold">{detail === dataType.active ? 'Active:' : 'Passive: '}</span>
                    <span className="text-dark-dust italic ">{detail}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex tooltip-data-title gap-2 justify-between">
                <span className='font-bold text-sm text-orange-400'>{data.name}</span>
                <div className='flex flex-row items-center '>
                    <Image
                        src={`/assets/icons/stats/Gold.png`}
                        alt={'Gold'}
                        width={20}
                        height={15}
                        className="object-scale-down"
                        style={{ width: 'auto' }}
                    />
                    <span className='text-sm text-white ms-1'>{data.gold}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
                {renderdataStat(data.ad, 'Attack Damage')}
                {renderdataStat(data.ap, 'Ability Power')}
                {renderdataStat(data.mpen, 'Magic Penetration')}
                {renderdataStat(data.as, 'Attack Speed')}
                {renderdataStat(data.critChance, 'Critical Strike Chance')}
                {renderdataStat(data.critDmg, 'Critical Strike Damage')}
                {renderdataStat(data.health, 'Health')}
                {renderdataStat(data.armor, 'Armor')}
                {renderdataStat(data.mr, 'Magic Resistance')}
                {renderdataStat(data.mana, 'Mana')}
                {renderdataStat(data.hpregen, 'Base Health Regen')}
                {renderdataStat(data.haste, 'Ability Haste')}
                {renderdataStat(data.manaregen, 'Base Mana Regen')}
                {renderdataStat(data.hpShieldPower, 'Heal and Shield Power')}
                {renderdataStat(data.flatMs, 'Move Speed')}
                {renderdataStat(data.percentMs, 'Move Speed')}
                {renderdataStat(data.vamp, 'Omnivamp')}
                {renderdataStat(data.lethality, 'Lethality')}
                {renderdataStat(data.arPen, 'Armor Penetration')}
                {renderdataStat(data.tenacity, 'Tenacity')}
            </div>
            <div className='flex flex-col text-sm gap-2'>
                {renderdataDetails(data.passive, data)}
                {renderdataDetails(data.active, data)}
                <span className='text-crimson-grey text-sm italic'>{data.notFound}</span>
            </div>
        </div>
    )
}