// ./src/IP.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ipProviderFetchResolvedOnce } from './testUtils';
import IP from './IP';

jest.spyOn(window, 'fetch');

describe('<IP>', () => {
    test('render IP address', async () => { 
        ipProviderFetchResolvedOnce(window.fetch);

        render(<IP />);

        const loader = screen.getByText(/Loading.../i);
        expect(loader).toBeInTheDocument();

        const reg = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i;
        const ip = await screen.findByText(reg);
        expect(ip).toBeInTheDocument(); 
    });

    test('refresh IP when the button was clicked', async () => { 
        const newIP = '1.1.1.1';
        ipProviderFetchResolvedOnce(window.fetch);
        ipProviderFetchResolvedOnce(window.fetch, newIP);

        render(<IP />);

        const button = await screen.findByRole('button', {name: 'refresh'});
        userEvent.click(button);

        const ip = await screen.findByText(newIP);
        expect(ip).toBeInTheDocument(); 
    });
});
