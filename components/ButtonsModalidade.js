import React, {useState, useContext} from 'react'
import {View, 
        StyleSheet, 
        TouchableHighlight, 
        Text,
        } from 'react-native';


import { AuthContext } from "../context/auth"; 


export const ButtonGroup =({ buttons }) => {

    const { pegarCategoria } = useContext(AuthContext);
    const [clickedId, setClickedId] = useState(4)

    const handleClick = (id, Label) => {
        setClickedId(id);
        pegarCategoria(Label);      
    };

    return(

        <View style={styles.buttonView}>

            {

                buttons.map((buttonLabel, index) => {
                    return(   

                        <TouchableHighlight
                            onPress={() => {handleClick(index, buttonLabel);}}
                            underlayColor="transparent"
                            key={index}
                            style={[
                                index === 2 ? 
                                    styles.unclickedbuttonStyle 
                                    : 
                                    "",
                                index === clickedId ? 
                                    styles.clickedbuttonStyle 
                                    : 
                                    styles.unclickedbuttonStyle,
                                ]}
                            >
                            <Text>
                                {buttonLabel}
                            </Text>
                        </TouchableHighlight>

                    )
                })

            }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center", 
        justifyContent: 'center',

    },

    unclickedbuttonStyle: {
        borderRadius: 10,
        alignItems: "center",
        width: "25%",
        height: 42,
        backgroundColor: "#4fff85",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        marginHorizontal: 10,

    },

    clickedbuttonStyle: {
        borderRadius: 10,
        alignItems: "center",
        width: "25%",
        backgroundColor: "#41d66f",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        height: 42,
        marginHorizontal: 10,
    },


    
})
