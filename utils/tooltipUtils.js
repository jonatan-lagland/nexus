import { useState, useEffect } from "react";

/* Calculates the X and Y coordinates of the tooltip relative to parent (an image it's hovering) */
/* Tries to take available client space into consideration when positioning the tooltip */
/* Tooltip is centered horizontally relative to the image by default */

export const useTooltipHandlers = (data, event, itemId, tooltipRef) => {

    /* Tooltips are hidden by default */
    const [visibility, setVisibility] =
        useState(
            { visibility: 'hidden' }
        );

    const isMobileDevice = () => {
        return window.matchMedia("(max-width: 1024px)").matches;
    };

    const arrowStyle = {
        position: 'absolute',
        backgroundColor: 'var(--dark-cosmic)'
    };

    const tooltipStyle = {
        top: '0',
        left: '0',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'normal',
        color: 'white',
        backgroundColor: 'var(--dark-cosmic)',
        borderRadius: '0.375rem',
        border: '1px solid white',
        position: 'absolute',
        minHeight: 'max-content',
        pointerEvents: 'none',
        width: '300px',
        textAlign: 'start',
        zIndex: 101,
    };

    const [locationOfArrow, setLocationOfArrow] =
        useState({
            transform: `translateX(-50%) rotate(45deg)`,
            width: '1rem',
            height: '1rem'
        });


    const calculateArrowPositions = (parentWidth, tooltipWidth) => {

        const arrowLeftPercentage = ((parentWidth / 2) / tooltipWidth) * 100;
        const arrowRightPercentage = 100 - (((parentWidth / 2) / tooltipWidth) * 100);

        return {
            topArrow: {
                top: '-0.55rem',
                bottom: undefined,
                borderTop: '1px solid white',
                borderLeft: '1px solid white',
                borderBottom: 'none',
                borderRight: 'none'
            },
            bottomArrow: {
                top: undefined,
                bottom: '-0.55rem',
                borderTop: 'none',
                borderLeft: 'none',
                borderBottom: '1px solid white',
                borderRight: '1px solid white'
            },
            arrowMiddle: {
                left: '50%'
            },
            arrowLeft: {
                left: `${arrowLeftPercentage}%`
            },
            arrowRight: {
                left: `${arrowRightPercentage}%`
            },
            arrowGone: {
                visibility: 0
            }
        };

    }

    /* X IS CALCULATED RELATIVE TO THE PARENT (IMAGE), NOT THE VIEWPORT. SO X=0 IS CONSIDERED THE LEFT CORNER OF ANY GIVEN IMAGE */
    /* EXAMPLE: IMAGINE THE IMAGE IS 64 PIXELS WIDE (parentRect.width) AND THE TOOLTIP IS 250 PIXELS WIDE (tooltipWidth)*/
    /* IF WE WANT TO CENTER THE TOOLTIP WITH THE IMAGE, DIVIDE BOTH VALUES BY 2, AND DEDUCT TOOLTIP FROM IMAGE WIDTH*/
    /* (64 / 2) - (250 / 2) = -93 */
    /* THEREFORE, IT MEANS THE LEFT CORNER OF THE TOOLTIP IS MOVED 93 PIXELS TOWARDS THE LEFT AND X = -93, AND WE RETURN THIS VALUE */
    /* IF WE WANT TO KNOW IF IMAGE IS OUT OF BOUNDS, CALCULATE THE X COORDINATE OF WHICHEVER CORNER OF THE TOOLTIP AND COMPARE IT TO WINDOW WIDTH */

    const calculateXPosition = (parentRect, windowWidth, tooltipWidth, arrowPositions) => {

        const buffer = 10; // Add a tiny bit of buffer so tooltip isn't glued to the viewport edge

        const defaultPosition = parentRect.width / 2 - tooltipWidth / 2; // default position is in the middle
        const xCoordinateofRightCorner = tooltipRef.current.getBoundingClientRect().right - tooltipWidth / 2 + parentRect.width / 2;
        const xCoordinateofLeftCorner = tooltipRef.current.getBoundingClientRect().left - tooltipWidth / 2 + parentRect.width / 2;

        const xCoordinateWhenFacingLeft = parentRect.width - tooltipWidth;
        const xCoordinateWhenFacingRight = 0;

        const isOutOfRightBounds = xCoordinateofRightCorner + buffer > windowWidth ? true : false;
        const isOutOfLeftBounds = xCoordinateofLeftCorner - buffer < 0 ? true : false;

        if (!isOutOfLeftBounds && !isOutOfRightBounds) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.arrowMiddle
                };
            });
            return defaultPosition;
        }

        // Place tooltip facing towards the right if no space facing left (X = 0)
        if (isOutOfLeftBounds && !isOutOfRightBounds) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.arrowLeft
                };
            });
            return xCoordinateWhenFacingRight;
        }

        // Place tooltip facing towards the left if no space facing right
        if (isOutOfRightBounds) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.arrowRight
                };
            });
            return xCoordinateWhenFacingLeft;
        }
    };

    /* Climb up the DOM tree hierarchy to get <main> Y coordinate to be used to avoid tooltip from clipping on header */
    const getMainElementYPosition = () => {
        if (!tooltipRef) return 0;

        let currentElement = tooltipRef.current;

        while (currentElement && currentElement.nodeName !== 'MAIN') {
            currentElement = currentElement.parentNode;
        }
        return currentElement.getBoundingClientRect().y;
    };

    /* Calculate available document space and assign Y position to wherever there's more available space */
    const calculateYPosition = (parentRect, windowHeight, arrowPositions) => {

        const tooltipHeight = tooltipRef.current.offsetHeight;
        const mainHeight = getMainElementYPosition(tooltipRef); // Height of the "main" DOM element
        const documentHeight = document.documentElement.scrollHeight; // Height of the entire document

        const buffer = 20; //arbitrary gap between arrow and image
        const arrowHeight = 16;
        const tooltipBelowParent = parentRect.height + buffer; // Y coordinate when tooltip is placed above parent
        const tooltipAboveParent = 0 - tooltipHeight - buffer; // Y coordinate when tooltip is placed below parent
        let isOverflowingTop = parentRect.top - tooltipHeight - buffer < mainHeight ? true : false; // Check if tooltip would overflow at the top of "main"
        let isOverflowingBottom =
            tooltipRef.current.getBoundingClientRect().bottom + parentRect.height + buffer + arrowHeight > windowHeight ? true : false; // Check if the tooltip would overflow at the bottom of document
        let isOverflowingBottomDocument =
            tooltipRef.current.getBoundingClientRect()
                .bottom + buffer > documentHeight ? true : false; // Check if the tooltip would overflow at the bottom of client (might be resized)

        let spaceAbove = parentRect.top + buffer;   // Available empty screen space above tooltip
        let spaceBelow = windowHeight - (parentRect.top); // Available empty screen space below tooltip

        /* If tooltip overflows at the top of "main" but not the document's bottom: set tooltip below the hovered item */
        if (isOverflowingTop && !isOverflowingBottomDocument) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.topArrow
                };
            });
            return tooltipBelowParent;
        }

        /* If tooltip overflows bottom of the document but not top of the document's "main" section: set tooltip above the hovered item */
        if (isOverflowingBottom && !isOverflowingTop) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.bottomArrow
                };
            });
            return tooltipAboveParent;
        }

        /* If there's no overflow detected, check which side of the client has more available space. If more space above: set tooltip above the hovered item */
        if (spaceAbove > spaceBelow) {
            setLocationOfArrow(prevState => {
                return {
                    ...prevState,
                    ...arrowPositions.bottomArrow
                };
            });
            return tooltipAboveParent;
        }

        /* Place tooltip below parent by default if there's more space below the item than above */
        setLocationOfArrow(prevState => {
            return {
                ...prevState,
                ...arrowPositions.topArrow
            };
        });
        return tooltipBelowParent;
    };

    const handleTooltipVisible = (event, tooltipRef) => {

        // Information about whatever we're hovering, like an image. (Shows image's X and Y relative to viewport, width, height)
        const parentRect = event.currentTargetRect;
        const tooltipWidth = tooltipRef.current.offsetWidth;

        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = document.documentElement.clientHeight;

        const arrowPositions = calculateArrowPositions(parentRect.width, tooltipWidth);

        const posX = calculateXPosition(parentRect, windowWidth, tooltipWidth, arrowPositions);
        const posY = calculateYPosition(parentRect, windowHeight, arrowPositions);

        setVisibility({
            visibility: 'visible',
            top: posY,
            left: posX,
            animation: isMobileDevice() ? 'fadeIn 0.3s' : 'fadeIn 0.4s'
        })
    };

    const handleTooltipHidden = () => {
        setVisibility({ visibility: 'hidden' })
    };

    useEffect(() => {
        handleTooltipHidden();
        if (!tooltipRef.current) {
            return;
        }

        const showTooltip = event.type === "mouseover" || event.type === "touchstart";
        if (showTooltip && data.id === itemId) {
            handleTooltipVisible(event, tooltipRef);
        }
    }, [event]);

    return { locationOfArrow, arrowStyle, tooltipStyle, visibility };
};


// Saves the value of the hovered item ID and the event type so they can be passed to other components
export const useItemHover = () => {
    const [tooltipItemId, setTooltipItemId] = useState(null);
    const [event, setEvent] = useState(null);

    const handleMouseHover = (item) => (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setEvent({ type: e.type, currentTargetRect: rect });

        if (e.type === "mouseover") {
            setTooltipItemId(item.id);
        } else if (e.type === "mouseleave") {
            setTooltipItemId(null);
        }
    };

    return { handleMouseHover, tooltipItemId, event };
};