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