import React, {useState, useEffect, useContext, useRef} from "react";
import { 
    View , 
    Text ,
    ScrollView,
    Dimensions,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { TagGroup } from "../components/Tags";
import Icon from 'react-native-vector-icons/Feather.js';
import Modal from 'react-native-modal';




// Bibliotecas para criação do gráfico
import { 
    VictoryPolarAxis, 
    VictoryChart, 
    VictoryTheme, 
    VictoryLabel, 
    VictoryArea, 
    VictoryGroup, 
    VictoryLegend,
    VictoryLine} from "victory-native";

import { AuthContext } from "../context/auth";


const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

export default function TelaPerfilProgresso({ navigation }){


    // Referência para textInput
    const inputRef = useRef(null);

    // Buscando dados do backend do usuário no contexto 
    const { dados } = useContext(AuthContext);
    
    // Variável para armazenar lista de matérias já testadas para gráfico Radar
    const [materias, setMaterias] = useState(null);

    // Variável para armazenar matérias testadas
    const [materiasTestadas, setMateriasTestadas] = useState([]);


    useEffect(() => {

        function AgruparDisciplinas (){


            if (!!!dados.tags.avancadas){
                
                setMaterias(false)

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

            setMaterias(dict);
            
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
        
        AgruparDisciplinas()

    },[])


    //let tags = Object.keys(dados.tags_avancadas)
    const [escolhaMateria, setEscolhaMateria] = useState('todas as matérias');
    const [objetivo, setObjetivo] = useState('Engenharia Mecânica');
    const [modalObjetivo, setModalObjetivo] = useState(false);
    
    // (TO-DO) Variável para armazenar os seguidores - Devo captar essa informação já do backend
    const [seguidoresCompleto, setSeguidoresCompleto] = useState([
        "Felipe",
        "Arthur", 
        "João", 
        "Fernanda", 
        "Nina", 
        "Luke", 
        "Clarice", 
        "Natália"
        ]);
    
    // Variável para busca dos seguidores dentro da função search
    const [seguidores, setSeguidores] = useState(null);

    //Variável para escolha dos seguidores a se comparar 
    const [escolha, setEscolha] =  useState([]);
    
    // Função para busca dos seguidores para comparação
    function search(s) {
        let arr = seguidoresCompleto.filter( (d) => d.includes(s) );
        setSeguidores(arr);
    };

    // Variável para inserir as matérias de estudo recomendadas
    const [recomendacao, setRecomendacao] = useState({
        "História": ["Revolução Francesa", "Grandes guerras"],
        "Biologia": ['Genética']
    });
    
    // Constantes que vieram do SwiperCostumizado
    const dataColors = ["#c2f23f", "#c53ff2", "#00ffe5", "#fa5f2f", "#f23f45"]

    // Variável para armazenar as matérias com disciplinas avançadas
    let materiasAvancadas = [];

    if (!!dados.tags.avancadas){
        materiasAvancadas = Object.keys(dados.tags.avancadas);
    };
    
    // (TO-DO) Dados dummies para gráfico - Devo captar essa informação já do backend
    const characterData = [
        { Matemática: 80, Filosofia: 60, História: 40, Biologia: 50, Sociologia: 50, Geografia: 40},
        { Matemática: 10, Filosofia: 67, História: 50, Biologia: 20, Sociologia: 10, Geografia: 49 },
        { Matemática: 100, Filosofia: 17, História: 30, Biologia: 50, Sociologia: 11, Geografia: 40 },
        { Matemática: 53, Filosofia: 71, História: 50, Biologia: 80, Sociologia: 10, Geografia: 87 },
        { Matemática: 10, Filosofia: 67, História: 55, Biologia: 75, Sociologia: 32, Geografia: 12 }
    ];  
    
    // (TO-DO) Dados dummies para gráfico - Devo captar essa informação já do backend
    const dadosAntigos = [
        { Matemática: 80, Filosofia: 100, História: 80, Biologia: 70, Sociologia: 70, Geografia: 60},
        { Matemática: 50, Filosofia: 87, História: 40, Biologia: 80, Sociologia: 100, Geografia: 80 },
        { Matemática: 10, Filosofia: 37, História: 40, Biologia: 20, Sociologia: 10, Geografia: 85 },
        { Matemática: 40, Filosofia: 57, História: 10, Biologia: 40, Sociologia: 90, Geografia: 40 },
        { Matemática: 60, Filosofia: 77, História: 60, Biologia: 60, Sociologia: 30, Geografia: 86 }
    ]; 

    // Função para renderização de Tags e Gráfico de meta pelo tempo
    function TagsEGraficoMeta(){

        return(
            <View style={styles.containerGraficoLinha}>

                <View style={styles.textoProgresso}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 16}}>
                            Seu progresso em 
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}> {escolhaMateria}</Text>
                    </View>

                </View>

                <Text style={{color: 'grey', marginTop: 10, alignSelf: 'flex-start', marginLeft: 10}}>
                    Clique nas Tags para ver seu progresso
                </Text>
                
                <View style={{ alignContent: 'center', justifyContent: 'center'}}>
                    { !!materias ? <Tags /> : <ActivityIndicator style={{height: '5%'}} size="large" color="#4fff85"/> }
                </View>
                <View style={styles.textoProgresso}>
                    <Text style={{textAlign: 'center'}}>
                        De 10 questões de {escolhaMateria} você acertava 9 em Maio/21 e 7 em 22/11
                    </Text>
                </View>

                <GraficoProgressoMeta />

                <Text style={{color: 'grey', marginBottom: 20, alignSelf: 'flex-start', marginLeft: 10}}>
                    O que significa este gráfico?
                </Text>

            </View>
        )
    };

    // Função para renderização de elementos de comparação com seguidores
    function CompararSeguidores (){

        return(

            <>
            <Text style={styles.textoComparar}>

                Comparar matérias testadas com seus seguidores:
            </Text>

            <View style={styles.containerProcuraSeguidor}>
                
                <Icon name='search' size={25} style={{ marginLeft: "5%" }}/>

                <TextInput
                    style={styles.InputProcurar}
                    placeholder="Seguidor"
                    onSubmitEditing={( e ) => [ search(e.nativeEvent.text) ]}
                    />
            </View> 

            
            { !!seguidores ?                           

            <SafeAreaView style={styles.compararSeguidores}>

                {seguidores.map((label, index) => {
                    return(
                        <TouchableOpacity 
                            style={{marginVertical: 10, justifyContent: 'flex-start'}} 
                            key={index}
                            onPress={() => escolha.includes(label) ? 
                                            setSeguidores(false) : 
                                            [setEscolha([...escolha, label]), setSeguidores(false)]}>
                            <Text>{label}</Text>
                        </TouchableOpacity>
                        )})} 

            </SafeAreaView> 
                
            : 
            null
            }
            </>
        )
    };

    // Função para renderização do conteúdo para usuários com históricos
    function PlanoDeEstudoEHistorico (){

        return(
            <View style={styles.containerHistoricoMaior}>

                {/* <View style={styles.containerTextoHistorico}> */}

                    <Text style={styles.textoHistorico}>
                        Seu plano de estudos
                    </Text>


                {/* </View> */}

                
                <TouchableOpacity style={styles.containerTextoHistorico} onPress={( ) => setModalObjetivo(true)}>
                    <Text style={styles.textoAcertos}>
                        Sua meta é passar em {objetivo} {'\n\n'}
                        Nós vamos te ajudar com isso!
                    </Text>
                </TouchableOpacity>

                                
                
                {!!materiasTestadas[0] && Object.keys(materiasTestadas[0]).length > 0 ? 
                <>
                <CompararSeguidores />
                <GraficosPerformanceGeral /> 
                <CardsSugestoes /> 
                <TagsEGraficoMeta />

                </> :
                
                <NenhumaMateriaTestada />
                }
                  
                

                
            </View>
        )
    };

    // Função com elementos de renderização para histórico nulo
    function NenhumaMateriaTestada(){

        return(
            <View style={styles.containerTextoHistorico}>
                <Text style={{fontFamily: 'FredokaSemiBold', fontSize: 16, textAlign: 'center', marginTop: 10}}>
                    Você ainda não fez nenhuma questão :({"\n"} {"\n"} </Text>

                <Text style={{fontSize: 16, textAlign: 'center', fontFamily: 'FredokaRegular'}}> Faça já um simulado com questões aleatórias de todas as matérias {"\n"}</Text>
                
            
                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    borderTopLeftRadius: 10,
                    marginVertical: 10,
                    justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                        style={{
                            height: 40, 
                            borderRadius: 20,
                            backgroundColor: "#c53ff2",
                            justifyContent: 'center', 
                            alignItems: 'center',
                            borderWidth: 1,
                            padding: 12,
                            marginHorizontal: 6,
                            elevation: 10,}}
                        onPress={() => console.log('Ir para Tela Nova Materia')}
                        >

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                            <Icon name='book-open' size={20} style={{marginHorizontal: 5}}/>

                            <Text style={{fontSize: 16, fontFamily: 'FredokaRegular'}}>Simulado</Text>
                            
                        </View>
                    
                    </TouchableOpacity>
                </View> 
                    

                <Text  style={{fontSize: 16, fontFamily: 'FredokaRegular', textAlign: 'center', marginTop: 10}}> Ou teste apenas as suas específicas</Text>

                <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        borderTopLeftRadius: 10,
                        marginVertical: 10,
                        justifyContent: 'center'
                        }}>
                        <TouchableOpacity
                            style={{
                                height: 40, 
                                borderRadius: 20,
                                backgroundColor: "#4fff85",
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderWidth: 1,
                                padding: 12,
                                marginHorizontal: 6,
                                marginVertical: 10,
                                elevation: 10,}}
                            onPress={() => console.log('Ir para Tela Nova Materia')}
                            >

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                <Icon name='book-open' size={20} style={{marginHorizontal: 5}}/>

                                <Text style={{fontSize: 16, fontFamily: "FredokaRegular"}}>Específicas</Text>
                                
                            </View>
                        
                        </TouchableOpacity>
                </View>

            </View>
        )
    };

    
    // Função para renderização da Modal para troca de objetivo
    function ModalObjetivo(){
        return(

            <Modal isVisible={modalObjetivo} 
            onBackdropPress={() => setModalObjetivo(false)}
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0}
            animationIn={'slideInDown'}
            animationOut={'slideOutUp'}
            style={{}}
            >
                <View style={styles.containerModalObjetivo}>

                    <Text style={styles.textoAlterarObjetivo}>

                        Alterar objetivo:</Text>

                    <View style={styles.containerTextInput}>
                        <TextInput 
                            blurOnSubmit={true}
                            ref={inputRef}
                            onSubmitEditing={ ( e ) => [ setObjetivo(e.nativeEvent.text), inputRef.current.clear(), setModalObjetivo(false) ] }/>
                    </View>

                    <View style={{flexDirection: 'row', alignSelf:'flex-end', marginTop: '5%', padding: 5, marginRight: '5%' }}>
                        <TouchableOpacity onPress={( ) => setModalObjetivo(false)}>
                            <Text style={{color: "#2b39ff", fontFamily:'sans-serif-light', fontWeight: 'bold', fontSize: 16, marginRight: '4%'}}> 
                                Cancelar </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={( e ) => [  inputRef.current.clear() ] }>
                            <Text style={{color: "#2b39ff", fontFamily:'sans-serif-light', fontWeight: 'bold', fontSize: 16}}> 
                                Alterar </Text>
                        </TouchableOpacity>
                    </View>
                    

                </View>

            </Modal>
        )
    };

    // Função para renderização de histórico com até 2 matérias
    function CardsHistorico2Materias(){

        function AteDuasMaterias ( ){
            return(
                <>
                {  
                    Object.keys(materiasTestadas[0]).map((item, index) => {

                        return (
                        
                        <View key={index} style={styles.cardsUltimasAtividades}>
                            <Text style={styles.textosCategoriasAtividades}>{item}</Text>
                            <Text style={styles.textosCategoriasAtividadesDinamicos}>{materiasTestadas[0][item]}%</Text>
                        </View> 
                        
                        )
                    })
                }
                </>

            )
        };

        return(

            <View style={{flexDirection: 'row',  justifyContent: 'center', marginHorizontal: 5, marginVertical: 20}}>

                <AteDuasMaterias />                 

            </View>
        )
    };

    // Função para plotagem dos gráficos radares
    function GraficoRadar({ dados, nomes }) {


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
        const [seguidoresCompletoDict, setSeguidoresCompletoDict] = useState([]);
        const [notasSeguidores, setNotasSeguidores] = useState([]);

    
        useEffect(() => {

            // (TO-DO) Aqui devem estar informações do usuário (nome, notas)
            let nomes_comparativos = [ { name: "Felipe" } ]
            let notas_comparativos = dados;

            for (let i = 0; i < nomes.length; i++){

                nomes_comparativos = [...nomes_comparativos, { name: nomes[i] }];
                notas_comparativos = [...notas_comparativos,  dados[i+1] ];

                console.log(dados[i+1])
            
            };

            setSeguidoresCompletoDict(nomes_comparativos);
            setNotasSeguidores(notas_comparativos);


        }, [dados, nomes]);
    
        return(

            <View style={styles.containerGrafico}>
                

                {notasSeguidores.length !== 0 ?
                    
                    <VictoryChart polar
                    theme={VictoryTheme.material}
                    domain={{ y: [ 0, 1.15 ] }}
                    width={ Width*1.0185192 } height={ Height*0.516189 }
                    >
                        
                    <VictoryGroup colorScale={dataColors}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                    >
                        
                        
                    {
                        processData(notasSeguidores).map((data, i) => {
                            return <VictoryArea key={i} data={data} />;
                        })
                    }
                    </VictoryGroup>

                    <VictoryLegend x={ Width*0.1 } y={ 15 }
                        orientation="horizontal"
                        gutter={ Width*0.05 }
                        style={{ 
                                border: { stroke: "white" }, backgroundColor: 'red' ,
                                data: { stroke: "black", },
                                }}
                        colorScale={dataColors}
                        data={seguidoresCompletoDict}
                        />

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

                <ActivityIndicator style={{height: '5%'}} size="large" color="#4fff85"/>

            }        

            </View>
            )
        
    };

    // Função para renderização do elemento de sugestões
    function Sugestoes (){

        return(

            <ScrollView 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            snapToInterval={Width*0.8}
            style={{height: "100%", borderWidth: 1, borderRadius: 10, marginHorizontal: 5, elevation: 10, backgroundColor: 'white'}}  
            contentContainerStyle={{alignSelf: 'center', justifyContent: 'center', height: '100%', marginTop: 30}}>

            {Object.keys(recomendacao).map((disciplina, index_disciplina) => {


                return(
                    <View style={{width: Width*0.8, alignItems: 'center', marginVertical: 10}} key={index_disciplina}>
                        
                        <Text style={{fontFamily: 'sans-serif-light', marginLeft: 10}}>
                            {disciplina}
                        </Text>   
                        {recomendacao[disciplina].map((materia, index_materia) => {

                            return(
                                <View key={index_materia}>

                                    <View style={{
                                        flexDirection: 'row', 
                                        alignItems: 'center', 
                                        borderTopLeftRadius: 10,
                                        marginVertical: 10
                                        }}>
                                        <TouchableOpacity
                                            style={styles.botoes}
                                            onPress={() => console.log('Ir para Tela Nova Materia')}
                                            >
    
                                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
    
                                                <Icon name='book-open' size={20} style={{marginHorizontal: 5}}/>
    
                                                <Text>{materia}</Text>
                                                
                                            </View>
                                        
                                        </TouchableOpacity>
                                    </View> 
                                </View>
                            )

                        })}
                    </View>
                )
            })}

        </ScrollView>

        )
    };

    // Função para renderização dos gráficos radar    
    function GraficosPerformanceGeral(){

        return(

            <>
            <Text style={{ color: 'grey', marginLeft: 10 }}>
                Arraste para a direita para ver seu histórico</Text>
            
            <SafeAreaView 
                style={ Object.keys(materiasTestadas[0]).length  >= 3 ?

                [{ height: 450, marginVertical: 10 }] : [{ height: 200, marginVertical: 10 }]}>

                <View style={{ height: "100%", }}>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        horizontal
                        snapToInterval={Width * 0.9}
                        style={{ height: "100%", borderWidth: 1, borderRadius: 10, marginHorizontal: 5, elevation: 10, backgroundColor: 'white' }}
                        contentContainerStyle={{ alignSelf: 'center', }}
                    >

                        <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
                            <View style={styles.containerHistorico}>
                                <Text>
                                    Há 3 meses
                                </Text>
                            </View>


                            {Object.keys(materiasTestadas[0]).length >= 3 ?

                                <GraficoRadar dados={materiasTestadas} nomes={escolha} /> :

                                <CardsHistorico2Materias />}


                        </View>

                        <View style={{ alignSelf: 'center', paddingVertical: 10 }}>
                            <View style={styles.containerHistorico}>
                                <Text>
                                    Hoje em dia
                                </Text>
                            </View>

                            { Object.keys(materiasTestadas[0]).length >= 3 ?

                            <GraficoRadar dados={dadosAntigos} nomes={escolha} /> :

                            <CardsHistorico2Materias />}

                        </View>

                    </ScrollView>

                </View>

            </SafeAreaView>
            
            </>
        )
    };

    // Função para renderização do elemento Tags para usuários com dados
    function TagsUsuarioAntigo(){

        return(
            
            <>

            <Text style={styles.textoTagsAvancadas}>
                Suas tags avançadas
            </Text>
            
            <Text style={styles.textoFicarDisp}>
                Toque para ficar disponível para tutorias
            </Text>

            <View style={styles.containerTags}>
                
                <TagGroup tags={materiasAvancadas} />

            </View>

            </>
        )
    };

    // Função para renderização do card contendo as sugestões de estudos e simulado
    function CardsSugestoes(){
        return(

            <View style={styles.cardsTextos}>

                <View style={{ width: '100%', backgroundColor: 'white'}}>
                    <Text style={{fontWeight: 'bold'}}>Sugerimos que você estude: {"\n"}</Text>
                </View>

                <View style={{width: "100%", height: 200,}}>
                    
                    <Sugestoes />

                </View>

                <Text style={{marginTop: 10, color: 'grey'}}>
                    Terminou de revisar? {"\n\n"} Clique nos botões acima e resolva questões junto com os tutores</Text>

                
                <View style={styles.containerTextoHistorico}>
                    <Text style={{fontWeight: 'bold'}}>Faça um simulado com questões aleatórias de todas as áreas {"\n"}</Text>
                    
                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        borderTopLeftRadius: 10,
                        marginVertical: 10,
                        justifyContent: 'center'
                        }}>
                        <TouchableOpacity
                            style={{
                                height: 40, 
                                borderRadius: 20,
                                backgroundColor: "#c53ff2",
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderWidth: 1,
                                padding: 12,
                                marginLeft: 6,
                                marginRight: 6,
                                elevation: 10,}}
                            onPress={() => console.log('Ir para Tela Nova Materia')}
                            >

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                <Icon name='book-open' size={20} style={{marginHorizontal: 5}}/>

                                <Text>Simulado</Text>
                                
                            </View>
                        
                        </TouchableOpacity>
                    </View> 
                </View>

            </View>
        )
    };

    // Função para renderização do elemento Tags para usuários novos
    function TagsUsuarioNovo (){

        return(
            <>

            <Text style={styles.textoTagsAvancadas}>
                Você ainda não tem tags avançadas
            </Text>

            <View style={styles.containerTags}>

                <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{
                        width: '100%',
                        height: '100%',
                        alignContent: 'center', 
                        justifyContent: 'center',
                        }}>
                        
                    <View style={styles.textoTags}>

                        
                        <View style={styles.container}>
                            <TouchableOpacity
                                style={styles.botoes}
                                onPress={() => navigation.navigate('TelaPreNovaMateria')}
                                >

                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                    <>
                                        <Text style={{fontSize: 16, fontFamily: 'FredokaRegular'}}>Toque aqui e teste uma disciplina</Text>
                                    </>

                                </View>
                            
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView> 
            </View>

            </>
        )
    };
    
    // Função para renderização das Tags
    function Tags() {

        let linhas = Math.floor(Object.keys(materias).length/3)

        // Função para criar um laço e passar por todas as Tags do usuário
        function FlatListLoopTags(){
            

            let flatlists = [];

            for( let i = 0; i <= linhas-1; i++ ){

                let flatlist = 
                    <FlatList 
                        style={{ }}
                        contentContainerStyle={{ height: 60, marginTop: 25}}
                        key={i}
                        data={Object.keys(materias).slice(3*i, 3*(i+1))}
                        horizontal
                        keyExtractor={item => String(Object.keys(materias).indexOf(item))}
                        renderItem={({ item })  =>
                            <TouchableOpacity style={styles.estiloTags} onPress={ () => setEscolhaMateria(item) }>
                                <View style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'}}
                                    >
                                    <Text>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />

                flatlists = [ ...flatlists, flatlist ]

            };

            return(flatlists.slice(0,3))

        };

        return(
            <View style={{
                backgroundColor: 'white' , 
                width: Width*0.86,
                height: linhas*150,
                marginTop: 20, 
                alignItems: 'center', 
                borderRadius: 10, 
                borderWidth: 1, 
                elevation: 20,
                }}>

                <Text style={{marginTop: '3%'}}>Tags</Text>
                
                <FlatListLoopTags/>

                <TouchableOpacity style={styles.estiloTagGeral} onPress={() => setEscolhaMateria('todas as matérias') }>
        
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

    // Função para renderização do gráfico progresso/meta pelo tempo
    function GraficoProgressoMeta (){
        return(
            <View style={{
                borderWidth: 1, 
                borderRadius: 10, 
                marginVertical: 10,
                marginHorizontal: 5,
                backgroundColor: 'white',
                elevation: 10}}>

                <VictoryChart minDomain={{ y: 0 }} maxDomain={{ y : 10 }} width={ Width*0.85 } >
                    
                    <VictoryLine
                        style={{
                        data: { fill: "#c53ff2", fillOpacity: 0.5, stroke: "#c53ff2", strokeWidth: 1}
                        }}
                        data={[
                            { x: "01/05", y: 9 },
                            { x: "15/07", y: 9 },
                            { x: "28/09", y: 9 },
                            { x: "30/10", y: 9 },
                            { x: "22/11", y: 9 }
                        ]}
                    />
                    <VictoryArea
                        style={{
                        data: { fill: "#00ffe5", fillOpacity: 0.2, stroke: "#00ffe5", strokeWidth: 2}
                        }}
                        data={[
                            { x: "01/05", y: 9.0 },
                            { x: "15/07", y: 7.8 },
                            { x: "28/09", y: 8.0 },
                            { x: "30/10", y: 9.5 },
                            { x: "22/11", y: 7.5 }
                        ]}
                    />
                    <VictoryLabel
                        x={110}
                        y={50}
                        text="Conquiste o avaçado!"
                        style={[
                            { fill: "#c53ff2" , fontFamily: "sans-serif-thin"},]}
                        />
                    <VictoryLabel
                        x={120}
                        y={160}
                        text="Seu desempenho"
                        style={[
                            { fill: "#00d1bc" , fontFamily: 'sans-serif-thin'}]}
                        />
                    
                </VictoryChart>

            </View>
        )
    };

    return(
        
        <>
        <ModalObjetivo />

        <SafeAreaView style={{backgroundColor: 'white'}}>
        
            <ScrollView>
                <View style={styles.containerMaior}>
        
                    <Text style={styles.textoBemVindo}>
                        Olá, { !!dados.basicos.nome ? dados.basicos.nome : '...' }
                    </Text>

                    { materias === null ? <ActivityIndicator style={{height: '10%'}} size="large" color="#4fff85"/> : !!materias ? <TagsUsuarioAntigo /> : <TagsUsuarioNovo /> }
                 

                    <View style={styles.containerMenor}>
                    
                        
                        <PlanoDeEstudoEHistorico />
                        
                        <View style={{height: 100}}/>
                    

                    </View>
            
                </View>
                
            </ScrollView>
            
        </SafeAreaView>
        

        <StatusBar style="auto" />
    
        
        </>
    )

};


const styles = StyleSheet.create({

    containerMaior:{
        width: Width,   
        backgroundColor: "white",
        },

    textoBemVindo:{
        fontSize: 40,
        fontFamily: "FredokaRegular",
        marginTop: 40,
        marginLeft: 15
        },

    textoTagsAvancadas: {
        marginTop: 20,
        marginLeft: 15,
        fontFamily: "FredokaRegular",
        fontSize: 16
        },

    textoFicarDisp:{
        marginTop: 7,
        marginLeft: 15,
        fontFamily: "sans-serif-thin",
        fontWeight: 'bold',
        fontSize: 12,
        },

    containerTags: { 
        width: "95%",
        height: 90,
        elevation: 10,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
        },

        
    container:{
        flexDirection: 'row', 
        alignItems: 'center', 
        borderTopLeftRadius: 10,
        
        },
    
    scrollTags: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        borderRadius: 30,
        alignSelf: 'center',

        },

    botoes: { 
        height: 50, 
        borderRadius: 20,
        backgroundColor: "#4fff85",
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        padding: 12,
        marginLeft: 6,
        marginRight: 6,
        elevation: 15,
    },
    
    textoTags:{
        alignItems: 'center', 
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        flex: 1,
        },

    cardsTextos:{
        marginVertical: '2.5%',
        marginHorizontal: '2.5%', 
        borderWidth: 1, 
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 10,
        padding: 10
    },
    
    containerMenor:{
        backgroundColor: "#c9ffdc",
        width: Width,
        borderTopLeftRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 20,
        elevation: 10,
        },

    containerHistoricoMaior:{
        backgroundColor: "white", 
        borderWidth: 1, 
        borderRadius: 15, 
        elevation: 10,
        marginVertical: "3%",
        marginHorizontal: "2%",
        paddingBottom: 30
    },

    containerTextoHistorico: {
        borderRadius: 10, 
        borderWidth: 1, 
        elevation: 10, 
        backgroundColor: "white",
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: "5%",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,

        },

    textoHistorico: {
        fontSize: 24,
        fontFamily: "FredokaMedium",
        textAlign: 'center',
        marginHorizontal: '5%',
        marginTop: '5%'
        
        },

    textoComparar: {
        marginTop: "5%", 
        fontFamily: "sans-serif-thin",
        marginHorizontal: "12%",
        fontWeight: 'bold'
    },

    containerProcuraSeguidor: {
        flexDirection: 'row',
        backgroundColor: 'white', 
        borderRadius: 5, 
        borderWidth: 1, 
        marginHorizontal: "12%", 
        marginVertical: "2%",
        height: 44,
        alignContent: 'center',
        alignItems: 'center', 
        elevation: 10,
    },

    InputProcurar: {
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        width: "60%",
        height: "100%",
        textAlign: "left",
        marginLeft: "5%" 
    },

    textoAcertos: {
        fontSize: 15,
        fontFamily: "FredokaRegular",
        marginHorizontal: "3%",
        marginVertical: '2%',
        textAlign: 'center'
    
    },

    
    swiperContainer:{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 100,
    },

    imageContainer: {
        borderRadius: 20,
    },  
    
    swiperContainer2: {
        width: 350,
        height: 350, 
        marginTop: 0
    },

    wrap: {
        width: "100%",
        height: "100%", 
    },

    containerHistorico:{ 
        borderWidth: 1, 
        borderRadius: 5, 
        marginLeft: "10%",
        width: "30%", 
        alignItems: 'center',
        elevation: 5,
        backgroundColor: "white"
    
    },

    containerGrafico:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        width: Width*0.945,
    
    }, 

    modal:{
        backgroundColor: 'white',
        width: "75%",
        height: "30%",
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,

    },

    compararSeguidores:{
        backgroundColor: 'white', 
        borderRadius: 5, 
        borderWidth: 1, 
        marginHorizontal: "12%", 
        marginTop: "2%",
        alignContent: 'center',
        alignItems: 'center', 
        justifyContent: 'center',
        elevation: 10
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

    containerGraficoLinha:{

        width: Width*0.90, 
        alignSelf: 'center', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginVertical: 10, 
        marginHorizontal: 5, 
        elevation: 10, 
        backgroundColor: 'white',
        alignItems: 'center',
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
        marginVertical: 20,
        
    },

    textoProgresso:{
        borderRadius: 10, 
        borderWidth: 1, 
        elevation: 10, 
        backgroundColor: "white",
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: "5%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10
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

    textosCategoriasAtividades: {

        fontSize: 11, 
        fontWeight: 'bold', 
        textAlign: 'center'
    
    },

    containerModalObjetivo:{

        backgroundColor: 'white', 
        borderWidth: 1, 
        borderRadius: 20, 
        width: Width*0.9, 
        height: Height*0.2, 
        alignSelf: 'center',
        elevation: 30,
        marginBottom: '50%'
    
    },
    
    textoAlterarObjetivo: {

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

    textosCategoriasAtividadesDinamicos: {

        fontFamily:'sans-serif-light', 
        fontSize: 14, 
        marginTop: '10%'
    
    },


});
