import { useState } from "react";

/* Calculates the X and Y coordinates of the tooltip relative to parent (an image it's hovering) */
/* Tries to take available client space into consideration when positioning the tooltip */
/* Tooltip is centered horizontally relative to the image */

export const useTooltipHandlers = () => {

    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [locationOfArrow, setLocationOfArrow] =
        useState({
            left: '50%',
            transform: `translateX(-50%) rotate(45deg)`,
            top: '-0.5rem',
            width: '1rem',
            height: '1rem'
        });

    const arrowStyles = {
        topArrow: {
            top: '-0.5rem',
            borderTop: '1px solid white',
            borderLeft: '1px solid white',
        },
        bottomArrow: {
            top: undefined,
            bottom: '-0.5rem',
            borderTop: 'none',
            borderLeft: 'none',
            borderBottom: '1px solid white',
            borderRight: '1px solid white'
        }
    };
    const arrowStyle = {
        position: 'absolute',
        backgroundColor: 'var(--dark-cosmic)',
    };
    const tooltipStyle = {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'normal',
        color: 'white',
        backgroundColor: 'var(--dark-cosmic)',
        borderRadius: '0.375rem',
        border: '1px solid white',
        position: 'absolute',
        minHeight: 'max-content',
        pointerEvents: 'none',
        width: '250px',
        textAlign: 'start',
        zIndex: 101
    };

    let isOutOfBothBounds = false;

    /* X IS CALCULATED RELATIVE TO THE PARENT (IMAGE), NOT THE VIEWPORT. SO X=0 IS CONSIDERED THE LEFT CORNER OF ANY GIVEN IMAGE */
    /* EXAMPLE: IMAGINE THE IMAGE IS 64 PIXELS WIDE (parentRect.width) AND THE TOOLTIP IS 250 PIXELS WIDE (tooltipWidth)*/
    /* IF WE WANT TO CENTER THE TOOLTIP WITH THE IMAGE, DIVIDE BOTH VALUES BY 2, AND DEDUCT TOOLTIP FROM IMAGE WIDTH*/
    /* (64 / 2) - (250 / 2) = -93 */
    /* THEREFORE, IT MEANS THE LEFT CORNER OF THE TOOLTIP IS MOVED 93 PIXELS TOWARDS THE LEFT AND X = -93, AND WE RETURN THIS VALUE */
    /* IF WE WANT TO KNOW IF IMAGE IS OUT OF BOUNDS, CALCULATE THE X COORDINATE OF WHICHEVER CORNER OF THE TOOLTIP AND COMPARE IT TO WINDOW WIDTH */

    const calculateXPosition = (parentRect, windowWidth, tooltipWidth) => {

        const buffer = 5; // Add a tiny bit of buffer so tooltip isn't glued to the viewport edge

        const defaultPosition = parentRect.width / 2 - tooltipWidth / 2;
        const xCoordinateofRightCorner = parentRect.left + defaultPosition + tooltipWidth;
        const xCoordinateofLeftCorner = parentRect.right - parentRect.width / 2 - tooltipWidth / 2;


        const xCoordinateWhenFacingLeft = parentRect.width - tooltipWidth;
        const xCoordinateWhenCenteredOnViewPort = ((parentRect.left + (tooltipWidth / 2)) - (windowWidth / 2));
        const isOutOfRightBounds = xCoordinateofRightCorner + buffer > windowWidth ? true : false;
        const isOutOfLeftBounds = xCoordinateofLeftCorner - buffer < 0 ? true : false;

        if (!isOutOfLeftBounds && !isOutOfRightBounds) {
            return defaultPosition;
        }

        // Place tooltip in the middle of the viewport as a last resort if no space either left or right
        if (isOutOfLeftBounds && isOutOfRightBounds) {
            isOutOfBothBounds = true;
            return 0 - xCoordinateWhenCenteredOnViewPort;
        }

        // Place tooltip facing towards the right if no space facing left (X = 0)
        if (isOutOfLeftBounds && !isOutOfRightBounds) {
            return 0;
        }

        // Place tooltip facing towards the left if no space facing right
        if (isOutOfRightBounds) {
            return xCoordinateWhenFacingLeft;
        }

    };

    /* Calculate Y position so that if the tooltip won't fit the window, place it below or above the image */
    const calculateYPosition = (parentRect, windowHeight, tooltipHeight) => {

        const buffer = 12; //arbitrary gap between arrow and image
        const tooltipBelowParent = parentRect.height + buffer;
        const tooltipAboveParent = 0 - tooltipHeight - buffer;
        let spaceAbove = parentRect.top + buffer;
        let spaceBelow = windowHeight - parentRect.bottom - buffer;

        // Move tooltip higher up if it can't fit below
        if (spaceAbove >= tooltipHeight && spaceAbove > spaceBelow) {
            // Place arrow below container
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowStyles.bottomArrow
                };
            });
            return tooltipAboveParent;
        }

        // Place arrow above container by default
        setLocationOfArrow(prevState => {
            return {
                ...prevState,
                ...arrowStyles.topArrow
            };
        });

        return tooltipBelowParent;
    };

    const handleItemMouseOver = (event, tooltipRef) => {

        // Information about whatever we're hovering (X and Y relative to viewport, width, height)
        const parentRect = event.currentTargetRect;

        const tooltipHeight = tooltipRef.current.offsetHeight;
        const tooltipWidth = tooltipRef.current.offsetWidth;

        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;

        const posX = calculateXPosition(parentRect, windowWidth, tooltipWidth);
        const posY = calculateYPosition(parentRect, windowHeight, tooltipHeight);

        setTooltipPosition({ x: posX, y: posY });
    };

    return { tooltipPosition, locationOfArrow, arrowStyle, tooltipStyle, handleItemMouseOver };
};