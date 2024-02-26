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
                    <Image
                        src={`/assets/icons/stats/${formatLabelForFilename(label)}.png`}
                        alt={label}
                        width={15}
                        height={15}
                        className="object-scale-down"
                        style={{ width: 'auto' }}
                    />
                </div>
                <p className="text-cream mx-1">{value}</p>
                <p className="text-dust"> {label}</p>
            </div>
        ) : null;
    };

    const renderdataDetails = (detail, dataType) => {
        if (detail) {
            return (
                <div>
                    <p className="text-rose text-sm font-semibold">{detail === dataType.active ? 'Active' : 'Passive'}</p>
                    <p className="text-dark-dust italic ">{detail}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='flex flex-col gap-2 max-w-[250px]'>
            <div className="flex tooltip-data-title gap-2 justify-between">
                <p className='font-bold text-sm text-orange-400'>{data.name}</p>
                <div className='flex flex-row items-center '>
                    <Image
                        src={`/assets/icons/stats/Gold.png`}
                        alt={'Gold'}
                        width={20}
                        height={15}
                        className="object-scale-down"
                        style={{ width: 'auto' }}
                    />
                    <p className='text-sm ms-1'>{data.gold}</p>
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
                <p className='text-crimson-grey text-sm italic'>{data.notFound}</p>
            </div>
        </div>
    )
}