import React from 'react';
import Login from '../index';
import {MenuProvider} from 'react-native-popup-menu';
import {render, fireEvent, screen} from '@testing-library/react-native';

describe('Login renders correctly', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = render(
      <MenuProvider>
        <Login />
      </MenuProvider>,
    );
  });
  it('Login renders correctly ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('On correct input Submit button enabled correctly', () => {
    const emailInput = screen.getByTestId('emailInput');
    const pwdInput = screen.getByTestId('pwdInput');
    const submitBtn = screen.getByTestId('submitBtn');

    expect(emailInput).toBeTruthy();
    expect(pwdInput).toBeTruthy();
    expect(emailInput).toBeTruthy();

    expect(submitBtn.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(emailInput, 'kuldeep@gmail.com');
    fireEvent.changeText(pwdInput, 'P@ssw0rd');

    expect(emailInput.props.value).toBe('kuldeep@gmail.com');
    expect(pwdInput.props.value).toBe('P@ssw0rd');

    expect(submitBtn.props.accessibilityState.disabled).toBe(false);
  });
});
