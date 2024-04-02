import React from 'react';
import Movies from '../index';
import {MenuProvider} from 'react-native-popup-menu';
import {render, screen} from '@testing-library/react-native';

describe('Movies renders correctly ', () => {
  const mockUseCollection = jest.fn(() => ({
    fetching: true,
    fetchMovies: jest.fn(),
    response: {results: []},
    error: null,
  }));
  jest.mock('../hooks/useFetchMovies', () => ({
    useFetchMovies: mockUseCollection,
  }));
  let wrapper: any;
  beforeEach(() => {
    wrapper = render(
      <MenuProvider>
        <Movies />
      </MenuProvider>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Renders correctly ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('Loading text is showing correctly', () => {
    const loading = screen.getByTestId('loadingTxt');
    expect(loading).toBeTruthy();
  });
});
