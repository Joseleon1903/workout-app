import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeData = async (key: string , value:any) =>{

    try {

        const stringValue = JSON.stringify(value);

        await AsyncStorage.setItem(key, stringValue);
        
    } catch (ex : any) {
        console.error(ex.message)
        
    }


}


export const getData = async (key: string) =>{

    try {
        const value = await AsyncStorage.getItem(key);

        if(value !== null){

            const data = JSON.parse(value);
            return data;
        }
        
    } catch (ex : any) {
        console.error(ex.message)
        
    }
}

export const containsKey = async (key: string) =>{

    try {
        const keys = AsyncStorage.getAllKeys();
        return (await keys).includes(key);
        
    } catch (ex : any) {
        console.error(ex.message)
    }
}


export const removeItem = async (key: string) =>{
    try {
        await AsyncStorage.removeItem(key);
    } catch (ex : any) {
        console.error(ex.message)
    }
}


