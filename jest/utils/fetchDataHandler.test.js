import fetchDataHandler from '../../utils/fetchDataHandler';

// Mocking the global fetch
global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

it('should handle network success when fetching champion data', async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: '' }),
    });

    const result = await fetchDataHandler('data', 'champion', 'fiora', 'json');
    expect(result).toEqual({ status: 200, response: { data: '' } });
});

it('should handle network failure when fetching champion data as an error 404 and return a 404 error', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.reject({ error: '' }),
    });

    const result = await fetchDataHandler('data', 'champion', 'fiora', 'json');
    expect(result).toEqual({ status: 404, error: 'We were unable to find what you were looking for.' });
});

it('should handle network failure when fetching champion data as an error 500 and return a stock error', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject({ error: '' }),
    });

    const result = await fetchDataHandler('data', 'champion', 'fiora', 'json');
    expect(result).toEqual({ status: 500, error: 'Network response failed. Try again later.' });
});

it('should handle network failure when fetching champion data reaches set time limit', async () => {
    // Mock fetch to delay indefinitely
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        new Promise(resolve => {
            // Do not resolve or reject to simulate a delayed response
        })
    );

    // Data handler allows us to set a timeout, set to 2000 ms
    const result = await fetchDataHandler('data', 'champion', 'fiora', 'json', '2000');
    expect(result).toEqual({ status: 408, error: 'We were unable to resolve a response from Riot Games API. Please try again later.' });

    // Restore fetch to its original implementation
    global.fetch.mockRestore();
});