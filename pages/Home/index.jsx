import { View, ImageBackground, Text, StyleSheet, SafeAreaView, Platform} from "react-native";
import { useEffect, useState } from "react";
import { getAllDestinations } from "../../services/DestinationService";
import CardContainer from "../../components/CardContainer";
import AddDestinationButton from "../../components/AddDestinationButton";

export default function Home(){
    const [destinations, setDestinations] = useState([]); 
    const [trigger, setTrigger] = useState(0); 

    async function getDestinations() {
        try {
           const data = await getAllDestinations();
           sortDestinations(data); 
           console.log(destinations); 
        } catch (error) {
            console.error("Error obteniendo destinos", error); 
        }
    }

    function sortDestinations(data){
        const sortedDestinations = [...data].sort((a, b) => {
            const favoritesA = Number(a.favorites);
            const favoritesB = Number(b.favorites);
            return favoritesB - favoritesA;
        });
        setDestinations(sortedDestinations); 
    }

    useEffect(() => {
        getDestinations(); 
    }, [trigger]); 


    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.homeContainer}>
                    <Text style={styles.title}>ASISTENTE DE VIAJES</Text>
                    <CardContainer 
                        destinations={destinations}
                        trigger={setTrigger}
                    />
                    <View style={styles.buttonContainer}>
                        <AddDestinationButton></AddDestinationButton>
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
      gap: 20
    },
    title: {
      fontWeight: 800,
      fontSize: 30,
      color: '#52b69a'
    }, 
    buttonContainer: Platform.select ({
        ios: {
            display: 'flex', 
            flex: 1,
            width: '100%',
            flexDirection: 'row', 
            justifyContent: 'flex-end'
        }, 
        android: {
            display: 'flex', 
            flex: 1,
            width: '100%',
            flexDirection: 'row', 
            justifyContent: 'flex-start'
        }
    })
});
  