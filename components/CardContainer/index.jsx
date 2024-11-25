import { View, StyleSheet, FlatList } from "react-native";
import Card from "../Card";

export default function CardContainer({destinations, trigger}){
    return (
        <FlatList
            style={styles.container}
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => 
                <Card
                    key= {item.id}
                    id={item.id}
                    name={item.name}
                    difficulty={item.difficulty}
                    description={item.description}
                    favorites={item.favorites}
                    trigger={trigger}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        height: '100%',
        width: '100%',
        gap: 20
    }
});