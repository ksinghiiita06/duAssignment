import React, {useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header from '../commonComponents/header';
import {strings} from '../../localize';
import LoginForm from './components';
import {isValidEmail, isValidPassword} from '../../common/utils';
import {setUser} from '../../redux/features/userSlice';
import {useAppDispatch} from '../../redux';

const Login = () => {
  const dispatch = useAppDispatch();
  const handleCheckEmail = useCallback((emailId: string) => {
    return isValidEmail(emailId);
  }, []);

  const handleCheckPassword = useCallback((password: string) => {
    return isValidPassword(password);
  }, []);

  const handleSubmit = useCallback(
    (emailId: string, password: string) => {
      dispatch(setUser({emailId, password: password}));
    },
    [dispatch],
  );
  return (
    <>
      <Header title={strings('screen1Title')} />
      <View style={styles.root}>
        <LoginForm
          handleCheckEmail={handleCheckEmail}
          handleCheckPassword={handleCheckPassword}
          handleSubmit={handleSubmit}
        />
      </View>
    </>
  );
};

export default Login;
