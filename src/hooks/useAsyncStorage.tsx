import { useEffect, useState,Dispatch,SetStateAction} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LinkItem {
  color: string;
  backgroundColor: string;
  platform: string;
  platformLink: string;
  link: string;
  imageLink: string;
}

function useAsyncStorage(intialValue:LinkItem[]): [LinkItem[], Dispatch<SetStateAction<LinkItem[]>>]{
    const [items,setItems] = useState<any>([])
    
    useEffect(()=>{
        const fetchItems = async () => {
            const links = await AsyncStorage.getItem("LinkBaseLinks");
            if (links) {
              setItems(JSON.parse(links));
            } else {
              setItems(intialValue);
            }
          };
          fetchItems();      
    },[])

    useEffect(()=>{
        AsyncStorage.setItem("LinkBaseLinks",JSON.stringify(items))
    },[items])
    return [items,setItems]
}

export default useAsyncStorage