import React, {useState, useContext, useEffect} from 'react';
import {View, 
        TouchableOpacity,
        Text,
        StyleSheet,
        ActivityIndicator,
        FlatList,
        Dimensions
        } from 'react-native';

import Icon from 'react-native-vector-icons/Feather.js';

import { AuthContext } from "../context/auth";

let MateriasSelecionadas = [];

const WIDTH = Dimensions.get('window').width;

export const TagGroup =({ tags }) => {

    // Variável para inserir ou retirar as tags de disponibilidade
    const [tagsAvancadasEscolhidas, setTagsAvancadasEscolhidas] = useState([]);

    return(
        
            <FlatList 
                style={{ height: '80%', }}
                contentContainerStyle={styles.containerFlatlist}
                data={tags}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => String(tags.indexOf(item))}
                renderItem={({ item })  => {

                    return (

                        <TouchableOpacity
                            style={styles.botoes}
                            key={String(tags.indexOf(item))}
                            onPress={ ( ) =>  {


                                tagsAvancadasEscolhidas.includes(item) ? 
                                setTagsAvancadasEscolhidas(tagsAvancadasEscolhidas.filter(tagsAvancadasEscolhidas => tagsAvancadasEscolhidas !== item)) :
                                setTagsAvancadasEscolhidas([...tagsAvancadasEscolhidas, item]); 

                                }
                            }
                        >

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                            {tagsAvancadasEscolhidas.includes(item) ? 
                            
                            <>
                            <Icon name='check' size={25} style={{marginRight: 5}}/>
                            <Text>{item}</Text>
                            </> :

                            <Text>{item}</Text>

                            }

                        </View>
                    
                        </TouchableOpacity> 
                        )
                    }
                }
            />

    )

}

const styles = StyleSheet.create({

    containerFlatlist:{ 
        justifyContent: 'center', 
        alignContent: 'center',
        alignSelf: 'center',
        height: '100%', 
    },

    botoes: { 
        height: 40, 
        borderRadius: 15,
        backgroundColor: "#4fff85",
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        padding: 12,
        marginLeft: 6,
        marginRight: 6,
        elevation: 10,
    },

});