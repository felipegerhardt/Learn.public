import React, {useState} from "react";
import { 
    View , 
    Text , 
    StyleSheet,
    Pressable,
    Image,
    TouchableHighlight,
    SafeAreaView,
    } from "react-native";
import Modal from "react-native-modal";
import { StatusBar } from 'expo-status-bar';
import { Escolaridade } from "../components/Escolaridade";
import { Categoria } from "../components/Categoria";
import { SubCategoria } from "../components/SubCategoria";


export default function TelaPreNovaMateria({ navigation }){

    const [isModalVisibleEscolaridade, setisModalVisibleEscolaridade] = useState(false);
    const [isModalVisibleCategoria, setisModalVisibleCategoria] = useState(false);
    const [isModalVisibleSubCategoria, setisModalVisibleSubcategoria] = useState(false);
    const [chooseDataEscolaridade, setchooseDataEscolaridade] = useState('Selecione sua escolaridade');
    const [chooseDataCategoria, setchooseDataCategoria] = useState('Selecione a disciplina');
    const [chooseDataSubCategoria, setchooseDataSubCategoria] = useState('Selecione a matéria');
    
    const changeModalVisibilityEscolaridade = (bool) => {
        setisModalVisibleEscolaridade(bool)
    };

    const changeModalVisibilityCategoria = (bool) => {
        setisModalVisibleCategoria(bool)
    };

    const changeModalVisibilitySubCategoria = (bool) => {
        setisModalVisibleSubcategoria(bool)
    };

    const setEscolaridade = (option) => {
        setchooseDataEscolaridade(option)
    };
    
    const setCategoria = (option) => {
        setchooseDataCategoria(option)
    };

    const setSubCategoria = (option) => {
        setchooseDataSubCategoria(option)
    };

    return(
        <>
        <View style={styles.containerMaior}>


            <View style={styles.containerImagem}>

                <Image 
                    source={require("../assets/L-earn_icon3.png")}
                    style={styles.Imagem}/>

            </View>

            <View style={styles.containerMenor}>  

                <View style={styles.containerConteudo}>
                    
                    <View style={styles.linha}/>   

                    <Text style={styles.textos}>
                        Qual o grau de escolaridade da matéria?
                    </Text>

                    <SafeAreaView style={styles.containerSafeArea}>
                        <TouchableHighlight
                            onPress={() => changeModalVisibilityEscolaridade(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataEscolaridade}
                            </Text>
                        </TouchableHighlight>
                        
                        <Pressable style={{flex: 1 }}>
                            <Modal                        
                                transparent={true}
                                animationType='fade'
                                backdropColor="transparent"
                                visible={isModalVisibleEscolaridade}
                                nRequestClose={() => changeModalVisibilityEscolaridade(false)}>
                                
                                <Escolaridade
                                    changeModalVisibilityEscolaridade={changeModalVisibilityEscolaridade}
                                    setEscolaridade={setEscolaridade}/>
                            </Modal>
                        </Pressable>

                    </SafeAreaView>

                    <View style={styles.linha}/>   

                    <View
                        style={styles.linhas}
                    />

                    <Text style={styles.textos}>
                        Escolha a disciplina e matéria que você quer testar
                    </Text>

                    <SafeAreaView style={styles.containerSafeArea}>
                        <TouchableHighlight
                            onPress={() => changeModalVisibilityCategoria(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataCategoria}
                            </Text>
                        </TouchableHighlight>
                        
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleCategoria}
                            nRequestClose={() => changeModalVisibilityCategoria(false)}>
                            
                            <Categoria
                                changeModalVisibilityCategoria={changeModalVisibilityCategoria}
                                setCategoria={setCategoria}/>
                        </Modal>
                    </SafeAreaView>

                    <SafeAreaView style={styles.containerSafeArea}>
                        <TouchableHighlight
                            onPress={() => changeModalVisibilitySubCategoria(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataSubCategoria}
                            </Text>
                        </TouchableHighlight>
                        
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleSubCategoria}
                            nRequestClose={() => changeModalVisibilitySubCategoria(false)}>
                            
                            <SubCategoria
                                changeModalVisibilitySubCategoria={changeModalVisibilitySubCategoria}
                                setSubCategoria={setSubCategoria}/>
                        </Modal>
                    </SafeAreaView>

                    <View style={styles.linha}/>   

                    <View 
                        style={styles.containerBotoesInferiores}>

                        <TouchableHighlight 
                            style={styles.botaoVoltar} 
                            underlayColor="#FFFFFF">
                            <Text 
                                style={styles.textosVoltareTestar}>
                                Voltar
                            </Text>
                        </TouchableHighlight>

                        <TouchableHighlight 
                            style={styles.botaoTestar} 
                            underlayColor="#FFFFFF"
                            onPress={() => navigation.navigate('TelaNovaMateria')}>
                            <Text 
                                style={styles.textosVoltareTestar}>
                                Testar
                            </Text>
                        </TouchableHighlight>  

                    </View>  

                </View>

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
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-end",
    },

    containerImagem:{
        flexDirection: 'row', 
        width: "100%", 
    
    },

    Imagem:{
        width: 200,
        height: 50,
        resizeMode: 'cover',
    },

    containerMenor: {
        backgroundColor: "#c9ffdc",
        width: "100%",
        height: "90%",
        borderTopLeftRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
    },

    containerConteudo:{
        flex: 1,
        marginTop: 30,
        alignItems: 'center',

    },

    textos: {
        color: "#000000",
        width: "100%",
        fontSize:  15,
        fontFamily: "sans-serif-light",

    },

    containerSafeArea: {
        height: "8%",
        width: "100%",
        marginTop: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#41d66f",
    },

    botaoCategorias:{
        backgroundColor: 'white',
        alignContent: 'center',
    },

    textosBotaoCategoria: {
        marginVertical: 12,
        marginHorizontal: 20, 
        fontSize: 15,
        color: "#000000",
    },

    containerBotoesInferiores:{
        width: "100%",
        height: "10%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity: 1,
        marginTop: "35%"
        },

    botaoVoltar: {
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "#FFFFFF",
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        margin: 15,
        marginBottom: -3,
        borderColor: "#000000",
    },

    textosVoltareTestar:{
        color:"#000000",
        fontSize: 14,
        justifyContent:"flex-start",
    },

    botaoTestar:{
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "#4fff85",
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        margin: 15,
        marginBottom: -3,
        borderColor: "#000000",
    },

    linha: {
        borderBottomWidth: 0.5,
        borderColor: 'black',
        width: 320,
        marginVertical: 20
    },

})