## Introduction

Nexus is a League of Legends fan project intended to help players quickly and seamlessly find an optimal champion build, rune page and champion synergies in one simple layout.
The project will be deployed as a website once all core features have been implemented.

### Tools used

- Next.js (and React.js)
- Tailwind CSS
- JavaScript
- Jest

## Core features



### Integration with Riot Games API

The website leverages the robust server-side features of Next.js, built on Node.js, to connect with the Riot Games API. This setup enables the dynamic fetching of essential data such as champion images and descriptions.

### Responsive design

The website's responsive design is achieved through the integration of Tailwind CSS, CSS Grid, Flexbox, and JavaScript. Tailwind CSS and CSS Grid handle the structural aspects, while Flexbox ensures fluid content layout. JavaScript complements these technologies by dynamically adjusting elements and interactions, ensuring a seamless user experience across all devices.

![Nexus Responsive Design](https://i.imgur.com/yNS1vGO.gif)

_Players might want to know what specific items do. To accommodate this, a tooltip is displayed, either via tapping on a mobile device or hovering on a desktop device. The tooltip automatically adjusts its position with available screen space in mind._


### Modularity

The website is built with a key emphasis on modularity to enhance code reusability — a characteristic of React-based development. Below is a code snippet for the tooltip shown in the GIF above. It receives three props: **data**, **event**, and **itemId**.

* **data:** Data that will be displayed inside the tooltip.
* **event:** Refers to a browser event, which is used to trigger the display of a tooltip. An event might occur when a user taps on something.
* **itemId:** An identifier for the specific item for which the tooltip is being displayed for. In our case, the item is an image.

The information is passed to a custom hook, which will take care of the tooltip's style and location on the viewport. These styles are assigned to a div that represents the tooltip. Then, the actual presentation of the data at hand, whatever it might be, is handled in another component. As such, the Tooltip component is only concerned with rendering logic.
        
    const Tooltip = ({ data, event, itemId }) => {

        const tooltipRef = useRef(null);

        const {
            locationOfArrow,
            arrowStyle,
            tooltipStyle,
            visibility,
        } = useTooltipHandlers(data, event, itemId, tooltipRef);

        if (!data || !event) return null;

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


### Test automation

Test automation is used in order to maintain the expected operability of various parts of the codebase as the project grows. Unit tests are writen using Jest and automated with GitHub Actions.

#### Unit tests

- **Asynchronous Testing**: Unit tests in this project are designed to handle async operations, ensuring handling of promises and async/await patterns.
- **Mocking and Spies**: Used to isolate tests from external dependencies with the use of Jest's mocking capabilities.

Below is an example of a unit test to handle a timeout in the event of Riot Games' API being down:

    it('should handle network failure when fetching champion data reaches set time limit', async () => {
        // Mock fetch to delay indefinitely
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            new Promise(resolve => {
                // Do not resolve or reject to simulate a delayed response
            })
        );

        // Data handler allows timeouts, set to 2000 ms
        const result = await fetchDataHandler('data', 'champion', 'fiora', 'json', '2000');
        expect(result).toEqual({ status: 408, error: 'We were unable to resolve a response from Riot Games API. Please try again later.' });

        // Restore fetch to its original implementation
        global.fetch.mockRestore();
    });

**Result:**
  *√ should handle network failure when fetching champion data reaches set time limit (2002 ms)*
### Other features

- Page navigation using Next.js page routing, including dynamic routing

## Work in progress

- Layouts for rune pages and champion synergies in the profile page
- Further integration with Riot API to display up-to-date meta builds and other relevant information
- A fully fledged website deployed on Vercel
