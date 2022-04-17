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
import { Schooling } from "../../components/Schooling";
import { Category } from "../../components/Category";
import { SubCategory } from "../../components/SubCategory";


export default function PreNewsubject({ navigation }){

    const [isModalVisibleSchooling, setisModalVisibleSchooling] = useState(false);
    const [isModalVisibleCategory, setisModalVisibleCategory] = useState(false);
    const [isModalVisibleSubCategory, setisModalVisibleSubCategory] = useState(false);
    const [chooseDataSchooling, setchooseDataSchooling] = useState('Selecione sua escolaridade');
    const [chooseDataCategory, setchooseDataCategory] = useState('Selecione a disciplina');
    const [chooseDataSubCategory, setchooseDataSubCategory] = useState('Selecione a matéria');
    
    const changeModalVisibilitySchooling = (bool) => {
        setisModalVisibleSchooling(bool)
    };

    const changeModalVisibilityCategory = (bool) => {
        setisModalVisibleCategory(bool)
    };

    const changeModalVisibilitySubCategory = (bool) => {
        setisModalVisibleSubCategory(bool)
    };

    const setSchooling = (option) => {
        setchooseDataSchooling(option)
    };
    
    const setCategory = (option) => {
        setchooseDataCategory(option)
    };

    const setSubCategory = (option) => {
        setchooseDataSubCategory(option)
    };

    return(
        <>
        <View style={styles.containerMaior}>


            <View style={styles.containerImagem}>

                <Image 
                    source={require("../../assets/L-earn_icon3.png")}
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
                            onPress={() => changeModalVisibilitySchooling(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataSchooling}
                            </Text>
                        </TouchableHighlight>
                        
                        <Pressable style={{flex: 1 }}>
                            <Modal                        
                                transparent={true}
                                animationType='fade'
                                backdropColor="transparent"
                                visible={isModalVisibleSchooling}
                                nRequestClose={() => changeModalVisibilitySchooling(false)}>
                                
                                <Schooling
                                    changeModalVisibilitySchooling={changeModalVisibilitySchooling}
                                    setSchooling={setSchooling}/>
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
                            onPress={() => changeModalVisibilityCategory(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataCategory}
                            </Text>
                        </TouchableHighlight>
                        
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleCategory}
                            nRequestClose={() => changeModalVisibilityCategory(false)}>
                            
                            <Category
                                changeModalVisibilityCategory={changeModalVisibilityCategory}
                                setCategory={setCategory}/>
                        </Modal>
                    </SafeAreaView>

                    <SafeAreaView style={styles.containerSafeArea}>
                        <TouchableHighlight
                            onPress={() => changeModalVisibilitySubCategory(true)} 
                            underlayColor="#FFFFFF"
                            style={styles.botaoCategorias}>
                            <Text style={styles.textosBotaoCategoria}>
                                {chooseDataSubCategory}
                            </Text>
                        </TouchableHighlight>
                        
                        <Modal
                            transparent={true}
                            animationType='fade'
                            visible={isModalVisibleSubCategory}
                            nRequestClose={() => changeModalVisibilitySubCategory(false)}>
                            
                            <SubCategory
                                changeModalVisibilitySubCategory={changeModalVisibilitySubCategory}
                                setSubCategory={setSubCategory}/>
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
                            onPress={() => navigation.navigate('Newsubject')}>
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