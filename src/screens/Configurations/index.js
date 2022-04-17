import React, { useState, useContext } from "react";
import { 
    View , 
    Text , 
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Modal,
    Switch
    } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather.js';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome.js'
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../context/auth";

export default function Configurations(){

    const navigation = useNavigation();

    const { dados, Logout } = useContext(AuthContext);

    let pref_notificacoes = dados.notificacoes;
    let pref_seguranca = dados.seguranca;    

    const [opcoes, setOpcoes] = useState([
        {
            id: 1,
            icon: 'credit-card',
            text: 'Meus cartões',
        },
        {
            id: 2,
            icon: 'bell',
            text: 'Notificações',
        },
        {
            id: 3,
            icon: 'shield',
            text: 'Segurança e privacidade',
        },
        {
            id: 4,
            icon: 'log-out',
            text: 'Encerrar sessão',
        },

    ]);

    const [modalVisible, setModalVisible] = useState(false);
    
    const [modalType, setModalType] = useState("");
    
    const [notificacoes, setNotificacoes] = useState([
        {
            id: 1,
            text: 'Mostrar notificações',
            switch: pref_notificacoes.mostrar_notificacoes,
        },
        {
            id: 2,
            text: 'Solicitações de aula',
            switch: pref_notificacoes.solicitacoes_de_aula,
        },
        {
            id: 3,
            text: 'Novos posts',
            switch: pref_notificacoes.novos_posts,
        },
        {
            id: 4,
            text: 'Mostrar indicador no ícone dos apps',
            switch: pref_notificacoes.mostrar_indicador_no_icone_dos_apps,
        },
        {
            id: 5,
            text: 'Notificações flutuantes',
            switch: pref_notificacoes.notificacoes_flutuantes,
        },
        {
            id: 6,
            text: 'Notificações na Tela de bloqueio',
            switch: pref_notificacoes.notificacoes_na_tela_de_bloqueio,
        },
        {
            id: 7,
            text: 'Permitir som',
            switch: pref_notificacoes.permitir_som,
        },
        {
            id: 8,
            text: 'Permitir vibração',
            switch: pref_notificacoes.permitir_vibracao,
        },
        {
            id: 9,
            text: 'Atualizações de conta',
            switch: pref_notificacoes.atualizacoes_da_conta,
        },

    ]); 
    
    const [segurança, setSegurança] = useState([
        {
            id: 1,
            text: 'Verificação em duas etapas',
            switch: false,
        },
        {
            id: 2,
            text: 'Permitir que alunos entrem em contato',
            switch: false,
        },
        {
            id: 3,
            text: 'Verificação em duas etapas',
            switch: false,
        },
        {
            id: 4,
            text: 'Verificação em duas etapas',
            switch: false,
        },
    ])
    
    const toggleSwitchNot = (item, index) => [setNotificacoes(notificacoes => (
                                        [...notificacoes]),
                                        notificacoes[index].switch = !notificacoes[index].switch)
                                        ];

    const toggleSwitch = (item, index) => [setSegurança(segurança => (
                                        [...segurança]),
                                        segurança[index].switch = !segurança[index].switch)
                                        ];

    function ModalOptions(modalType){

        const [cartoes, setCartoes] = useState([
            {
                id: 1,
                nome: 'Mastercard - Crédito',
                icon: 'cc-mastercard',
                numero: '**** **** **** 5782',
            },
            {
                id: 2,
                nome: 'Visa - Débito', 
                icon: 'cc-visa',
                numero: "**** **** **** 8571",
            }
        ])

        const ModalCartoes = () => {

            return(
                <>
                <FlatList 
                    style={styles.containerListaMaior}
                    contentContainerStyle={{marginHorizontal: 10,}}
                    data={cartoes}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item })  =>  <View style={styles.containerListaMenor}>
                                                    
                                                    <IconFontAwesome name={item.icon} size={25} style={styles.icone}/>

                                                    <View style={{width: "70%", height: '100%'}}>
                                                        <TouchableOpacity onPress={() => [console.log(item.nome)]} style={styles.botaoLista}>
                                                            
                                                            <Text style={styles.text}> {item.nome} </Text>
                                                            <Text style={{fontSize: 14, color: 'grey', marginLeft: 20}}> {item.numero} </Text>

                                                        </TouchableOpacity>
                                                    </View>  

                                                    <Icon name='edit' size={25} style={{justifyContent: 'center'}}/>
                                                                
                                                </View>
                                }
                />

                <TouchableOpacity style={styles.botaoAdicionarCartao} onPress={() => console.log('Adicionar Cartão')}>
                    <View style={{flexDirection: 'row', width: "100%", height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name='plus' size={30} style={{marginRight: "20%"}}/>
                        <Text style={{fontFamily: 'FredokaRegular', fontSize: 16, marginRight: "20%",}}>
                            Adicionar cartão
                        </Text>
                    </View>
                </TouchableOpacity>

                </>
            )
        }
    
        const ModalNotificacoes = () => {

            return(
                
                <FlatList 
                    style={styles.containerListaMaior}
                    contentContainerStyle={{marginHorizontal: 10,}}
                    data={notificacoes}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    renderItem={( item )  =>  <View style={styles.containerListaMenor}>
                                                    <TouchableOpacity onPress={() => [toggleSwitchNot(item, item.index)]} style={{width: "70%", height: '100%'}}>
                                                        <View style={styles.botaoLista}>
                                                            
                                                            <Text style={styles.text}> {item.item.text} </Text>

                                                        </View>
                                                    </TouchableOpacity>  

                                                    <Switch 
                                                        trackColor={{ false: "#767577", true: "#cccacf" }}
                                                        thumbColor={item.item.switch ? "#41d66f" : "#ffffff"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => toggleSwitchNot(item, item.index)}
                                                        value={item.item.switch}/>
                                                                
                                                </View>
                                }
                            />


            )
        }
    
        const ModalSeguranca = () => {
    
            return(

                <FlatList 
                    style={styles.containerListaMaior}
                    contentContainerStyle={{marginHorizontal: 10,}}
                    data={segurança}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    renderItem={( item )  =>  <View style={styles.containerListaMenor}>
                                                    <TouchableOpacity onPress={() => [toggleSwitch(item, item.index)]} style={{width: "70%", height: '100%'}}>
                                                        <View style={styles.botaoLista}>
                                                            
                                                            <Text style={styles.text}> {item.item.text} </Text>

                                                        </View>
                                                    </TouchableOpacity>  

                                                    <Switch 
                                                        trackColor={{ false: "#767577", true: "#cccacf" }}
                                                        thumbColor={item.item.switch ? "#41d66f" : "#ffffff"}
                                                        ios_backgroundColor="#3e3e3e"
                                                        onValueChange={() => toggleSwitch(item, item.index)}
                                                        value={item.item.switch}/>
                                                                
                                                </View>
                                }
                            />
            )
        }
        

        if(modalType==='Meus cartões'){

            return(ModalCartoes())

        }else{
            
            if(modalType==='Notificações'){

                return(ModalNotificacoes())

            }else{

                if(modalType==='Segurança e privacidade'){
                    return(ModalSeguranca())

                }else{

                    if(modalType===''){

                        null

                    }else{
                
                        console.log("Encerrar sessão")

                    }
                }
            }
        }
    };


    return(

        <>
        <View style={styles.containerMaior}>
            
            <View style={styles.containerImagem}>

                <Image
                    source={require("../../assets/L-earn_icon3.png")}
                    style={styles.Imagem} />

            </View>


            <View style={styles.containerMenor}>

                <Modal  
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible); 
                                           setModalType('')}}
                >
                    <View style={styles.modal}>

                        {ModalOptions(modalType)}

                    </View>

                </Modal>

                <FlatList 
                    style={styles.containerListaMaior}
                    contentContainerStyle={{marginHorizontal: 10,}}
                    data={opcoes}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item })  =>  <View style={styles.containerListaMenor}>
                                                    <Icon name={item.icon} size={25} style={styles.icone}/>
                                                    <TouchableOpacity onPress={() => [item.text === "Encerrar sessão" ?  Logout(navigation) : 
                                                                                    [setModalType(item.text), 
                                                                                    setModalVisible(!modalVisible)],
                                                                                    ]} style={styles.botaoLista}>
                                                        <Text style={styles.text}> {item.text} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                }
                />

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

    containerListaMaior:{
        marginTop: 50,
        width: "100%"

    },

    containerListaMenor:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        marginVertical: 15,
        marginHorizontal: 10,
        height: 70,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white'

    },

    icone:{
        marginLeft: 20,

    },

    text:{
        marginLeft: 20,
        fontSize: 14,
        textAlign: 'left',
        fontFamily: 'FredokaRegular'

    },

    botaoLista:{
        width: "100%", 
        height: '100%', 
        justifyContent: 'center',
    
    },

    modal:{
        
        backgroundColor: '#c9ffdc',
        width: "100%",
        height: "94%",
        borderTopLeftRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        marginTop: "14%",

    },

    botaoAdicionarCartao:{
        backgroundColor: '#4fff85', 
        width: "70%", 
        height: "8%", 
        borderWidth: 1, 
        borderRadius: 15, 
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    
    },

})