import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/AntDesign";
import { editDestination } from "../../services/DestinationService";
import { useState } from "react";

export default function Card({id, name, difficulty, description, favorites, trigger }){
    const navigation = useNavigation(); 
    const [icon, setIcon] = useState("staro")
    
    async function modifyDestination(){
        try {
            if (icon === "staro") {
                const modifiedDestination = {
                    name,
                    description,
                    difficulty,
                    favorites: Number(favorites + 1),
                };
                await editDestination(id, modifiedDestination);
                setIcon("star");
                trigger((prev)=> prev+1); 
            } else {
                const modifiedDestination = {
                    name,
                    description,
                    difficulty,
                    favorites: Number(favorites - 1),
                };
                await editDestination(id, modifiedDestination);
                setIcon("staro");
                trigger((prev)=> prev+1); 
            }
        } catch (error) {
            console.error("Error modificando el destino", error); 
        }
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id })}
        >
            <Text style={styles.title}>{name}</Text>
            <View style={styles.difficultyStar}>
                {difficulty==="Fácil" ? (<View style={styles.easyContainer}>
                    <Text style={styles.difficulty}>{difficulty}</Text>
                </View>) : null}
                {difficulty==="Moderada" ? (<View style={styles.mediumContainer}>
                    <Text style={styles.difficulty}>{difficulty}</Text>
                </View>) : null}
                {difficulty==="Difícil" ? (<View style={styles.hardContainer}>
                    <Text style={styles.difficulty}>{difficulty}</Text>
                </View>) : null}

                <TouchableOpacity onPress={modifyDestination}>
                    <Icon name={icon} size={30} style={styles.star}/>
                </TouchableOpacity>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 20,
        borderRadius: 30,
        marginTop: 20
    },
    title: {
        fontWeight: '800', 
        fontSize: 25
    }, 
    difficulty: {
        fontSize: 18,
    },
    easyContainer: {
        backgroundColor: '#b5e48c', 
        padding: 10,
        borderRadius: 50
    }, 
    mediumContainer: {
        backgroundColor: '#ffef9f', 
        padding: 10,
        borderRadius: 50
    },
    hardContainer: {
        backgroundColor: '#c77dff', 
        padding: 10,
        borderRadius: 50
    },
    star: {
        color: '#edc531'
    }, 
    difficultyStar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    }
});