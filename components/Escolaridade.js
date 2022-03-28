import React from 'react'
import { 
    Text, View,  
    TouchableOpacity, 
    Dimensions, 
    ScrollView} from 'react-native'

const OPTIONS = ['1° ano do EM', '2° ano do EM', '3° ano do EM', 'Cursinho', 'Ensino superior', 'Pós-graduação'] 

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Escolaridade = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibilityEscolaridade(false);
        props.setEscolaridade(option);
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
                style={{
                    alignItems:"flex-start",
                }}>
                <Text 
                    style={{                        
                        margin: 20,
                        fontSize: 14,
                        color: 'black'
                    }}>
                    {item}
                </Text>

            </TouchableOpacity>
        )
    })

    return (
        <View style={{backgroundColor: "white"}}>
            <TouchableOpacity
                onPress={() => props.changeModalVisibilityEscolaridade(false)}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <View
                    style={[{
                        backgroundColor: "white",
                        opacity: 1,
                        borderRadius: 10,
                        borderWidth: 1
                    }, {width: WIDTH-20, height: HEIGHT/2}]}>
                    <ScrollView>
                        {option}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </View>
    )

}


export {Escolaridade}