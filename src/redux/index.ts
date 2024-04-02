import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import appReducer from './features/appSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';

const rootReducer = {
  user: userReducer,
  app: appReducer,
};

const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'app'],
};
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export const dispatchAction = (action: any) => store.dispatch(action);
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
