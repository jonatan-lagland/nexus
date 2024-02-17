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

![Nexus Responsive Design](https://i.imgur.com/AIL0kNx.gif)

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

Test automation is used in order to maintain the expected operability of various parts of the codebase as the project grows. Unit tests are written using Jest and automated with GitHub Actions.

#### Unit tests

- **Asynchronous Testing**: Unit tests in this project are designed to handle async operations, ensuring handling of promises and async/await patterns.
- **Mocking and Spies**: Unit tests in this project are also used to isolate tests from external dependencies with the use of Jest's mocking capabilities.

Below is an example of a unit test designed to handle timeouts, specifically in scenarios where Riot Games' API fails to respond within a set time limit. In this test, Jest is used to "spy" on the global `fetch` function within the application. This spy overrides the normal behavior of `fetch`, making it return a Promise that never resolves. By doing so, the spy simulates the behavior of a delayed or non-responsive API. The test then invokes the `fetchDataHandler` function, which is used to interact with the Riot Games API endpoints and includes an optional timeout parameter. Here, a 2 second timeout is specified to check if the handler appropriately returns a 408 Request Timeout error when the time limit is exceeded.

    it('should handle network failure when fetching mock data reaches set time limit', async () => {
    // Mock fetch to delay indefinitely
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        new Promise(() => {
            // Do not resolve or reject to simulate a delayed response
        })
    );
    try {
        // Data handler with a timeout set to 2000 ms
        await fetchDataHandler('https://example.com', 2000);
        // Fail test if above line does not throw
        expect(true).toBe(false);
    } catch (error) {
        expect(error.message).toEqual('We were unable to resolve a response from Riot Games API. Please try again later.');
        expect(error.status).toEqual(408);
        expect(error.reason).toEqual("Request Timeout");
    }

    // Restore fetch to its original implementation
    global.fetch.mockRestore();
    });

**Result:**
  *√ should handle network failure when fetching mock data reaches set time limit (2002 ms)*
### Other features

- Page navigation using Next.js page routing, including dynamic routing

## Work in progress

- Layouts for rune pages and champion synergies in the profile page
- Further integration with Riot API to display up-to-date meta builds and other relevant information
- A fully fledged website deployed on Vercel
