import React from 'react';
import { View,TextInput,Text,StyleSheet } from 'react-native';
import {urlInterface} from '../interface';

function UserLink(link:urlInterface,changeLink:()=>void){
    return (
        <View className="bg-transparent border-2 mx-[10] p-[10] rounded-xl border-[#1F2E73]">
            <Text className="bg-white text-[#1F2E73] text-sm absolute top-0 left-[10]">{link.platform}</Text>
            <TextInput defaultValue={link.link} onChange={changeLink}/>
        </View>
    );
}

export default UserLink;
