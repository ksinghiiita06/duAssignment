import React, {useCallback, useEffect, useState} from 'react';
import {Button, HelperText, TextInput} from 'react-native-paper';
import styles from '../styles';
import {strings} from '../../../localize';
import {isValidEmail, isValidPassword} from '../../../common/utils';

type LoginFormProps = {
  handleCheckEmail: (emailId: string) => boolean;
  handleCheckPassword: (password: string) => boolean;
  handleSubmit: (emailId: string, password: string) => void;
};

const LoginForm = (props: LoginFormProps) => {
  const {handleCheckEmail, handleCheckPassword, handleSubmit} = props;
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (password) {
      setPasswordError(!handleCheckPassword(password));
    }
  }, [password, handleCheckPassword]);

  const checkNextEnabled = useCallback(() => {
    return isValidEmail(emailId) && isValidPassword(password);
  }, [emailId, password]);

  const handleChangeEmail = useCallback((email: string) => {
    setEmailError(false);
    setEmailId(email);
  }, []);

  const handleChangePassword = useCallback((pwd: string) => {
    setPasswordError(false);
    setPassword(pwd);
  }, []);

  return (
    <>
      <TextInput
        testID="emailInput"
        label={strings('email')}
        value={emailId}
        onChangeText={handleChangeEmail}
        mode="outlined"
        maxLength={50}
        error={emailError}
        onBlur={() => {
          if (emailId) {
            setEmailError(!handleCheckEmail(emailId));
          }
        }}
        right={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={emailError}>
        {strings('invalid_email')}
      </HelperText>
      <TextInput
        testID="pwdInput"
        label={strings('password')}
        value={password}
        maxLength={15}
        onChangeText={handleChangePassword}
        style={styles.mt16}
        mode="outlined"
        error={passwordError}
        secureTextEntry={!showPwd}
        right={
          <TextInput.Icon
            icon={showPwd ? 'eye' : 'eye-off'}
            onPress={() => setShowPwd(!showPwd)}
          />
        }
      />
      <HelperText type="error" visible={passwordError}>
        {strings('password_rule')}
      </HelperText>
      <Button
        accessibilityLabel="submitBtn"
        testID="submitBtn"
        mode="contained"
        onPress={() => handleSubmit(emailId, password)}
        disabled={!checkNextEnabled()}
        style={styles.mt16}>
        {strings('submit')}
      </Button>
    </>
  );
};
export default LoginForm;
