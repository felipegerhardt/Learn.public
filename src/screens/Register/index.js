import React, { useState, useContext } from "react";
import { 
    View , 
    Image , 
    Text , 
    TextInput,
    CheckBox,
    ToastAndroid,
    SafeAreaView,
    Pressable, 
    TouchableHighlight,
    StyleSheet,
    ActivityIndicator,
    Keyboard} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Schooling } from "../../components/Schooling";
import { Category } from "../../components/Category";
import { SubCategory } from "../../components/SubCategory";
import { ButtonGroup } from "../../components/ButtonsModality";
import Modal from "react-native-modal";

// Essa função tem que ser só importada para ser executada
import app from '../../components/firebaseConnection';

import { AuthContext } from "../../context/auth";

export default function Register({ navigation }){

    const { cadastrarUsuarioFirestore, categoria, uid, cadastrarFirebase, loading, form, setForm, SwitchState} = useContext(AuthContext);

    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [senhaConf, setSenhaConf] = useState(null);

    // (TO-DO) Gatilho para modal dos Termos e condições
    const [termos, setTermos] = useState(false); 
        
    const [checkbox, isCheckbox] = useState(false);
    const [isModalVisibleSchooling, setisModalVisibleSchooling] = useState(false);
    const [isModalVisibleDisciplina, setisModalVisibleDisciplina] = useState(false);
    const [isModalVisibleMateria, setisModalVisibleMateria] = useState(false);
    const [chooseDataSchooling, setchooseDataSchooling] = useState('Selecione sua escolaridade');
    const [chooseDataDisciplina, setchooseDataDisciplina] = useState('Selecione a disciplina');
    const [chooseDataMateria, setchooseDataMateria] = useState('Selecione a matéria');

    const changeModalVisibilitySchooling = (bool) => {
        setisModalVisibleSchooling(bool)
    };

    const changeModalVisibilityDisciplina = (bool) => {
        setisModalVisibleDisciplina(bool)
    };

    const changeModalVisibilityMateria = (bool) => {
        setisModalVisibleMateria(bool)
    };

    const setSchooling = (option) => {
        setchooseDataSchooling(option)
    };
    
    const setDisciplina = (option) => {
        setchooseDataDisciplina(option)
    };

    const setMateria = (option) => {
        setchooseDataMateria(option)
    };

    return(

        <Pressable style={{flex: 1,}} onPress={Keyboard.dismiss}>
            
            <View style={styles.containerMaior}>


                { loading ? 
                <ActivityIndicator style={{height: '5%', marginTop: '7%'}} size="large" color="#4fff85"/> : 
                <View style={{height: "5%", marginTop: '7%'}} /> }

                <View style={styles.containerImagem}>
                    <Image 
                    source={require("../../assets/L-earn_icon3.png")}
                    style={styles.imagem}    />
                </View>
                
                <View style={styles.containerMenor}>

                    {form == false ?
                    
                    <>
                    <View style={styles.containerInputETexto}>               

                        <Text style={styles.textos}>
                            Se cadastre, é facinho..
                        </Text>

                        <View style={styles.containerInput}>

                            <TextInput
                                style={styles.inputTexto}
                                onChangeText={setNome}
                                placeholder="Nome"
                                />

                            <TextInput
                                style={styles.inputTexto}
                                onChangeText={setEmail}
                                placeholder="E-mail"
                                keyboardType="email-address"/>

                            <TextInput
                                style={styles.inputTexto}
                                onChangeText={setSenha}
                                placeholder="Senha"
                                secureTextEntry={true}
                                keyboardType='default'/>

                            <TextInput
                                style={styles.inputTexto}
                                onChangeText={setSenhaConf}
                                placeholder="Repita a senha"
                                secureTextEntry={true}
                                keyboardType='default'/>
                                                        
                        </View>

                        <View style={styles.containerCheckbox}>
                            <CheckBox
                                value={checkbox}
                                onValueChange={isCheckbox}
                                iconStyle={{fill: 'white'}}
                                style={{width: "13%", marginLeft: "3%"}}
                                />
                            
                            <Text style={{fontFamily: "sans-serif-light",}}>
                                Eu aceito os 
                            </Text>
                            <Text onPress={() => [setTermos(true), ToastAndroid.show("Aqui abre uma pop up com os termos", ToastAndroid.SHORT)]} 
                                style={{color: "#0d23ca", marginLeft: "1.5%", fontFamily: "sans-serif-light"}}>
                                termos e condições
                            </Text>
                        </View>
                                
                        <View style={styles.containerBotoes1}>
                        
                            <TouchableHighlight 
                                style={styles.botaoBranco} 
                                underlayColor="white"
                                onPress={() => navigation.navigate('Opening')}>
                                <Text style={styles.textoBotao}>
                                    Voltar
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight 
                                style={styles.botaoVerde} 
                                underlayColor="white"
                                onPress={() => cadastrarFirebase(nome.trim(), email.trim(), senha, senhaConf)}>
                                <Text style={styles.textoBotao}>
                                    Continuar
                                </Text>
                            </TouchableHighlight>
                    
                        </View>

                    </View>
                    
                    </>

                    :

                    <>
                    <View style={styles.container2Tela}>
                        
                        <Text style={styles.textos2aTela}>
                                Você procura ser aluno ou tutor?
                        </Text>

                        <View style={styles.separador}/>
                            
                        <ButtonGroup modalities={['Aluno', 'Tutor', 'Não sei']}/>

                        <View style={styles.separador}/>

                        <Text style={styles.textos2aTela}>
                            O que você cursa ou já cursou?
                        </Text>

                        <SafeAreaView style={styles.safearea}>

                            <TouchableHighlight
                                onPress={() => changeModalVisibilitySchooling(true)} 
                                underlayColor="white"
                                style={styles.botaoSafearea}>
                                <Text style={styles.textoBotaoSafearea}>
                                    {chooseDataSchooling}
                                </Text>
                            </TouchableHighlight>
                            
                            <Pressable style={{flex: 1}}>
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

                        <View style={styles.separador}/>

                        <Text style={styles.textos2aTela}>
                            Escolha a categoria que você quer testar
                        </Text>

                        <SafeAreaView style={styles.safearea}>
                            <TouchableHighlight
                                onPress={() => changeModalVisibilityDisciplina(true)} 
                                underlayColor="white"
                                style={styles.botaoSafearea}>
                                <Text style={styles.textoBotaoSafearea}>
                                    {chooseDataDisciplina}
                                </Text>
                            </TouchableHighlight>
                            
                            <Modal
                                transparent={true}
                                animationType='fade'
                                visible={isModalVisibleDisciplina}
                                nRequestClose={() => changeModalVisibilityDisciplina(false)}>
                                
                                <Category
                                    changeModalVisibilityCategory={changeModalVisibilityDisciplina}
                                    setCategory={setDisciplina}/>
                            </Modal>
                        </SafeAreaView>

                        <SafeAreaView style={styles.safearea}>
                            <TouchableHighlight
                                onPress={() => changeModalVisibilityMateria(true)} 
                                underlayColor="white"
                                style={styles.botaoSafearea}>
                                <Text style={styles.textoBotaoSafearea}>
                                    {chooseDataMateria}
                                </Text>
                            </TouchableHighlight>
                            
                            <Modal
                                transparent={true}
                                animationType='fade'
                                visible={isModalVisibleMateria}
                                nRequestClose={() => changeModalVisibilityMateria(false)}>
                                
                                <SubCategory
                                    changeModalVisibilitySubCategory={changeModalVisibilityMateria}
                                    setSubCategory={setMateria}/>
                            </Modal>
                        </SafeAreaView>


                        <View style={styles.containerBotoes2}>

                            <TouchableHighlight 
                                style={styles.botaoVerde2} 
                                underlayColor="white"
                                onPress={SwitchState}>
                                <Text 
                                    style={styles.textoBotao}>
                                    Voltar
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight 
                                style={styles.botaoBranco2} 
                                underlayColor="white"
                                onPress={() => [ cadastrarUsuarioFirestore(nome.trim(), uid, email.trim(),  categoria,
                                                chooseDataSchooling, chooseDataDisciplina,  chooseDataMateria),
                                                navigation.navigate('Home'), 
                                                setForm(false)] }>
                                <Text 
                                    style={styles.textoBotao}>
                                    Cadastrar
                                </Text>
                            </TouchableHighlight>  
                        </View>       
                    </View>
                        
                    </>

                    }

                

                </View>

                <StatusBar style="auto" />
            </View>
        
        </Pressable>
    );
}


const styles = StyleSheet.create({
    containerMaior:{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent:"flex-start",
        width: "100%",
    },

    containerImagem:{
        width: "100%",
        height: "10%",
        justifyContent: 'center',
        alignContent: 'center',
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
        alignItems: 'center',
        marginTop: "10%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderWidth: 1,

    },

    containerInputETexto:{
        width: "100%",
        height: '72%',
        marginVertical: '5%'
    },

    textos:{
        color: 'black',
        fontSize: 15,
        fontFamily: "sans-serif-light",
        marginHorizontal: '17%',
        marginTop: '5%'
        },

    containerInput:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        },
    
    inputTexto:{
        borderRadius: 15,
        backgroundColor: "white",
        height: 50,
        margin: "4%",
        width: "70%",
        textAlign: "center",
        borderColor: "black",
        borderWidth: 1,
    },

    containerCheckbox:{
        flexDirection: "row",
        height: "5%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginHorizontal: "7.5%",
    },

    containerBotoes1:{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginVertical: '10%',
    },

    botaoBranco:{
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "white",
        paddingVertical: "3%",
        borderWidth: 1,
        margin: "3%",
        borderColor: "#000000",
    },

    botaoVerde: {
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "#4fff85",
        paddingVertical: "3%",
        borderWidth: 1,
        margin: "3%",
        borderColor: "black",
    },

    textoBotao:{
        color:"black",
        fontSize: 14,
        justifyContent:"flex-start",
        fontFamily: "sans-serif-light"
    },

    textos2aTela:{
        color: "#000000",
        justifyContent: "flex-start",
        width: "100%",
        marginLeft: "21%",
        fontSize:  15,
        fontFamily: "sans-serif-light",
    },

    separador:{
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        alignContent: "center",
        width: "80%",
    },

    safearea:{
        height: "10%",
        width: "80%",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#41d66f",
    },

    botaoSafearea:{
        backgroundColor: 'white',
        alignContent: 'center',
        width: "100%",
        alignItems:'center',
        borderRadius: 15
    },

    textoBotaoSafearea:{
        marginVertical: 20,
        fontSize: 15,
        color: "black",
    },

    containerBotoes2:{
        width: "100%",
        height: "10%",
        marginBottom: "5.8%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    },

    botaoVerde2:{
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        margin: "3%",
        borderColor: "black",
    },

    botaoBranco2:{
        borderRadius: 10,
        alignItems: "center",
        width: "40%",
        backgroundColor: "#4fff85",
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        margin: 15,
        borderColor: "black",
    },

    container2Tela:{
        height: "75%",
        width: "100%",
        alignItems: 'center',
        marginTop: "10%",
        justifyContent: 'space-around',
        
    },
})

