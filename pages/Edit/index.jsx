import { View, ImageBackground, TouchableOpacity, TextInput, Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { editDestination } from "../../services/DestinationService";

export default function Edit({route}){ 
    const {destination} = route.params; 
    const navigation = useNavigation(); 

    const [name, setName] = useState(destination.name); 
    const [description, setDescription] = useState(destination.description); 
    const [difficulty, setDifficulty] = useState(destination.difficulty); 
    const [favorites, setFavorites] = useState(destination.favorites); 

    async function modifyDestination(){
        try {
            const modifiedDestination = {
                name,
                description,
                difficulty,
                favorites: Number(favorites), 
            }
            await editDestination(destination.id, modifiedDestination); 
            navigation.navigate('Details', {id: destination.id}); 
        } catch (error) {
            console.error("Error editando el destino", error); 
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeContainer}>
                <Text style={styles.title}>Editar {destination.name}</Text>
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
                        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Details', {id: destination.id})}>
                            <Text style={styles.buttonText}>Canelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={modifyDestination}>
                            <Text style={styles.buttonText}>Guardar cambios</Text>
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
  