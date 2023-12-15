import React,{ useContext, useEffect, useState } from "react"
import { Image, StyleSheet,TouchableNativeFeedback, Text, View,Dimensions,TouchableOpacity,TouchableWithoutFeedback } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard';
import { UserContext } from "../context/userContext";

interface userInfoProps{
    userName:string,
    publicLink:string,
    storedLinks?:number,
    sharedLinks?:number,
    toShared:()=>void
}

function UserInfo(props:userInfoProps){
    const { width: parentWidth } = Dimensions.get('screen');
    const [menu,setMenu] = useState(false)
    const {setUser,user} = useContext(UserContext)

    function toogleMenu(){
        setMenu((prev)=>(!prev))
    }

    function changePublicLink(){

    }

    useEffect(()=>{
        setUser((prev:any)=>({...prev,
            _id:"",
            userName:"Vivek Yadav",
            storedLinks:props.storedLinks,
            sharedLinks:0,
            publicLink:"github.com/VivekYadav105"
        }
        ))
    },[])

    return(
        <View className="flex flex-row justify-around rounded-xl items-center rounded-tl-xl rounded-tr-xl bg-[#1F2E73] p-[20] relative pb-[40]">
            <View>
                <Image className="rounded-full aspect-w-1 aspect-h-1 object-contain m-auto w-[100] h-[100] bg-opacity-[0.2] bg-white" source={require('../assets/images/defaultUser.png')}/>
                <Text className="text-xl text-center">{user&&user.userName}</Text>
            </View>
            <View className="w-[125] flex">
                 <View className="bg-white text-black p-[10] rounded-xl border-[2] mb-[20]">
                    <Text style={{color:"black"}}>Links Created</Text>
                    <Text style={{color:"black",fontWeight:"600",fontSize:20}}>{user&&user.storedLinks}</Text>
                </View>
                <TouchableOpacity className="bg-transparent border-2 border-white text-white p-[10] rounded-xl mb-[20]" onPress={props.toShared}>
                    <Text style={{color:"white"}}>Links Shared</Text>
                    <Text style={{color:"white",fontWeight:"600",fontSize:20}}>{user&&user.sharedLinks}</Text>
                </TouchableOpacity>
            </View>
        <TouchableNativeFeedback onLongPress={()=>{setMenu(true)}} onPress={()=>user&&Clipboard.setString(user.publicLink)}>
            <View className="absolute bottom-[2] p-[5] left-0 bg-white flex flex-[1]" style={{width:parentWidth}}>
                <Text style={{color:"black",textAlign:"center",fontWeight:"500"}}>
                    {user&&user.publicLink}
                </Text>
                {menu&&(
                    <View style={{position:"absolute",flexDirection:"row",gap:10,backgroundColor:"black",padding:10,borderRadius:20,top:10,right:10,zIndex:100}}>
                    <TouchableOpacity onPress={()=>{user&&Clipboard.setString(user.publicLink)}} style={{backgroundColor:"#ffffff80",padding:5,borderRadius:20}}>
                        <Image style={{width:20,height:20}} source={require('../assets/images/copy-icon.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changePublicLink} style={{borderRadius:20,backgroundColor:"#ffffff80",alignItems:"center",justifyContent:"center",padding:5}}>
                        <Image style={{width:20,height:20}} source={require('../assets/images/edit-icon.png')}/>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        </TouchableNativeFeedback>
        </View>
    )
}

export default UserInfo