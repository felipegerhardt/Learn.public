import React, { useContext, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
    Dimensions,
    View , 
    Text ,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    } from "react-native";


import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TelaPerfilPerfil from '../screens/TelaPerfilPerfil';
import TelaPerfilProgresso from '../screens/TelaPerfilProgresso';
import TelaPreNovaMateria from "./TelaPreNovaMateria";
import TelaPerfilHome from "./TelaPerfilHome";
import TelaPerfilConfig from "./TelaPerfilConfig";

import { AuthContext } from "../context/auth"; 

const Tab = createBottomTabNavigator();

export default function TelaPerfil(){

    const { dados, storeData, loadingAuth, setLoadingAuth } = useContext(AuthContext);    
      
    useEffect(()=> {
        
       storeData(dados);

    }, []) 


    const CustomTabBarButton = ({children, onPress}) => (
        <TouchableOpacity
            style={styles.botaoNavegador}
            onPress={onPress}>

            <View style={styles.viewbotaoNavegador}>
                <Icon name="book" size={40} 
                        color="#000000"/>
            </View>

        </TouchableOpacity>
    );

    return(
        <>
        
        <Tab.Navigator
            initialRouteName="TelaPerfilProgresso"
            screenOptions={{
                headerShown: false,
                tabBarStyle: [styles.barraNavegador],
                tabBarShowLabel: false,

            }}           
            >
                
            <Tab.Screen name="TelaPerfilHome" component={TelaPerfilHome} options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.icones}>
                        <Icon name="home" size={30} 
                            color={focused ? "#4fff85" : "#000000"}
                        />
                        <Text style={{fontFamily: 'FredokaRegular',fontSize: 12}}>
                            Início
                        </Text>
                    </View>
                )

            }}/>

            <Tab.Screen name="TelaPerfilProgresso" component={TelaPerfilProgresso} options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.icones}>
                        <Icon name="line-chart" size={30} 
                            color={focused ? "#4fff85" : "#000000"}
                        />
                        <Text style={{fontFamily: 'FredokaRegular',fontSize: 12}}>
                            Progresso
                        </Text>
                    </View>
                )

            }}/>

            <Tab.Screen name="TelaPreNovaMateria" component={TelaPreNovaMateria} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.icones}>
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props}/>
                    ),

                }}/>

            <Tab.Screen name="TelaPerfilConfig" component={TelaPerfilConfig} options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.icones}>
                        <Icon name="cog" size={30} 
                            color={focused ? "#4fff85" : "#000000"}/>
                        <Text style={{fontFamily: 'FredokaRegular',fontSize: 12}}>
                            Opções
                        </Text>
                    </View>
                ),

            }}/> 

            <Tab.Screen name="TelaPerfilPerfil" component={TelaPerfilPerfil} options={{
                tabBarIcon: ({focused}) => (
                    <View style={styles.icones}>
                        <Icon name="user" size={30} 
                            color={focused ? "#4fff85" : "#000000"}/>
                        <Text style={{fontFamily: 'FredokaRegular',fontSize: 12}}>
                            Perfil
                        </Text>
                    </View>
                )

            }}/>

        </Tab.Navigator>        

        <StatusBar style="auto" />
        </>
    )

}

const styles = StyleSheet.create({
    botaoNavegador: {
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',

    },

    viewbotaoNavegador: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        backgroundColor: "#4fff85",
        alignItems:'center',
        justifyContent: 'center'

    },

    barraNavegador:{
        position: 'absolute',
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        bottom: 10,
        height: 70,
        elevation: 10,
        width: Dimensions.get('window').width-30,
        left: 15,
        
    },

    icones: {
        alignItems: 'center',
        marginTop: 10
    }
})