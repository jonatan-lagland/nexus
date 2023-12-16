import { useState } from "react";

/* Calculates the X and Y coordinates of the tooltip relative to parent (an image it's hovering) */
/* Tries to take available client space into consideration when positioning the tooltip */

export const useTooltipHandlers = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipItem, setTooltipItem] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    let isOutOfBothBounds = false;

    /* X IS CALCULATED RELATIVE TO THE PARENT (IMAGE), NOT THE VIEWPORT. SO X=0 IS CONSIDERED THE LEFT CORNER OF ANY GIVEN IMAGE*/

    const calculateXPosition = (parentRect, windowWidth, tooltipSize) => {
        const xCoordinateWhenFacingRight = parentRect.right + tooltipSize;
        const xCoordinateWhenFacingLeft = parentRect.width - parentRect.width - tooltipSize;
        const xCoordinateWhenCenteredOnViewPort = ((parentRect.left + (tooltipSize / 2)) - (windowWidth / 2));
        const defaultPosition = parentRect.width;
        const isOutOfRightBounds = xCoordinateWhenFacingRight > windowWidth ? true : false;
        const isOutOfLeftBounds = parentRect.left - tooltipSize < 0 ? true : false;


        /* Place tooltip in the middle of the viewport if no space left or right */
        if (isOutOfLeftBounds && isOutOfRightBounds) {
            isOutOfBothBounds = true;
            return 0 - xCoordinateWhenCenteredOnViewPort;
        }

        /* Place tooltip facing towards the right if no space facing left  */
        if (isOutOfLeftBounds && !isOutOfRightBounds) {
            console.log("out of left but not right")
            return defaultPosition;
        }

        /* Place tooltip facing towards the left if no space facing right  */
        if (isOutOfRightBounds) {
            console.log("out of right only")
            return xCoordinateWhenFacingLeft;
        }
        return defaultPosition;
    };

    /* Calculate Y position so that if the tooltip won't fit the window, place it below or above the image */
    const calculateYPosition = (parentRect) => {

        /* Place tooltip below image if centered */

        if (isOutOfBothBounds) {
            isOutOfBothBounds = false;
            return 0 + parentRect.height;
        }
        return 0;
    };

    const handleItemMouseOver = (event, item) => {
        const parentRect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const tooltipSize = 250;

        const posX = calculateXPosition(parentRect, windowWidth, tooltipSize);
        const posY = calculateYPosition(parentRect);

        setTooltipItem(item); // Set the item identifier
        setTooltipPosition({ x: posX, y: posY });
        setShowTooltip(true);
    };

    const handleItemMouseOut = () => {
        setShowTooltip(false);
        setTooltipItem(null);
    };

    return { showTooltip, tooltipPosition, tooltipItem, handleItemMouseOver, handleItemMouseOut };
};
