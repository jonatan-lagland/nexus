import { useState, useEffect } from 'react';
import Image from 'next/image';

function Tooltip({ item, style }) {
    if (!item) return null;

    const formatLabelForFilename = (label) => {
        return label.replace(/\s/g, '');
    };

    const renderHorizontalBreak = () => {
        return <hr className="my-3 border-gray-600" />
    }

    const renderItemStat = (value, label) => {
        return value ? (
            <div className='w-full h-5 my-2 flex flex-row items-center'>
                <div className='w-5 me-3'>
                    <div style={{ width: 'max-content', height: 'max-content' }}>
                        <Image
                            src={`/assets/icons/stats/${formatLabelForFilename(label)}.png`}
                            alt={label}
                            width={20}
                            height={20}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </div>
                </div>
                <p className="text-cream mx-1">{value}</p>
                <p className="text-dust"> {label}</p>
            </div>
        ) : null;
    };

    const renderItemDetails = (detail, item) => {
        if (detail === item.active && item.active) {
            return (
                <>
                    <div className='mb-3'>
                        <p className="text-rose text-sm font-semibold mb-1">Active:</p>
                        <p className="text-crimson-grey text-sm ">{detail}</p>
                    </div>
                </>
            );
        }
        if (detail === item.passive && item.passive) {
            return (
                <>
                    <p className="text-rose text-sm font-semibold mb-1">Passive:</p>
                    <p className="text-crimson-grey text-sm"> {detail}</p>
                </>
            );
        }
        if (detail === item.rules && item.rules) {
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
        <div className="tooltip" style={style}>
            <div className='tooltip-container'>
                <div className="tooltip-item-title mb-5">
                    <p className='font-bold text-base text-vibrant-orange'>{item.name}</p>
                    <div className='flex flex-row'>
                        <Image
                            src={`/assets/icons/stats/Gold.png`}
                            alt={'Gold'}
                            width={20}
                            height={20}
                            style={{ width: '20px', height: '15px' }}
                            quality={100}
                        />
                        <p className='text-sm ms-1'>{item.gold}</p>
                    </div>
                </div>
                <div className="text-sm">
                    {renderItemStat(item.ad, 'Attack Damage')}
                    {renderItemStat(item.ap, 'Ability Power')}
                    {renderItemStat(item.mpen, 'Magic Penetration')}
                    {renderItemStat(item.as, 'Attack Speed')}
                    {renderItemStat(item.critChance, 'Critical Strike Chance')}
                    {renderItemStat(item.critDmg, 'Critical Strike Damage')}
                    {renderItemStat(item.health, 'Health')}
                    {renderItemStat(item.armor, 'Armor')}
                    {renderItemStat(item.mr, 'Magic Resistance')}
                    {renderItemStat(item.mana, 'Mana')}
                    {renderItemStat(item.hpregen, 'Base Health Regen')}
                    {renderItemStat(item.haste, 'Ability Haste')}
                    {renderItemStat(item.manaregen, 'Base Mana Regen')}
                    {renderItemStat(item.hpShieldPower, 'Heal and Shield Power')}
                    {renderItemStat(item.flatMs, 'Move Speed')}
                    {renderItemStat(item.percentMs, 'Move Speed')}
                    {renderItemStat(item.vamp, 'Omnivamp')}
                    {renderItemStat(item.lethality, 'Lethality')}
                    {renderItemStat(item.arPen, 'Armor Penetration')}
                    {renderItemStat(item.tenacity, 'Tenacity')}
                </div>
                <div className='text-sm mt-5'>
                    {renderItemDetails(item.active, item)}
                    {renderItemDetails(item.passive, item)}
                    {renderItemDetails(item.rules, item)}
                </div>
            </div>
        </div>
    );
}

export default Tooltip;
