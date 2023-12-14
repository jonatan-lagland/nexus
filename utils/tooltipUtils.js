import { useState } from "react";

export const useTooltipHandlers = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');
    const [tooltipItem, setTooltipItem] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const tooltipSize = 150;

    const calculateXPosition = (divRect, windowWidth) => {
        const rightEdge = divRect.right + tooltipSize;
        if (rightEdge > windowWidth) {
            return 0 - tooltipSize + divRect.width; // Adjust position to fit within the window
        }
        return 0; // Default X position
    };

    /* Calculate Y position so that if the tooltip won't fit the window, place it below or above the image */

    const calculateYPosition = (divRect) => {
        if (divRect.y - tooltipSize < 0) {
            return 0 + divRect.height; // Position below the div
        }
        return 0 - tooltipSize; // Position above the div
    };

    const handleItemMouseOver = (event, item, message) => {
        const divRect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        const posX = calculateXPosition(divRect, windowWidth);
        const posY = calculateYPosition(divRect);

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
