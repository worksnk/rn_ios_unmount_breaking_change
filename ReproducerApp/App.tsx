/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PureComponent, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

const HOOK_KEY = 'hookKey';
const CLASS_KEY = 'classKey';

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    AsyncStorage.getItem(HOOK_KEY).then(v =>
      console.debug('Hook cleanup called at', v),
    );

    return () => {
      AsyncStorage.setItem(HOOK_KEY, new Date().toISOString());
    };
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        { marginTop: safeAreaInsets.top, marginBottom: safeAreaInsets.bottom },
      ]}
      keyboardShouldPersistTaps="never"
    >
      <TextInput
        placeholder="Your text goes here"
        style={{ borderWidth: 1, borderColor: 'red' }}
      />
      <ClassComponentReproducer />
    </ScrollView>
  );
}

class ClassComponentReproducer extends PureComponent {
  componentDidMount(): void {
    AsyncStorage.getItem(CLASS_KEY).then(v =>
      console.debug('Class componentWillUnmount called at', v),
    );
  }

  componentWillUnmount(): void {
    AsyncStorage.setItem(CLASS_KEY, new Date().toISOString());
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
