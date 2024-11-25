import { View, ImageBackground, TouchableOpacity, Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getDestinationById, deleteDestination } from "../../services/DestinationService";
import Icon from "react-native-vector-icons/Ionicons";

export default function Details({route}){  
    const {id} = route.params; 
    const [destination, setDestination] = useState([]); 
    const navigation = useNavigation(); 

    async function getDestination(){
        try {
            const data = await getDestinationById(id); 
            setDestination(data);  
        } catch (error) {
            console.error('Error obteniendo destino por id', error)
        }
    }

    useEffect(() => {
        getDestination(); 
    }, []);


    async function eraseDestination(){
        try {
            await deleteDestination(id); 
            navigation.navigate('Home')
        } catch (error) {
            console.error("Error eliminando el destino", error); 
        }
    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.homeContainer}>
                <View style={styles.titleAndBack}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                            <Icon name='arrow-back' size={20} style={styles.back}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{destination.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={styles.text}><Text style={[styles.boldText, styles.text]}>Descripción:</Text> {destination.description}</Text>
                    <Text style={styles.text}><Text style={[styles.boldText, styles.text]}>Dificultad:</Text> {destination.difficulty}</Text>
                    <Text style={styles.text}><Text style={[styles.boldText, styles.text]}>Favoritos:</Text> {destination.favorites}</Text>
                </View>  
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={eraseDestination}>
                        <Text style={styles.buttonText}>Borrar destino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit', { destination })} > 
                        <Text style={styles.buttonText}>Editar destino</Text>
                    </TouchableOpacity>
                </View>
                </View> 
                
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
       backgroundColor: '#d8e2dc'
    },
    homeContainer: {
      alignItems:'center',
      width: '85%', 
      height: '85%', 
      gap: 20, 
      display: 'flex', 
      justifyContent: 'space-between'
    },
    title: {
        fontWeight: 800,
        fontSize: 40,
        color: '#52b69a', 
    }, 
    buttonContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 20
    },
    boldText: {
        fontWeight: 'bold'
    }, 
    text: {
        fontSize: 20, 
    }, 
    infoContainer: {
        gap: 10
    }, 
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row', 
        gap: 10
    }, 
    button: {
        flex: 1,
        backgroundColor: 'white',
        padding: 15, 
        borderRadius: 50
    }, 
    buttonText: {
        alignSelf: 'center', 
        fontSize: 18
    }, 
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 5,
        borderRadius: 50, 
        width: '100%'
    }, 
    back: {
        alignSelf: 'center'
    },
    titleAndBack: {
        width: '100%', 
        alignItems: 'center',
        gap: 10
    },
      editButton: {
          backgroundColor: '#52b69a',
          padding: 15,
          borderRadius: 50,
          width: '50%'
      },
      deleteButton: {
        backgroundColor: '#bc4749',
        padding: 15,
        borderRadius: 50,
        width: '50%'
    }, 
});
  