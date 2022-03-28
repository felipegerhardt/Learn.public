import React, {useState} from 'react'
import {View, 
        StyleSheet, 
        TouchableOpacity, 
        Text,
        Image,
        Keyboard} from 'react-native'
        

import Icon from 'react-native-vector-icons/FontAwesome';


export function Comentarios({ autor, conteudo, likes, id }){


    const [likeComent, setLikeComent] = useState(false)
    
        return(
            <View style={styles.containerComentarios}>

                <Image 
                    source={require("../assets/felipe_perfil.png")}
                    style={styles.imagemComentario}
                    /> 

                <View style={styles.containerComentarioInterno}>
                    <View style={styles.containerComentarioIndividual}>

                        <TouchableOpacity style={styles.usuarioComentario}>
                            <Text style={{ marginLeft: '2%'}}>@{autor}</Text>
                        </TouchableOpacity>

                        <View style={styles.containerConteudo}>
                            <Text style={styles.comentario}>{conteudo}</Text>
                        </View>

                    </View>

                    <TouchableOpacity style={styles.CurtirComentario} onPress={() => setLikeComent(!likeComent)}>

                        <Icon name="heart" size={12} style={{alignSelf: 'center'}}
                            color={likeComent ? 'green' : 'grey'}/>
                        
                        <Text style={{alignSelf: 'center'}}>
                            {likeComent ? 
                            String(likes + 1) : 
                            likes === 0 ? '' :
                            String(likes) 
                            }
                        </Text>

                    </TouchableOpacity>
                    

                </View>

            </View>
        )
    }


const styles = StyleSheet.create({

    CurtirComentario:{
        alignSelf: 'center',
        alignItems: 'flex-end',
        width: '10%',
    },


    imagemComentario:{
        marginTop: 5,
        marginLeft: 5,
        width: 40,
        height: 40,
        resizeMode: 'cover', 
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
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white'
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

    containerConteudo:{
        width: '100%', 
        borderWidth: 1, 
        borderRadius: 7, 
        marginBottom: '3%',
        paddingLeft: 5,
        paddingRight: 5,
        },


    comentario: {
        marginTop: '2%',
        marginBottom: '10%',
        width: '100%',
    },
})
