import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { addDestination } from "../../services/DestinationService";

export default function Add(){  
    const navigation = useNavigation(); 

    const [name, setName] = useState();
    const [description, setDescription] = useState(); 
    const [difficulty, setDifficulty] = useState(); 

    async function postDestination(){
        try {
            const newDestination = {
                name,
                description,
                difficulty,
                favorites: Number(0),
            }
            await addDestination(newDestination); 
            navigation.navigate('Home'); 
        } catch (error) {
            console.error("Error añadiendo destino", error); 
        }
    }

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.homeContainer}>
                    <Text style={styles.title}>CREAR DESTINO</Text>
                    <View style={styles.infoContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.boldText, styles.text]}>Nombre</Text>
                            <TextInput 
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.boldText, styles.text]}>Descripcion</Text>
                            <TextInput 
                                value={description}
                                onChangeText={setDescription}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.boldText, styles.text]}>Dificultad</Text>
                            <TextInput 
                                value={difficulty} 
                                onChangeText={setDifficulty}
                                style={styles.input}
                            />
                        </View>
                       
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Canelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={postDestination}>
                            <Text style={styles.buttonText}>Agregar destino</Text>
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
      justifyContent: 'space-around'
    },
    title: {
        fontWeight: 800,
        fontSize: 30,
        color: '#52b69a'
    }, 
    buttonContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 20
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 20, 
    }, 
    saveButton: {
        backgroundColor: '#52b69a',
        padding: 15,
        borderRadius: 50,
        width: '50%'
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 15,
        borderRadius: 50,
        width: '50%'
    }, 
    boldText: {
        fontWeight: 'bold'
    }, 
    text: {
        fontSize: 20, 
    }, 
    infoContainer: {
        gap: 20,
        width: '100%'
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
    input: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10, 
        borderRadius: 50,
        fontSize: 18
    }, 
    inputContainer: {
        gap: 5
    }
});
  