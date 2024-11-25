import { View, StyleSheet, TouchableOpacity, Text, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native";

export default function AddDestinationButton(){
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Add')}
        >
            <Text style={styles.text}>
                {Platform.OS === 'ios' ? "Crear destino" : "Agregar destino"}
             </Text>  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: Platform.select ({
        ios: {
            fontSize: 18,
            alignSelf: 'center',
            color:'white'
        }, 
        android: {
            fontSize: 18,
            alignSelf: 'center', 
        }
      
    }), 
    button: Platform.select ({
        ios: {
            backgroundColor: '#52b69a', 
            padding: '20', 
            width: '50%',
            borderRadius: 50
        }, 
        android: {
            backgroundColor: '#1e6091', 
            padding: '20', 
            width: '50%',
            borderRadius: 50
        }  
    }) 
});