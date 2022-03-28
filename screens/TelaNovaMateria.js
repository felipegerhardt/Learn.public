import React, {useEffect, useState} from "react";
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
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

let ss = 0;
let mm = 0;
let hh = 0;
let timer = null;


export default function TelaNovaMateria({ navigation }){

    const [imgActive, setimgActive] = useState(-1);
    const [checkbox, isCheckbox] = useState(false);
    const [indicador, getIndicador] = useState(0);
    
    const Texto1 = "Uma pizzaria oferece, :"
    const Texto2 = "Pizza média (6 fatias): R$ 24,00"
    const Texto3 = "Pizza grande (8 fatias): R$ 32,00"
    const Texto4 = "U desperdício, iniciou-se um debate entre eles:"

    const questoes = [Texto1, Texto2, Texto3, Texto4, Texto1, Texto2, Texto3, Texto4, Texto3, Texto4]

    const R1 = 'AAAAAAAAAAAAAAAAAAAAAA '
    const R2 = 'BBBBB BBBBB BBBBB BBBBB BBBBB BBBBB' 
    const R3 = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC '
    const R4 = 'DDDDD'
    const R5 = 'EEEEE'

    const alter = [R1, R2, R3, R4, R5]

    function FuncaoIndicadores(quest) {
        
        return(
            
            <View style={{flexDirection: 'row',}}>

                {quest.map((questao, indexIndicadores) => {
                    return(

                        <View key={indexIndicadores} style={[indexIndicadores === indicador ? 
                                                                    styles.indicadorAtivo 
                                                                    : 
                                                                    styles.indicadorInativo,]}>                           

                        </View>
                    )

                })}
                
            </View>
        )
    };

    const createTwoButtonAlert = () => {

            Alert.alert(
                "Finalizar o teste",
                "Tem certeza que deseja finalizar?",
                [
                    {
                    text: "Voltar",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "Finalizar", onPress: () => navigation.navigate('TelaPerfilProgresso') }
                ]
            );

    };    

    onchange = (nativeEvent) => {


        const razao = (nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width).toFixed(3)
        const delta_ceil = Math.ceil(razao) - razao
        const delta_floor = razao - Math.floor(razao)

        if(delta_ceil>delta_floor){

            getIndicador(Math.floor(razao))

        }else{

            getIndicador(Math.ceil(razao))
        
        }

        if(nativeEvent) {

            const slide = Math.ceil(((nativeEvent.contentOffset.x)/nativeEvent.layoutMeasurement.width))
            
            if (slide != imgActive){
                setimgActive(slide);
            }
        }
    };

    const [tempo, setTempo] = useState("00:00:00");

    const isFocused = useIsFocused();

    useEffect(() => {

        {isFocused ? [clearInterval(timer), setTempo("00:00:00"), ss = 0, mm=0, hh=0] : [clearInterval(timer), setTempo("00:00:00"), ss = 0, mm=0, hh=0]}

        cronometro();

    }, [isFocused])

    function cronometro(){

        timer = setInterval(() => {
            ss++;

            if (ss == 60){
                ss = 0;
                mm++;
            }

            if (mm == 60){
                mm = 0;
                hh++
            }

            let format = 
            (hh < 10 ? '0' + hh : hh) + ':'
            + (mm < 10 ? '0' + mm : mm) + ':'
            + (ss < 10 ? '0' + ss : ss);

            setTempo(format);

        }, 1000)
        

    };

    return(
        <>
        <View style={styles.containerMaior}>

            <View style={styles.containerImagem}>

                <Image 
                    source={require("../assets/L-earn_icon3.png")}
                    style={styles.Imagem}/>
                
                <Text 
                    style={{alignSelf: 'center', 
                    width: 100, 
                    marginLeft: "15%", 
                    fontSize: 16}}> 
                
                    {tempo} 
                
                </Text>

            
            </View>

            <View style={styles.containerMenor}>

                {FuncaoIndicadores(questoes)}
                
                <SafeAreaView>
                    
                    <ScrollView>
                        
                        <SafeAreaView style={styles.containerSwiperHorizontal}>

                            <ScrollView 
                                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={WIDTH}
                                horizontal
                                contentContainerStyle={styles.scrollview}
                                > 

                                {questoes.map((questao, indexQuestoes) => {
                                    return(
                                        <View key ={indexQuestoes} style={styles.containerQuestao}>
                                            <Text key ={indexQuestoes} style={styles.textoQuestao}>
                                                {questao}
                                            </Text>

                                            <View style={styles.containerAlternativas}>

                                                {alter.map((opcao, indexAlternativas) => {
                                                    return(
                                                        <View key={indexAlternativas} style={styles.containerAlternativaIndividual}>
                                                            <CheckBox
                                                                value={checkbox}
                                                                onValueChange={isCheckbox}
                                                                iconStyle={{fill: 'white'}}
                                                                style={styles.checkboxEstilo}
                                                                />
                                                                
                                                                <Text key={indexAlternativas} style={{ color: 'black' }}>{opcao}</Text>
                                                        </View>
                                                    )
                                                })}


                                            </View>

                                        </View>
                                    )})
                                }
                            
                            </ScrollView>

                        </SafeAreaView>
                        
                        <View style={styles.containerBotao}>
                            <TouchableOpacity onPress={() => [navigation.navigate('TelaPerfil'), clearInterval(timer), setTempo("00:00:00")]}//navigation.goBack() } 
                                style={styles.botaoVoltar}>

                                <Text> Voltar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botaoTerminar} 
                                onPress={() => createTwoButtonAlert()}>
                                <Text> Terminar </Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>

                </SafeAreaView>

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
        justifyContent: 'center',
    
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

    containerSwiperHorizontal:{
    },

    scrollview: {
        alignItems: 'flex-start', 
        justifyContent: 'center',
        
    },

    containerQuestao: {
        borderWidth: 1, 
        width: WIDTH,
        justifyContent: 'flex-start',
        borderRadius: 25,
        padding: 15,
        backgroundColor: 'white',
    },

    textoQuestao:{
        color: 'black',
        marginTop: 10,
    },

    containerAlternativas:{
        marginTop: 10,
        marginLeft: -20,
        marginBottom: 20,
    },

    containerAlternativaIndividual:{
        width: "100%",
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    
    checkboxEstilo:{
        width: 40,
        marginLeft: 10,
    },

    indicadorAtivo:{
        borderRadius: 8, 
        width: 16, 
        height: 16, 
        marginTop: 10, 
        marginBottom: 10, 
        marginLeft: 14, 
        backgroundColor: 'green',
        borderWidth: 1,
        elevation: 10
    },

    indicadorInativo:{
        borderRadius: 8, 
        width: 16, 
        height: 16, 
        marginTop: 10, 
        marginBottom: 10, 
        marginLeft: 14, 
        backgroundColor: 'white',
        borderWidth: 1

    },

    containerBotao:{
        flexDirection: 'row',
        marginTop: 8,
        width: WIDTH, 
        height: HEIGHT*0.3, 
        padding: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',

    },

    botaoTerminar:{ 
        width: 100,
        height: 40,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginLeft: 30,
        backgroundColor: '#4fff85',

    },  
    
    botaoVoltar:{ 
        width: 100,
        height: 40,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginRight: 30,
        backgroundColor: '#4fff85',

    },

    cronometro:{
        flexDirection: "row",
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginLeft: 80,
    
    },

})