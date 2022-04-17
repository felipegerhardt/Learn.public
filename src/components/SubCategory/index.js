import React from 'react'
import { 
    Text, View,  
    TouchableOpacity, 
    Dimensions, 
    ScrollView} from 'react-native'

const OPTIONS = ['Revolução Francesa', '2a Guerra Mundial', '1a Guerra Mundial', 'Revolução Industrial', 'Guerra dos cem anos', 'Guerra Fria'] 
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SubCategory = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibilitySubCategory(false);
        props.setSubCategory(option);
    }

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
                style={{
                    alignItems:"flex-start"
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
        <TouchableOpacity
            onPress={() => props.changeModalVisibilitySubCategory(false)}
            style={{
                flex:1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            <View
                style={[{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderWidth: 1
                }, {width: WIDTH-20, height: HEIGHT/2}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )

}


export {SubCategory}