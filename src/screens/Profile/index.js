import React, { useState, useRef, useContext, useEffect } from "react";
import { 
    View , 
    Text , 
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    TextInput,
    FlatList,
    ActivityIndicator
    } from "react-native";
import { StatusBar } from 'expo-status-bar';

// Bibliotecas para criação do gráfico
import { 
    VictoryPolarAxis, 
    VictoryChart, 
    VictoryTheme, 
    VictoryLabel, 
    VictoryArea, 
    VictoryGroup,
    VictoryZoomContainer} from "victory-native";

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import { Rating } from 'react-native-elements';

import { ModalRequest } from "../../components/ModalRequest";

import Modal from 'react-native-modal';

import { AuthContext } from "../../context/auth";


const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export default function Profile({ navigation }){

    const { setAula, dados} = useContext(AuthContext);

    const [modalNome, setModalNome] = useState(false);
    const [nome, setNome] = useState(dados.basicos.nome);
    const [materia, setMateria] = useState(null);
    const [escolha, setEscolha] = useState('Todas as matérias');
    // Variável para armazenar matérias testadas
    const [materiasTestadas, setMateriasTestadas] = useState([]);

    useEffect(() => {

        function AgruparDisciplinas (){

            if (!!dados.tags.avancadas){

                console.log(!!dados.tags.tags_avancadas)
                
                setMateria(false)

                return
            };
        
            let disciplinas_agrupadas = [
                ...Object.keys(dados.tags.avancadas),
                ...Object.keys(dados.tags.basicas),
                ...Object.keys(dados.tags.intermediarias)
            ];
            
    
            let materias_agrupadas = [
                ...Object.entries(dados.tags.avancadas),
                ...Object.entries(dados.tags.basicas),
                ...Object.entries(dados.tags.intermediarias)
            ];

            disciplinas_agrupadas = disciplinas_agrupadas.filter((x, i, a) => a.indexOf(x) == i);

            let dict = {};
    
            for ( let i = 0; i <= disciplinas_agrupadas.length-1; i++ ){
                
                let disciplina = {};

                for ( let j = 0; j <= materias_agrupadas.length-1; j++ ){
    
                    if (materias_agrupadas[j][0] === disciplinas_agrupadas[i]){
                        
                        let materia = Object.keys(materias_agrupadas[j][1]);

                        for ( let k = 0; k <= materia.length-1; k++){


                            disciplina[materia[k]] = materias_agrupadas[j][1][materia[k]] //dados.tags.notas[materias_agrupadas[j][1]];

                        };
    
                    };
                }
    
                dict[disciplinas_agrupadas[i]] = disciplina

            };

            setMateria(dict);
            
            AgruparNotas(dict);
        };

        function AgruparNotas (array_notas){
            let notas = [];
            let dict = {};
            let arr = Object.keys(array_notas);
            for (let i = 0; i <= arr.length-1; i++ ){
                dict[arr[i]] = (Object.values(array_notas[arr[i]]).reduce((a, b) => a + b)/Object.values(array_notas[arr[i]]).length).toFixed(1);
            };
            notas = [dict];
            setMateriasTestadas(notas);
        };

        AgruparDisciplinas();

    },[])

    let materias_arr = [];
    let alturaTags = 0;


    if (!!materia){
        materias_arr = Object.keys(materia);
        alturaTags = Math.floor(materias_arr.length/3);
    };
    
    const inputRef = useRef(null);

    const rating = "4.6"

    // Variável para armazenar as matérias com disciplinas avançadas
    let materiasAvancadas = [];

    if (!!dados.tags.avancadas){
        materiasAvancadas = Object.keys(dados.tags.avancadas);
    };

    // Função para criar um laço e passar por todas as Tags do usuário
    function FlatListLoop(){
        
        let linhas = Math.floor(materias_arr.length/3)

        let flatlists = [];

        for( let i = 0; i <= linhas-1; i++ ){

            let flatlist = 
                <FlatList 
                    style={{}}
                    contentContainerStyle={{ height: 60, marginTop: 25}}
                    key={i}
                    data={materias_arr.slice(3*i, 3*(i+1))}
                    horizontal
                    keyExtractor={item => String(materias_arr.indexOf(item))}
                    renderItem={({ item })  =>
                    
                    <TouchableOpacity style={styles.estiloTags} onPress={() => setEscolha(item) }>
                    
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center'}}
                            >
                            <Text style={{fontFamily:'FredokaRegular'}}>{item}</Text>
                        </View>

                    </TouchableOpacity> }
                />

            flatlists = [ ...flatlists, flatlist ]

        };

        return(flatlists.slice(0,3))

    };

    // Função para plotagem dos gráficos
    function Grafico({ dados }) {

        let nomes = 'Felipe'

        // Funções para processar os dados do Victory
        function processData(data) {
            const maxByGroup = getMaxima(data);
            const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
            };
            return data.map((datum) => makeDataArray(datum));
        };

        function getMaxima(data) {
            const groupedData = Object.keys(data[0]).reduce((memo, key) => {
              memo[key] = data.map((d) => d[key]);
              return memo;
            }, {});
            return Object.keys(groupedData).reduce((memo, key) => {
              memo[key] = 100;
              return memo;
            }, {});
        };

        
        // Variável para armazenar os seguidores com a key "name" para entrar na função Gráfico 
        const [notasSeguidores, setNotasSeguidores] = useState([]);

    
        useEffect(() => {

            // (TO-DO) Aqui devem estar informações do usuário (nome, notas)
            let notas_comparativos = dados
            setNotasSeguidores(notas_comparativos);


        }, [dados, nomes]);

    
        return(

            <View>
                
                {notasSeguidores.length !== 0 ?
                    
                    <VictoryChart polar
                        theme={VictoryTheme.material}
                        domain={{ y: [ 0, 1.15 ] }}
                        width={ Width*0.9 } height={ Height*0.516189 }
                        containerComponent={ <VictoryZoomContainer/> }
                    >
                    <VictoryGroup colorScale={["#00ffe5"]}
                        style={ { data: { fillOpacity: 0.2, strokeWidth: 2 } } }
                    >
                        
                    {
                        processData(notasSeguidores).map((data, i) => {
                            return <VictoryArea key={i} data={data} />;
                        })
                    }
                    </VictoryGroup>

                    {
                        Object.keys(getMaxima(notasSeguidores)).map((key, i) => {

                        return (
                            <VictoryPolarAxis key={i} dependentAxis 
                                style={{
                                    axisLabel: { padding: 10 },
                                    axis: { stroke: "grey", strokeWidth: 0.2 },
                                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                                }}
                                tickLabelComponent={
                                    <VictoryLabel labelPlacement="vertical"/>
                                }
                                labelPlacement="perpendicular"
                                axisValue={i + 1} label={key}
                                tickFormat={(t) => Math.ceil(t * getMaxima(notasSeguidores)[key])}
                                tickValues={[0.25, 0.5, 0.75, 1]}
                            />
                            );
        
                        })
                    }
    
                </VictoryChart>

                :


                <ActivityIndicator style={{height: '5%', marginTop: 100}} size="large" color="#4fff85"/>

            }        

            </View>
            )
        
    };

    function ModalNome(){
        return(

            <Modal isVisible={modalNome} 
            onBackdropPress={() => setModalNome(false)}
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            style={{}}
            >
            <View style={styles.containerModalNome}>

                <Text style={styles.textoAlterarNome}>

                    Alterar nome:</Text>

                <View style={styles.containerTextInput}>
                    <TextInput placeholder="Nome" 
                        blurOnSubmit={true}
                        ref={inputRef}
                        onSubmitEditing={ ( e ) => [ setNome(e.nativeEvent.text), inputRef.current.clear(), setModalNome(false) ] }/>
                </View>

                <View style={{flexDirection: 'row', alignSelf:'flex-end', marginTop: '5%', padding: 5, marginRight: '5%' }}>
                    <TouchableOpacity onPress={( ) => setModalNome(false)}>
                        <Text style={{color: "#2b39ff", fontFamily:'FredokaRegular', fontWeight: 'bold', fontSize: 16, marginRight: '4%'}}> 
                            Cancelar </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={( e ) => [ inputRef.current.clear() ] }>
                        <Text style={{color: "#2b39ff", fontFamily: 'FredokaRegular', fontWeight: 'bold', fontSize: 16}}> 
                            Alterar </Text>
                    </TouchableOpacity>
                </View>
                

            </View>

        </Modal>
        )
    };

    function PrimeiroCard(){

        return(

            <View style={styles.containerCardSuperiorExterno}>

                <View style={styles.cardSuperior}>

                    <View style={styles.containerCardSuperiorInterno}>

                        <View style={{ flexDirection: 'row'}}>
                        
                            <View style={styles.containerFotoPerfil}>

                                <TouchableOpacity style={{width: '100%', height: '100%',}} onPress={( ) => console.log('Abre a foto de perfil')}>
                                    <Image 
                                        source={require("../../assets/felipe_perfil.png")}
                                        style={{width: '100%', height: '100%'}}/>
                                </TouchableOpacity>   

                            </View>

                            <TouchableOpacity style={styles.botaoEditarFoto}
                                onPress={() => console.log('Editar foto de perfil')}
                            >
                                <Icon name="edit" size={25} 
                                    color="black" style={{}}
                                />         

                            </TouchableOpacity>

                        </View>

                        <View style={styles.conteudoCardSuperior}>

                            <TouchableOpacity style={styles.botaoNome} onPress={( ) => [setModalNome(true), console.log('Clicou no nome')]}>
                                <Text style={styles.nomePerfil}>{nome}</Text>
                            </TouchableOpacity>

                            <View style={{marginTop: '5%', flexDirection: 'row'}}>
                                
                                <Rating style={{}} fractions="{1}" startingValue={rating} imageSize={20} readonly={true}/>

                                <Text style={{marginLeft: '10%', borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, backgroundColor: 'white',
                                    elevation: 5, fontFamily: 'FredokaMedium'}}>{rating}</Text>
                            
                            </View>
                            
                            
                            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: '100%', padding: 10}}>
                                <TouchableOpacity style={styles.textoSeguidores}>
                                    <Text style={{ fontSize: 12, fontFamily: 'FredokaMedium'}}>
                                        Seguidores
                                    </Text>
                                    <Text style={{marginTop: 5, fontSize: 16, fontFamily: 'FredokaRegular'}}>
                                        48
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.textoSeguidores}>
                                    <Text style={{fontSize: 12, fontFamily: 'FredokaMedium'}}>
                                        Seguindo
                                    </Text>
                                    <Text style={{marginTop: 5, fontSize: 16, fontFamily: 'FredokaRegular'}}>
                                        10
                                    </Text>
                                </TouchableOpacity>
                            </View> 

                        </View>

                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 10, marginLeft: 5}}>

                        <Icon3 name='trophy' size={20} color={'#e3de44'} />

                        <Text style={{marginLeft: 10, fontFamily: 'FredokaRegular'}}>Top 10% melhores tutores</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 10, marginLeft: 5}}>

                        <Icon3 name='medal' size={20} color={'#e3de44'} />

                        <Text style={{marginLeft: 10, fontFamily: 'FredokaRegular'}}>Top 5% maiores notas em Matemática</Text>
                    </View>


                </View>

                <View style={styles.containerCardContato}>
                    <View style={{
                        flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        }}>
                        <TouchableOpacity style={styles.botoesContato} onPress={ () => [ console.log('Clicado botão Mensagem'), setAula(true) ] }>
                            <Icon name ='message-square' size={30} />
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botoesContato} onPress={ () => console.log('Clicado botão Solicitar questão') }>
                            <Icon name ='book' size={30} color='black' />
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botoesContato} onPress={ () => console.log('Clicado botão Denunciar') }>
                            <Icon2 name ='report' size={30} />
                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    function SegundoCard(){
        return(
            
            <View style={styles.containerCardInferior}>
                <TouchableOpacity style={{flexDirection: 'row', width: '100%', backgroundColor: 'white'}} onPress={() => console.log('Clicou em resumo')}>
                    <Text style={{fontFamily: 'FredokaSemiBold'}}>Resumo: {"\n"}</Text>
                    <Icon style={{marginLeft: '75%'}} name='edit' size={15} />
                </TouchableOpacity>

                { dados.basicos.resumo == "" ? <View style={{height: 100, width: 100, backgroundColor: 'red'}}/> : <Text style={{fontFamily: 'sans-serif-light'}}>{dados.basicos.resumo}</Text>}
            
            </View>
        )
    };

    function TerceiroCard(){
        return(
            <View style={styles.containerCardInferior}>

                <Text style={{ color: 'black', fontFamily: 'FredokaSemiBold'}}>Últimas atividades: {"\n"}</Text>    

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>

                    <View style={styles.cardsUltimasAtividades}>
                        <Text style={styles.textosCategoriasAtividades}>Conquistou tag avançada</Text>
                        <Text style={styles.textosCategoriasAtividadesDinamicos}>Matemática, há 5h</Text>
                    </View>  
                    <View style={styles.cardsUltimasAtividades}>
                        <Text style={styles.textosCategoriasAtividades}>Tempo de tutoria</Text>
                        <Text style={styles.textosCategoriasAtividadesDinamicos}>38h</Text>
                    </View> 
                    
                </View> 

                <View style={{flexDirection: 'row', alignSelf: 'center'}}>

                    <View style={styles.cardsUltimasAtividades}>
                        <Text style={styles.textosCategoriasAtividades}>Tutorias</Text>
                        <Text style={styles.textosCategoriasAtividadesDinamicos}>50</Text>
                    </View>  
                    <View style={styles.cardsUltimasAtividades}>
                        <Text style={styles.textosCategoriasAtividades}>Questões acertadas</Text>
                        <Text style={styles.textosCategoriasAtividadesDinamicos}>75%</Text>
                    </View> 
                    
                </View>     

            </View>
        )
    };

    function Tags(){

        return(
            <View style={{ 
                backgroundColor: 'white' , 
                height: 150*alturaTags, 
                width: Width*0.86,
                marginTop: 20, 
                alignItems: 'center', 
                borderRadius: 10, 
                borderWidth: 1, 
                elevation: 20 
                }}>

                <Text style={{marginTop: '3%'}}>Tags avançadas</Text>
                
                <FlatListLoop/>

                <TouchableOpacity style={styles.estiloTagGeral} onPress={() => setEscolha('Todas as matérias') }>
        
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center'}}
                        >
                        <Text>Todas as matérias</Text>
                    </View>

                </TouchableOpacity>

            </View>
        )
    };

    function GraficoCompleto(){

        return(
            <View style={styles.cardGrafico}>

                <Text style={{marginTop: 10, }}>
                    Porcentagem de acerto por matéria
                </Text>

                <Text style={{marginTop: 10, fontWeight: 'bold' }}>
                    {escolha}
                </Text>

                <View style={{ height: 400, justifyContent: 'center'}}>


                    {  !!materia ?
                    
                    escolha !== 'Todas as matérias' ? 
                    Object.keys(materia[escolha]).length <3 && !!materia[escolha] ? <Card2Materias dados={materia[escolha]}/> : <Grafico dados={[materia[escolha]]} />  
                    : 
                    Object.keys(materiasTestadas[0]).length <3 && !!materiasTestadas[0] ? <Card2Materias dados={materiasTestadas}/> : <Grafico dados={materiasTestadas} /> 
                    :
                    <ActivityIndicator style={{height: '5%', marginVertical: 10}} size="large" color="#4fff85"/>

                    }
                    

                </View>

        </View>
        )
    };

    function Card2Materias({dados}){

        let dados_tratados = Object.entries(dados)

        return(
            <View style={{flexDirection: 'row', height: '30%', width: '100%', alignSelf: 'center'}}>
                {dados_tratados.map((item, index) => {

                    return(
                        <View key={index} style={{
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            backgroundColor: 'white',
                            elevation: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            width: "45%"
                            }}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                                {item[0]} 
                            </Text>
                            <Text style={{textAlign: 'center', marginTop: 20}}>
                                Quantidade acertada: {item[1]}%
                            </Text>
                        </View>


                    )
                })}

            </View>

        )
    };

    function ConteudoUsuarioAntigo(){

        return(

        <View style={styles.containerMenor}>

            <Text style={{marginTop: '2%', color: 'grey', fontFamily: 'sans-serif-light'}}>Toque nas tags para ver o desempenho nas matérias</Text>

            <View style={styles.containerCards}>

                {!!materia ? <Tags /> : <ActivityIndicator style={{height: '5%', marginVertical: 10}} size="large" color="#4fff85"/>}

                <GraficoCompleto />

                <Disclaimer />
                
            </View>

        </View>
        )
    };

    function ConteudoUsuarioNovo(){

        return(

            <View style={{height: 100, width: 100, backgroundColor: 'red'}}>

            </View>
        )
    };

    function Disclaimer(){
        return(
            <View style={styles.cardDisclaimerGrafico}>

                <Text style={{fontWeight: 'bold'}}>Que números são estes do gráfico acima? {"\n"}</Text>

                <Text style={{fontFamily: 'sans-serif-light'}}>
                    Os números do gráfico são simplesmente os percentuais de questões acertadas dos últimos 3 meses da disciplina em questão.
                    {'\n\n'}
                    Para garantirmos a qualidade do tutor, exigimos que eles estejam sempre atualizando suas competências.
                    {'\n\n'}
                    Afinal, o esquecimento é normal.
                </Text>                  

            </View>
        )
    };

    return(
        <>

        <ModalNome />

        <ModalRequest />
       
        <ScrollView>

            <View style={styles.containerMaior}>
                
                <PrimeiroCard />

                <SegundoCard />

                <TerceiroCard />
                
                { materia==false ? <ConteudoUsuarioNovo /> : <ConteudoUsuarioAntigo /> }

                
            </View>

            <View style={{height: 100, width: Width, backgroundColor: 'white'}}/>
            
        </ScrollView>
        
        <StatusBar style='auto' />
        
        </>
    )

}

const styles = StyleSheet.create({

    containerModalNome:{

        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 20, 
        width: Width*0.9, 
        height: Height*0.2, 
        alignSelf: 'center',
        elevation: 30,
        marginBottom: '50%'
    
    },

    containerModalMaterias: {

        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 5, 
        width: Width*0.9, 
        alignSelf: 'center',
        elevation: 30,
        marginVertical: 10

    },

    containerCardSuperiorExterno:{

        marginTop: '12%',
        marginBottom: '2.5%',
        marginHorizontal: '2.5%', 
        borderWidth: 1, 
        borderRadius: 20,
        backgroundColor: '#c9ffdc',
        elevation: 10, 

    },

    cardSuperior:{

        marginTop: '2%',
        marginHorizontal: '2.5%', 
        borderWidth: 1, 
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,

    },


    textoAlterarNome: {

        marginLeft: '10%', 
        marginTop: '5%', 
        fontFamily:'FredokaRegular', 
        fontSize: 16
    
    },

    containerTextInput: {

        borderWidth: 1, 
        width: '80%', 
        alignSelf: 'center', 
        padding: 5, 
        borderRadius: 5, 
        marginTop: "3%", 
        elevation: 5, 
        backgroundColor: 'white'
    
    },

    containerMaior: { 
        
        backgroundColor:'white', 
        flex: 1

    },

    containerCardSuperiorInterno: {

        flexDirection: 'row', 
        marginHorizontal: '2.5%',
    },

    conteudoCardSuperior:{

        flex: 1,
        marginLeft: '3%',
        marginVertical: '2.5%',
        alignItems: 'flex-start',
    
    },

    containerCardContato:{
        
        backgroundColor: 'white',
        marginVertical: 5,
        height: 60,
        width: "95%",
        marginHorizontal: '2.5%',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        paddingHorizontal: 10
    
    },

    textoSeguidores:{
        backgroundColor: 'white', 
        elevation: 10, 
        borderWidth: 1, 
        borderRadius: 5,
        marginTop: 10, 
        padding: 5, 
        alignItems: 'center', 
        alignSelf: 'center',
        justifyContent: 'center', 
        marginLeft: 10, 
        width: 80,
        fontFamily: 'FredokaRegular'
    
    },
    
    botoesContato:{

        height: '65%', 
        width: '25%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 12,
        borderWidth: 1.5,
        borderRadius: 10, 
        elevation: 5,
        backgroundColor: 'white'
    
    },

    cardsUltimasAtividades:{

        backgroundColor: 'white', 
        width: Width*0.42, 
        height: Height*0.1, 
        borderWidth: 1, 
        borderRadius: 10, 
        elevation: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
        padding: 5, 

    },

    containerCardInferior: {

        marginVertical: '2.5%',
        marginHorizontal: '2.5%', 
        borderWidth: 1, 
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        padding: 10

    },

    textosCategoriasAtividades: {

        fontSize: 13, 
        textAlign: 'center',
        fontFamily: 'FredokaMedium'
    
    },

    textosCategoriasAtividadesDinamicos:{

        fontSize: 14, 
        marginTop: '10%',
        fontFamily: 'FredokaRegular'
    
    },

    containerCards: {

        marginVertical: '2.5%',
        width: '95%',
        borderWidth: 1, 
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'center',

    },

    containerFotoPerfil: {

        width: 100, 
        height: 100, 
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: 20

    },

    botaoEditarFoto: {
        height: 25,
        width: 25,
        marginTop: 100

    },

    botaoNome:{

        marginTop: '3%',
        borderWidth: 1, 
        borderRadius: 10, 
        paddingHorizontal: 8,
        elevation: 5,
        backgroundColor: 'white'
    },

    nomePerfil: {

        fontSize: 16,
        fontFamily: 'FredokaMedium',
        marginHorizontal: 10,
        marginVertical: 2

    },

    tipoPerfil: {

        fontSize: 16,

    },
     
    containerMenor:{

        backgroundColor: "#c9ffdc",
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 80,
        elevation: 10,

    },

    estiloTags: { 
        height: 40, 
        borderRadius: 15,
        backgroundColor: "#4fff85",
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        padding: 12,
        elevation: 10,
        marginHorizontal: 10,
    },

    estiloTagGeral: { 
        height: 40, 
        borderRadius: 15,
        backgroundColor: "#00ffe5",
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        padding: 12,
        elevation: 10,
        marginHorizontal: 10,
        marginVertical: 20
        
    },

    cardGrafico:{ 
        
        backgroundColor: 'white' , 
        width: 340,
        marginTop: 20, 
        alignItems: 'center', 
        borderRadius: 10, 
        borderWidth: 1, 
        elevation: 20 
    },

    cardDisclaimerGrafico: {
        marginVertical: '4.5%',
        marginHorizontal: '2.5%', 
        borderWidth: 1, 
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 10,
        padding: 10

    },
});