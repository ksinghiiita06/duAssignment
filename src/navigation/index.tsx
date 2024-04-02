import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LOGIN_ROUTE_NAME, MOVIES_ROUTE_NAME} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login';
import Movies from '../pages/movies';
import {useAppSelector} from '../redux';

const Stack = createNativeStackNavigator();
//when user in logged-out state
const OnboardingNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={LOGIN_ROUTE_NAME}>
      <Stack.Screen
        name={LOGIN_ROUTE_NAME}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//when user is logged-in state
export const InAppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={MOVIES_ROUTE_NAME}>
      <Stack.Screen
        name={MOVIES_ROUTE_NAME}
        component={Movies}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//Main navigation
const RootNavigation = () => {
  const {user} = useAppSelector(state => state.user);
  const getActiveNavigation = useCallback(() => {
    return user ? <InAppNavigation /> : <OnboardingNavigation />;
  }, [user]);
  return <NavigationContainer>{getActiveNavigation()}</NavigationContainer>;
};

export default RootNavigation;
