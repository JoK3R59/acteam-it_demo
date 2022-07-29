import { SafeAreaView, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AppHomeNavigation from './src/navigation/navHome';

// REDUX
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed"
  ])

  return (
    <Provider store={store}>

      <SafeAreaView style={{ flex: 1 }}>

        <AppHomeNavigation />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
