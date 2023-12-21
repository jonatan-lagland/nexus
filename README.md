## Introduction

Nexus is a League of Legends fan project intended to help players quickly and seamlessly find an optimal champion build, rune page and champion synergies in one simple layout.
The project will be deployed as a website once all core features have been implemented.

### Tools used

- Next.js (and React.js)
- Tailwind CSS
- JavaScript

## Core features



### Integration with Riot Games API

The website leverages the robust server-side features of Next.js, built on Node.js, to connect with the Riot Games API. This setup enables the dynamic fetching of essential data such as champion images and descriptions.

### Responsive design

The website's responsive design is achieved through the integration of Tailwind CSS, CSS Grid, Flexbox, and JavaScript. Tailwind CSS and CSS Grid handle the structural aspects, while Flexbox ensures fluid content layout. JavaScript complements these technologies by dynamically adjusting elements and interactions, ensuring a seamless user experience across all devices.

![Nexus Responsive Design](https://i.imgur.com/yNS1vGO.gif)


### Modularity

The website is built with a key emphasis on modularity to enhance code reusability across the project. Below is a code snippet for the tooltip shown in the GIF above. It receives three props: **data**, **event**, and **itemId**.

* **data:** Data that will be displayed inside the tooltip.
* **event:** Refers to a browser event, which is used to trigger the display of a tooltip. An event might occur when a user taps on something.
* **itemId:** An identifier for the specific item for which the tooltip is being displayed for. In our case, the item is an image.

The information is passed to a handler, which will take care of the tooltip's style and location on the viewport. These styles are assigned to a div that represents the tooltip. Then, the actual presentation of the data at hand, whatever it might be, is handled in another component. 
        
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


### Other features

- Page navigation using Next.js page routing, including dynamic routing

## Work in progress

- Layouts for rune pages and champion synergies in the profile page
- Further integration with Riot API to display up-to-date meta builds and other relevant information
- A fully fledged website deployed on Vercel