
export const getAllDestinations = async() => {
    try {
        const response = await fetch (`http://172.20.10.3:8000/destinations`, {
            method: "GET"
        }) 
        const data = await response.json();
        return data; 
    } catch (error) {
        console.log('Error obteniendo destinos', error)
    }
}

export const getDestinationById = async(id) => {
    try {
        const response = await fetch (`http://172.20.10.3:8000/destinations/${id}`, {
            method: "GET"
        }) 
        const data = await response.json();
        return data;   
    } catch (error) {
        console.log('Error obteniendo destino por id', error)
    }
}

export const addDestination = async(newDestination) => {
    try {
        const response = await fetch (`http://172.20.10.3:8000/destinations`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDestination),
        }) 
        const data = await response.json();
        return data;   
    } catch (error) {
        console.log('Error añadiendo nuevo destino', error)
    }
}

export const deleteDestination = async(id) => {
    try {
        const response = await fetch (`http://172.20.10.3:8000/destinations/${id}`, {
            method: "DELETE"
        }) 
        const data = await response.json();
        return data;   
    } catch (error) {
        console.log('Error eliminando el destino', error)
    }
}

export const editDestination = async(id, editedDestination) => {
    try {
        const response = await fetch (`http://172.20.10.3:8000/destinations/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedDestination),
        }) 
        const data = await response.json();
        return data;   
    } catch (error) {
        console.log('Error editando destino', error)
    }
}





