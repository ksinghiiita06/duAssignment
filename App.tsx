import React, {useCallback} from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigation from './src/navigation';
import {PRIMARY_COLOR} from './src/common/colors';
import {configureLocale} from './src/localize';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const beforeLift = useCallback(async () => {
    configureLocale();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <MenuProvider>
          <PersistGate persistor={persistor} onBeforeLift={beforeLift}>
            <SafeAreaView style={[backgroundStyle, styles.safeareaStyle]}>
              <StatusBar backgroundColor={PRIMARY_COLOR} />
              <RootNavigation />
            </SafeAreaView>
          </PersistGate>
        </MenuProvider>
      </PaperProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  safeareaStyle: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
});
export default App;
