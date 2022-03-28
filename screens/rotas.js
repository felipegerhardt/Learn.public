import React, { useContext, useEffect } from "react";
import { 
    View , 
    ActivityIndicator,
    } from "react-native";

import { AuthContext } from "../context/auth"; 

import TelaPerfil from './TelaPerfil';
import AuthRoutes from "./rotaAbertura";
import TelaAula from "./TelaAula";

import { createStackNavigator } from "@react-navigation/stack";
    

const Stack = createStackNavigator();

function Routes () {

    const { signed, loadingAuth } = useContext(AuthContext);

    if(loadingAuth) {
        return(
            <View style={{flex: 1}}>
                <ActivityIndicator style={{height: 450}} size="large" color="#4fff85"/>
            </View>
        )
    };

    return(
        <Stack.Navigator initialRouteName={ signed ? 'TelaPerfil' : 'RotasAutenticacao' }>
            <Stack.Screen name="RotasAutenticacao" component={AuthRoutes} options={{ headerShown: false }}/>
            <Stack.Screen name="TelaPerfil" component={TelaPerfil} options={{ headerShown: false }}/>
            <Stack.Screen name="TelaAula" component={TelaAula} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )

};



export default Routes;