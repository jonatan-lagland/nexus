import { useRef } from 'react';
import React from 'react';
import { useTooltipHandlers } from '@utils/tooltipUtils';
import TooltipData from './TooltipData';

const Tooltip = ({ data, event, itemId }) => {

    if (!data) return null;
    if (!event) return null;

    const tooltipRef = useRef(null);

    const {
        locationOfArrow,
        arrowStyle,
        tooltipStyle,
        visibility,
    } = useTooltipHandlers(data, event, itemId, tooltipRef);

    return (
        <>
            <div ref={tooltipRef} style={{ ...tooltipStyle, ...visibility }}>
                <div style={{ ...arrowStyle, ...locationOfArrow }}></div>
                <div className='tooltip-container'>
                    <TooltipData data={data}></TooltipData>
                </div>
            </div>
        </>
    );
};

export default Tooltip;
