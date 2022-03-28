import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TelaAbertura from './TelaAbertura';
import TelaCadastro from './TelaCadastro';


const Stack = createStackNavigator();

function AuthRoutes() {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name='TelaAbertura' component={TelaAbertura}  options={{ headerShown: false }}/>
            <Stack.Screen name='TelaCadastro' component={TelaCadastro}  options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
};

export default AuthRoutes;