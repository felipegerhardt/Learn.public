import React from 'react';

import { NavigationContainer } from '@react-navigation/native';


import AuthProvider from './src/context/auth';
import Routes from './src/routes';

import { LogBox } from 'react-native';

import { useFonts } from 'expo-font';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])


export default function App() {

  const [loaded] = useFonts({
    FredokaRegular: require('./src/assets/fonts/Fredoka-Regular.ttf'),
    FredokaMedium: require('./src/assets/fonts/Fredoka-Medium.ttf'),
    FredokaLight: require('./src/assets/fonts/Fredoka-Light.ttf'),
    FredokaSemiBold: require('./src/assets/fonts/Fredoka-SemiBold.ttf'),
    FredokaBold: require('./src/assets/fonts/Fredoka-Bold.ttf'),

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
