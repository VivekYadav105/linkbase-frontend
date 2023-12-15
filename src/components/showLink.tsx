import React from 'react';
import {TextInput,TouchableWithoutFeedback,View,TouchableOpacity,Image,StyleSheet} from 'react-native';

interface componentProps{
    link:string,
    copyLink:(link:string)=>void,
    closeShowLink:()=>void,
    deleteLink:(id:string)=>void
}


function ShowLink(props:componentProps){
    return (
        <TouchableWithoutFeedback onPress={props.closeShowLink}>
        <View style={{display:'flex'}} className="absolute border-2 z-40 w-[300] rounded-xl bg-white border-blue-500 mx-auto flex">
          <TextInput defaultValue={props.link} className="w-[250] rounded-xl pe-[30] text-blue-500 overflow-scroll" onBlur={props.closeShowLink}/>
          <View className="absolute top-[7.5] -right-1 h-[50] rounded-tr-xl rounded-br-xl bg-blue-600 gap-2 px-[5] flex flex-row justify-center items-center">
          <TouchableOpacity onPress={()=>props.copyLink(props.link)} className="bg-blue-500 w-[30] h-[40] flex items-center justify-center rounded-full">
              <Image source={require('../assets/images/copy-icon.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.copyLink(props.link)} className="bg-blue-500 w-[30] h-[40] flex items-center justify-center rounded-full">
              <Image source={require('../assets/images/delete-icon.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}

export default ShowLink;
