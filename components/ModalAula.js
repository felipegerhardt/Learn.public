import React, { useState, useContext } from 'react';
import {View, 
        TouchableOpacity,
        Text,
        StyleSheet,
        ActivityIndicator,
        FlatList,
        Dimensions
        } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import Icon from 'react-native-vector-icons/Feather.js';

import Modal from 'react-native-modal';

import { AuthContext } from "../context/auth";


export function ModalAulas () {
    
    const navigation = useNavigation();

    const { aula, setAula } = useContext(AuthContext);

    return(
        
        <Modal isVisible={aula} 
            onBackdropPress={() => setAula(false)}
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            style={{marginBottom: '100%'}}
            >

            <View style={{
                backgroundColor: 'white', 
                borderWidth: 1, 
                borderRadius: 20, 
                width: 380, 
                height: 170, 
                alignSelf: 'center',
                elevation: 30,
                marginBottom: '70%'
                }}>
                <Text style={{fontSize: 17, marginHorizontal: "3%", marginTop: "5%", fontFamily: 'sans-serif-light'}}>
                    Um aluno procura sua ajuda para a disciplina:
                </Text>

                <Text style={{fontSize: 17, marginHorizontal: "3%", marginTop: "4%", fontFamily: 'sans-serif-light', fontWeight: 'bold'}}>
                    Matemática
                </Text>

                <Text style={{fontSize: 17, marginHorizontal: "3%", marginTop: "4%", fontFamily: 'sans-serif-light'}}>
                    Na matéria de Trigonometria
                </Text>

                <View style={{flexDirection: 'row', alignSelf:'flex-end', marginTop: '2%', padding: 5, marginRight: '5%' }}>
                    
                    <TouchableOpacity onPress={( ) => setAula(false)}>
                        <Text style={{color: "#2b39ff", fontFamily:'sans-serif-light', fontWeight: 'bold', fontSize: 16, marginRight: '4%' }}>
                            Rejeitar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={( ) => navigation.navigate('TelaAula')}> 
                        <Text style={{color: "#2b39ff", fontFamily:'sans-serif-light', fontWeight: 'bold', fontSize: 16, marginRight: '4%'}}>
                            Entrar na sala
                        </Text>
                    </TouchableOpacity>

                </View>
            
            </View>




        </Modal>

    )

}

const styles = StyleSheet.create({

    containerFlatlist:{ 
        justifyContent: 'center', 
        alignContent: 'center',
        alignSelf: 'center',
        height: '100%', 
        width: '100%',
    },

    botoes: { 
        height: 40, 
        borderRadius: 15,
        backgroundColor: "#4fff85",
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        padding: 12,
        marginLeft: 6,
        marginRight: 6,
        elevation: 10,
    },

});