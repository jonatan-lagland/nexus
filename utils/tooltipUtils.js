import { useState } from "react";

/* Calculates the X and Y coordinates of the tooltip relative to its parent */
/* Tries to take available client space into consideration when positioning the tooltip */

export const useTooltipHandlers = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');
    const [tooltipItem, setTooltipItem] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const tooltipSize = 150;

    /* Calculate X position so that if the tooltip won't fit the window, move it towards left */
    const calculateXPosition = (parentRect, windowWidth) => {
        const rightEdge = parentRect.right + tooltipSize;
        if (rightEdge > windowWidth) {
            return 0 - tooltipSize + parentRect.width;
        }
        return 0; // Default X position
    };

    /* Calculate Y position so that if the tooltip won't fit the window, place it below or above the image */
    const calculateYPosition = (parentRect) => {
        if (parentRect.y - tooltipSize < 0) {
            return 0 + parentRect.height; // Position below the parent
        }
        return 0 - tooltipSize; // Position above the parent
    };

    const handleItemMouseOver = (event, item, message) => {
        const parentRect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        const posX = calculateXPosition(parentRect, windowWidth);
        const posY = calculateYPosition(parentRect);

        setTooltipItem(item); // Set the item identifier
        setTooltipPosition({ x: posX, y: posY });
        setTooltipMessage(message);
        setShowTooltip(true);
    };

    const handleItemMouseOut = () => {
        setShowTooltip(false);
        setTooltipItem(null);
    };

    return { showTooltip, tooltipMessage, tooltipPosition, tooltipItem, handleItemMouseOver, handleItemMouseOut };
};
