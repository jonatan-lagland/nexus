import fetchDataHandler from '../../app/api/fetchDataHandler';

// Mocking the global fetch
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

it('should handle network success when fetching mock data', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: '' }),
    });

    const result = await fetchDataHandler('example.com');
    expect(result).toEqual({ data: '' });
});

it('should handle network failure when attempting to fetch data and return a 500 error', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 500
    });

    try {
        await fetchDataHandler('example.com');
        // If fetchDataHandler doesn't throw, force the test to fail
        expect(true).toBe(false);
    } catch (error) {
        expect(error.message).toEqual('An error has occurred. Please try again later.');
        expect(error.status).toEqual(500);
        expect(error.reason).toEqual('Server Error');
    }
});

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
