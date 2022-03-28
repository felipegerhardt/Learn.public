import React, {useEffect, useContext, useState} from "react";
import { 
    View , 
    Text , 
    StyleSheet,
    Image,
    ScrollView,
    CheckBox,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Alert
    } from "react-native";

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
    } from 'react-native-webrtc';

import { StatusBar } from 'expo-status-bar';

import { AuthContext } from "../context/auth";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function TelaAula({ navigation }){

    const { setAula } = useContext(AuthContext);

    useEffect(( ) => {

        setAula(false)

    }, [])

    const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    const pc = new RTCPeerConnection(configuration);

    let isFront = true;
    
    mediaDevices.enumerateDevices().then(sourceInfos => {
    console.log(sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
        videoSourceId = sourceInfo.deviceId;
        }
    }
    mediaDevices.getUserMedia({
        audio: true,
        video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: (isFront ? "user" : "environment"),
        deviceId: videoSourceId
        }
    })
    .then(stream => {
        // Got stream!
    })
    .catch(error => {
        // Log error
    });
    });

    return(
        <>
        <View style={styles.containerMaior}>

            <View style={styles.containerImagem}>

                <Image 
                    source={require("../assets/L-earn_icon3.png")}
                    style={styles.Imagem}/>

                <TouchableOpacity style={{width: 100, height: 100}} onPress={()=>navigation.navigate('TelaPerfil')}>
                    <Text>
                        Voltar
                    </Text>
                </TouchableOpacity>
                
            
            </View>


        </View>

        <StatusBar style="auto" />   
        </>
    )
}


const styles = StyleSheet.create({

    containerMaior:{

        width: "100%", 
        height: "100%", 
        backgroundColor: "white",
        justifyContent: "flex-start",
    },

    containerImagem:{

        width: "100%", 
        justifyContent: 'center',
        marginTop: '10%'
    
    },

    Imagem:{

        width: 200,
        height: 50,
        resizeMode: 'cover',
    },



})