import React, {useState, useRef, useEffect, useContext} from "react";
import { 
    View , 
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator
    } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { PostagemTexto } from "../components/PostagemTexto";

import { AuthContext } from "../context/auth";


const Width = Dimensions.get('window').width

export default function TelaPerfilHome({ navigation }){   

    // Buscando dados do backend 
    const { buscarPostagens, loading, setLoading } = useContext(AuthContext);

    // Toda vez que entrar nessa tela o useEffect vai buscar os posts e inserir dentro da variável postagens
    useEffect(()=>{

        
        setLoading(true);

        // COMENTADO PARA POUPAR USO DE DADOS //

         buscarPostagens().then((posts) => {
            
            setPostagens(posts);
            
            setLoading(false);
        
        }).catch((error) => {

            console.log(error)
        })


    },[])

    // Variável para armazenar os posts
    const [postagens, setPostagens] = useState([]);
    
    // Constante para armazenar referência do Text Input
    const inputPostagem = useRef(null);

    return(
        <>        
            <View style={styles.containerMaior}>
                    
                <Image 
                    source={require("../assets/L-earn_icon3.png")}
                    style={styles.imagem}/>

                    <View style={styles.containerMenor}>
                        

                        <View style={styles.containerPostagem}>

                            <TextInput 
                                style={{marginHorizontal: '10%'}}
                                ref={inputPostagem}
                                placeholder="Compartilhe sua dúvida"
                                onSubmitEditing={( e ) =>  
                                    [setPostagens([ {
                                        id: 4,
                                        autor: 'Felipe',
                                        conteudo: e.nativeEvent.text,
                                        likes: 0
                                    },
                                    ...postagens ]),
                                    inputPostagem.current.clear()]}
                            />

                            <TouchableOpacity style={styles.botaoPostar}>
                                <Text> Postar </Text>
                            </TouchableOpacity>

                        </View>

                        {loading ? 

                        <ActivityIndicator style={{marginTop: '5%'}} size="large" color="#4fff85"/> :
                        
                        <FlatList 
                            style={{}}
                            contentContainerStyle={{alignContent: 'center', alignItems: 'center'}}
                            data={postagens}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => String(item.id)}
                            /* onEndReached={loadApi}
                            onEndReachedThreshold={0.1}
                            refreshControl={<RefreshControl
                                            refreshing={loading}
                                            onRefresh={loadApi} */
                            renderItem={({ item })  => 
                                <PostagemTexto autor={item.autor} 
                                    conteudo={item.conteudo} likes={String(item.likes)}
                                    id={item.id} />}
                        />
                        }
                        
                    </View>

            </View>
        <StatusBar style="auto" />
        </>
    )

}

const styles = StyleSheet.create({

    containerPostagem:{
        flexDirection: 'row', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginTop: '5%',
        backgroundColor: 'white',
        elevation: 10,
        height: 40,
        alignItems: 'center',
    },
    
    botaoPostar: {
        backgroundColor: "#4fff85",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: '20%',
        height: '80%',
        marginRight: 10,
        },

    containerMaior:{
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        justifyContent: "flex-end",

    },

    imagem: {
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
})