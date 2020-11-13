// ./src/testUtils.js
export function ipProviderFetchResolvedOnce(mock, ipValue = '100.100.100.100') {
    mock.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {ip: ipValue};
        },
    });
}

