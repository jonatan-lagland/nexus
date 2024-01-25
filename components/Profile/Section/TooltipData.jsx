import React from 'react'
import Image from 'next/image';

export default function TooltipData({ data, dataType }) {
    switch (dataType) {
        case "item":
            return ItemStatsData()
        case "rune":
            return RuneData()
        case "runepath":
            return RunePathData()
        default:
            return BriefData()
    }

    function RuneData() {
        return (
            <div>
                <div className="mb-2">
                    <p className='font-bold text-base text-viola'>{data.name}</p>
                </div>
                <div className="text-crimson-grey text-sm">
                    <p>{data.shortDesc}</p>
                </div>
            </div>
        )
    }

    function RunePathData() {
        return (
            <div>
                <div className="flex flex-row justify-center mb-2">
                    <p className='font-bold text-base text-viola'>{data.name}</p>
                </div>
            </div>
        )
    }

    function BriefData() {
        return (
            <p className=' font-bold text-base text-amber-400 '>{data}</p>
        )
    }

    function ItemStatsData() {
        const formatLabelForFilename = (label) => {
            return label.replace(/\s/g, '');
        };

        const renderHorizontalBreak = () => {
            return <hr className="my-3 border-gray-600" />
        }

        const renderdataStat = (value, label) => {
            return value ? (
                <div className='w-full h-5 my-2 flex flex-row datas-center'>
                    <div className='me-3'>
                        <Image
                            src={`/assets/icons/stats/${formatLabelForFilename(label)}.png`}
                            alt={label}
                            width={15}
                            height={15}
                        />
                    </div>
                    <p className="text-cream mx-1">{value}</p>
                    <p className="text-dust"> {label}</p>
                </div>
            ) : null;
        };

        const renderdataDetails = (detail, data) => {
            if (detail === data.active && data.active) {
                return (
                    <>
                        <div className='mb-3'>
                            <p className="text-rose text-sm font-semibold mb-1">Active:</p>
                            <p className="text-crimson-grey text-sm ">{detail}</p>
                        </div>
                    </>
                );
            }
            if (detail === data.passive && data.passive) {
                return (
                    <>
                        <p className="text-rose text-sm font-semibold mb-1">Passive:</p>
                        <p className="text-crimson-grey text-sm"> {detail}</p>
                    </>
                );
            }
            if (detail === data.rules && data.rules) {
                return (
                    <>
                        {renderHorizontalBreak()}
                        <p className=" text-dark-dust italic"> {detail}</p>
                    </>
                );
            }
            return null;
        };

        return (
            <>
                <div className="flex tooltip-data-title mb-5 justify-between">
                    <p className='font-bold text-base text-vibrant-orange'>{data.name}</p>
                    <div className='flex flex-row'>
                        <Image
                            src={`/assets/icons/stats/Gold.png`}
                            alt={'Gold'}
                            width={20}
                            height={15}
                            style={{ width: 'auto', height: '15px' }}
                        />
                        <p className='text-sm ms-1'>{data.gold}</p>
                    </div>
                </div>
                <div className="text-sm">
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
                <div className='text-sm mt-5'>
                    {renderdataDetails(data.active, data)}
                    {renderdataDetails(data.passive, data)}
                    <p className='text-crimson-grey text-sm italic'>{data.notFound}</p>
                </div>
            </>
        )

    }
}