import { urlInterface } from '../interface';
import React from 'react';
import Button from './button';
import {FlatList,View,ListRenderItem,Linking,StyleSheet,ToastAndroid,Alert,Text} from 'react-native';

export function FlatListVersion(props:any){

    const renderItem:ListRenderItem<urlInterface> = ({item})=>{

        async function openInBrowser(link:string){
          try {
            const supported = await Linking.canOpenURL(link);
            console.log(supported);
            if (!supported) {throw new Error('Web view not supported');}
            await Linking.openURL(link);
          }
          catch (err:any){
            Alert.alert('error',err.message,[{text:'OK'}]);
            ToastAndroid.show(err.message,ToastAndroid.SHORT);
          }
        }

        return <Button
        key={item.platform}
        onLongPress={()=>props.showLink(item.link)}
        image={item.platform ?
            {uri:`https://api.faviconkit.com/${item.platform.toLowerCase().trim()}.com/64`} :
            require('../assets/images/url-icon.png')}
        textStyle={{color:item.color || '#f9f2f3'}}
        buttonStyle={{backgroundColor:item.backgroundColor || '#0fdf02'}}
        link={item.link}
        title={item.platform}
        handlePress={()=>openInBrowser(item.link)}/>;
      };

    return (
        <FlatList data={props.links} numColumns={2} renderItem={renderItem} keyExtractor={(item:any)=>(item.platform)}/>
    );
}

export default function UrlSection(props:any){
    return (
        <View className='flex-row flex-wrap flex-shrink-0 flex-grow-0 justify-center rounded-lg'>
        {/* <ListSection showLink={showLink} links={links}></ListSection> */}
        {!props.links.length && <Text className="w-[250] text-white text-[25] top-[50] absolute text-center">No links are present.Please add them </Text>}
        {props.links && props.links.map((ele:urlInterface)=>(
           <Button
           key={ele.platform}
           onLongPress={()=>props.showLink(ele.link)}
           image={ele.platform ?
               {uri:`https://api.faviconkit.com/${ele.platform.toLowerCase().trim()}.com/64`} :
               require('../assets/images/url-icon.png')}
           textStyle={{color:ele.color || '#f9f2f3'}}
           buttonStyle={{backgroundColor:ele.backgroundColor || '#0fdf02',margin:5}}
           link={ele.link}
           title={ele.platform}
           handlePress={()=>props.openInBrowser(ele.link)}/>
        ))}
    </View>

    );
}
