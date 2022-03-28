import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AuthProvider from './context/auth';
import Routes from './screens/rotas';

import { LogBox } from 'react-native';


// TESTE FONTE
import { useFonts } from 'expo-font';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])


const Stack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    FredokaRegular: require('./assets/fonts/Fredoka-Regular.ttf'),
    FredokaMedium: require('./assets/fonts/Fredoka-Medium.ttf'),
    FredokaLight: require('./assets/fonts/Fredoka-Light.ttf'),
    FredokaSemiBold: require('./assets/fonts/Fredoka-SemiBold.ttf'),
    FredokaBold: require('./assets/fonts/Fredoka-Bold.ttf'),

  })

  if (!loaded){
    return null
  }

  return (

    <NavigationContainer>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  
   );
}
