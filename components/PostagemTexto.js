import React, {useState, useRef, useContext, useEffect} from 'react'
import {View, 
        StyleSheet, 
        TouchableOpacity, 
        Text,
        TextInput,
        Image,
        FlatList,
        ActivityIndicator,
        } from 'react-native'

import { Comentarios } from './Comentarios';

import { AuthContext } from "../context/auth";

import Icon from 'react-native-vector-icons/FontAwesome';


export function PostagemTexto({ autor, conteudo, likes, id}){

        
    const { buscarComentarios } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    
    const [comentarios, setComentarios] = useState([]);

    useEffect(()=>{

        // COMENTADO PARA POUPAR USO DE DADOS //

        setLoading(true);

        buscarComentarios(id).then((coments) => {
            
            setComentarios(coments);
            
            setLoading(false);
        
        }).catch((error) => {

            console.log(error)
        })

    }, []);
    

    const inputRef = useRef(null);
    
    const [curtirPostagem, setCurtirPostagem] = useState(false)
    const [likePost, setLikePost] = useState(parseInt(likes))

    function handleClickPostagem() {
        setCurtirPostagem(!curtirPostagem)
        if(!curtirPostagem){
            setLikePost(likePost+1)
        }else{
            setLikePost(likePost-1)
        }
    };


    return(

            
        <View style={styles.containerPostagem}>

            <View style={{flexDirection: 'row'}}>

                <View style={{marginTop: '2%', marginLeft:'2%'}}>
                    
                    <TouchableOpacity style={styles.imagem}
                                    onPress={() => console.log('Cilcou na foto -> Abrir imagem')}>
                        <Image 
                            source={require("../assets/felipe_perfil.png")}
                            style={{width: '100%', height: '100%'}}/>

                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{color: 'black'}}>{String(likePost)}</Text>

                        <TouchableOpacity style={{height: 20, width: 20}} onPress={()=> handleClickPostagem()}>
                            <Icon name="thumbs-o-up" size={20} 
                                color="#000000" style={styles.Icone}/>
                        </TouchableOpacity>
                        

                    </View>    
                    
                </View>  
            

                <View style={styles.conteudo}>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    
                        <TouchableOpacity style={styles.containerUsuario} onPress={() => console.log('Clicou na pessoa -> Abre perfil')}>
                            <Text style={styles.usuario}>{`@${autor}`}</Text>
                        </TouchableOpacity>
                        <Text style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}> R$ 1,00 </Text>

                    </View>
                    
                    <Text style={styles.texto}>{conteudo}</Text>

                    <View style={styles.containerBotoes}> 

                        <TouchableOpacity style={[curtirPostagem ? styles.CurtidoPostagem : styles.CurtirPostagem]} 
                            onPress={ () => handleClickPostagem() }>
                            <Text>Curtir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Comentar} 
                            onPress={() => inputRef.current.focus()}>

                            <Text>Comentar</Text>
                        </TouchableOpacity>

                    </View>

                
                </View>


            </View>


            {loading ? <ActivityIndicator style={{marginVertical: '6%'}} size='small' color="#4fff85"/> :
                
            <FlatList  
                data={comentarios}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>  <Comentarios autor={item.autor} conteudo={item.conteudo} likes={item.likes} id={id}/>
                }
                />

            }


            <View style={{flexDirection: 'row', 
                borderWidth: 1, 
                borderRadius: 10, 
                marginBottom: '5%', 
                marginHorizontal: '5%', 
                elevation: 5, 
                backgroundColor: 'white'}}>

                <TextInput
                    style={{marginHorizontal: "2%", width: '70%', justifyContent: 'center', }}
                    placeholder="Comentar"
                    multiline={true}
                    blurOnSubmit={true}
                    ref={inputRef}
                    onSubmitEditing={ ( e ) =>  
                        [setComentarios([...comentarios, {
                            id: 3,
                            autor: 'Felipe',
                            conteudo: e.nativeEvent.text,
                            likes: 0}]), inputRef.current.clear()
                        ] }
                />
                    

                <TouchableOpacity style={{
                    backgroundColor: "#E0FFEA",
                    borderRadius: 5,
                    borderWidth: 1,
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                    marginVertical: '2%',
                    height: 30,
                    }}
                    onPress={ ( e ) => inputRef.current.clear() }
                    >

                    <Text style={{alignContent: 'center', justifyContent: 'center', marginHorizontal: 5}}>Comentar</Text>

                </TouchableOpacity>

            </View>
            
        </View>

    )

}

const styles = StyleSheet.create({

    containerPostagem: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: '5%',

    },

    containerUsuario:{
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        padding: 2,
        borderRadius: 6,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        elevation: 5,
        backgroundColor: 'white',
    },

    containerBotoes:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%'

    },

    CurtirPostagem:{
        backgroundColor: "#4fff85",
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        width: 70,
    },

    CurtidoPostagem:{
        backgroundColor: "#68d98b",
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        width: 70,
    },

    CurtirComentario:{
        alignSelf: 'center',
        alignItems: 'flex-end',
        width: '10%',
    },

    Comentar:{
        backgroundColor: "#4fff85",
        alignItems: 'center',
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: 100
    },

    containerLikes:{
        flexDirection: 'row',
        marginLeft: 5

    },

    Icone:{
        marginLeft: 2,
        marginBottom: 10,
    },

    conteudo:{
        width: "70%",
    },

    usuario:{
        color: 'black',
        borderRadius: 5,
        fontSize: 14,
        flexWrap: 'wrap',
        marginHorizontal: '5%'
    },

    texto:{
        color: 'black',
        borderRadius: 5,
        fontSize: 14,
        width: "90%",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        flexWrap: 'wrap',
    },

    imagem:{
        width: 60,
        height: 60,
        marginTop: '3%',
        marginLeft: '3%'
    },

    imagemComentario:{
        marginTop: 5,
        marginLeft: 5,
        width: 40,
        height: 40,
        resizeMode: 'cover', 
    },

    containerInput:{
        width: "90%",
        borderColor: "#000000",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 14,
    },

    containerComentario:{
        flexDirection: 'row',
        width: "120%",
        marginLeft: -50,
        marginVertical: 10,
    },

    containerComentarioInterno:{
        flexDirection: 'row',
        width: "85%",
        
    },

    containerComentarios:{
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: "3%",
        width: "90%",
        borderWidth: 1,
        borderRadius: 15,
    },
    
    containerComentarioIndividual:{
        borderRadius: 5,
        marginLeft: '2%',
        marginTop: '2%',
        width: '88%'

    },

    usuarioComentario: {
        backgroundColor: 'white',
        height: 25,
    },

    comentarioComentario: {
        marginTop: '2%',
        marginBottom: '10%',
        width: '100%',
    },

    enviar:{
        borderWidth: 1,
        borderRadius: 12,
        marginLeft: 5,
        width: 52,
        height: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#7dffa5",
    },

    
})
