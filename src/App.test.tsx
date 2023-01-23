import React from 'react';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { SearchComponent } from 'components/molecules';
import { wait } from '@testing-library/user-event/dist/utils';
import { searchCityData } from 'mocks/handlers';

describe('get city geo location', () => {
  test('list of cities', async () => {
    render(<App />);

    userEvent.type(screen.getByPlaceholderText('Search by City...'), 'tunis');

    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Tunis')).toBeInTheDocument();
    });
  });
});
