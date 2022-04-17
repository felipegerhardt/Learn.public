import React, { useContext } from "react";
import { 
    View , 
    ActivityIndicator,
    } from "react-native";

import { AuthContext } from "../context/auth"; 

import Home from '../screens/Home';
import Classroom from "../screens/Classroom";
import Opening from '../screens/Opening';
import Register from '../screens/Register';

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
        <Stack.Navigator initialRouteName={ signed ? 'Home' : 'Opening' }>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Classroom" component={Classroom} options={{ headerShown: false }}/>
            <Stack.Screen name='Opening' component={Opening}  options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={Register}  options={{ headerShown: false }}/>
        </Stack.Navigator>
    )

};



export default Routes;