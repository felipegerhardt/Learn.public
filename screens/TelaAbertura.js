import React, {useState, useContext} from "react";
import { 
    View , 
    Image , 
    Text , 
    TouchableOpacity, 
    TextInput,
    Keyboard,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Dimensions
    } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../context/auth';

const HEIGHT = Dimensions.get('window').height;

export default function TelaAbertura({ navigation }){

    const { logarFirebase, loading, loadingAuth, redefinirSenha } = useContext(AuthContext);

    function SwitchState() {
        setForm(!form)
    };
    
    const [form, setForm] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");


    return(
        <View style={styles.containerMaior}>
            { loading ? 
            <ActivityIndicator style={{height: '5%', marginTop: '9%'}} size="large" color="#4fff85"/> : 
            <View style={{height: "5%", marginTop: '9%'}} />    }

            <View style={styles.containerImagem}>
                <Image 
                    source={require("../assets/L-earn_icon3.png")}
                    style={styles.imagem}/>
            </View>

            <View style={styles.containerMenor}>

            {form == false ?

                <><View style={styles.containerFormFalso}>

                    <Text 
                        style={{fontSize: 20, paddingBottom: "8%", marginTop: "10%", fontFamily: "sans-serif-light", }}>
                        Bem vindo
                    </Text>
                    <Text 
                        style={{fontSize: 16, fontFamily: "sans-serif-light"}}>
                        Você já tem cadastro?
                    </Text>

                </View>
                <View style={styles.containerBotoes}>

                        <TouchableOpacity 
                            style={styles.botaoNaoTenho} 
                                onPress={() => navigation.navigate('TelaCadastro')}>
                            <Text style={{
                                color:"black",
                                fontSize: 14,
                                justifyContent:"flex-start",
                                fontFamily: "sans-serif-light"}}>
                                Não tenho
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                                        style={styles.entreaqui} 
                                            onPress={SwitchState}>
                            <Text style={styles.textoBotao}>
                                Entre aqui
                            </Text>
                        </TouchableOpacity>

                    </View></>
            :
                <Pressable 
                    style={styles.pressable}
                    onPress={Keyboard.dismiss}>
                    
                    <Text style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "sans-serif-light",
                        marginBottom: "7%",
                        marginLeft: "-21%",
                    }}>
                        Tá de volta? Faça ao login
                    </Text>

                    <TextInput
                        style={styles.inputTexto}
                        onChangeText={text => setUsuario(text)}
                        placeholder="Usuário"/>

                    <TextInput
                        style={styles.inputTexto}
                        onChangeText={text => setSenha(text)}
                        secureTextEntry={true}
                        placeholder="Senha"
                        keyboardType='default'/>
                    
                    <View style={{
                        width: "100%",
                        height: "7%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            marginLeft: "-12%",
                            //marginTop: "5%",
                            color: "black",
                            fontFamily: "sans-serif-light",
                        }}>
                            Esqueceu a senha né..
                        </Text>
                        <Text onPress={() => redefinirSenha(usuario)} 
                            style={{
                                color: "#0000FF",
                                marginLeft: 5,
                                fontFamily: "sans-serif-light",
                                //marginTop: "5%",
                        }}>
                            Clique aqui
                        </Text>

                    </View>
                    
                    <View style={{
                            width: "100%",
                            height: "35%",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            opacity: 1,
                            marginTop: 10,
                        }}>
                            
                        <TouchableOpacity 
                            style={{
                                borderRadius: 10,
                                alignItems: "center",
                                width: "40%",
                                backgroundColor: "#FFFFFF",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderWidth: 1,
                                margin: 15,
                                marginBottom: 25,
                                borderColor: "#000000",
                            }} 
                            onPress={SwitchState}>
                            <Text style={{
                                color:"black",
                                fontSize: 14,
                                justifyContent:"flex-start",
                                fontFamily: "sans-serif-light"}}>
                               Voltar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={{
                                borderRadius: 10,
                                alignItems: "center",
                                width: "40%",
                                backgroundColor: "#4fff85",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderWidth: 1,
                                margin: 15,
                                marginBottom: 25,
                                borderColor: "#000000",
                            }} 
                            onPress={() => logarFirebase(usuario.trim(), senha, navigation)}>
                            <Text style={{
                                color:"black",
                                fontSize: 14,
                                justifyContent:"flex-start",
                                fontFamily: "sans-serif-light"}}>
                               Entrar
                            </Text>
                        </TouchableOpacity>
                        
                    </View>

                </Pressable>

            }
                </View>
            <StatusBar style="auto" />
        </View>
    );

}


const styles = StyleSheet.create({

    containerMaior: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent:"flex-start",
        width: "100%"
    },

    containerImagem:{
        width: "100%",
        height: "10%",
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },

    imagem:{
        width: "90%",
        height: "100%",
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'cover',
    },

    containerMenor:{
        height: "100%",
        width: "100%",
        backgroundColor: "#c9ffdc",
        marginTop: "10%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1
    },

    containerFormFalso:{
        flex: 0.15,
        opacity: 1,
        marginTop: 3,
        alignItems: "center",
        justifyContent:"flex-start",
        paddingTop: 10,
        width: "100%",
    },

    containerBotoes:{
        justifyContent:"center",
        alignItems: "center",
        opacity: 1,
        width: "100%",
        flex: 0.4,
        },

    botaoNaoTenho:{
        borderRadius: 10,
        alignItems: "center",
        width: "50%",
        backgroundColor: "#4fff85",
        paddingTop: 14,
        paddingBottom: 14,
        borderWidth: 1,
        borderColor: "#000000",

        },


    textoBotao:{
        color:"black",
        fontSize: 14,
        justifyContent:"flex-start",
        fontFamily: "sans-serif-light",

    },

    pressable:{
        width: "100%",
        height: "85%",
        alignItems: "center",
        justifyContent: "center",
    },


    entreaqui: {
        borderRadius: 10,
        alignItems: "center",
        width: "50%",
        backgroundColor: "#FFFFFF",
        paddingTop: 14,
        paddingBottom: 14,
        borderWidth: 1,
        marginTop: 30,
        borderColor: "#000000"
        },
        
    inputTexto:{
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        height: 50,
        margin: 12,
        width: "70%",
        textAlign: "center",
        borderColor: "#000000",
        borderWidth: 1,
    }
        



})