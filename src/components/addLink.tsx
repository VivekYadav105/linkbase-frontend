import {View,TextInput,Text,Image,ActivityIndicator,Keyboard ,TouchableOpacity,Dimensions, ToastAndroid} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

interface linkInterface{
    platform:string,
    platformLink:string,
    link:string,
    color:string,
    backgroundColor:string,
    imageLink:string
  }

interface componentProps{
    closeAddLink:()=>void,
    createLink:(ele:linkInterface)=>void
}

const AddLink:React.FC<componentProps> = function({closeAddLink,createLink}){
    const {height:parentHeight} = Dimensions.get('screen');
    const wrapperRef = useRef(null);
    const [error,setError] = useState('');
    const [platform,setPlatform] = useState('');
    const [platformLink,setPlatformLink] = useState('');
    const [link,setLink] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        console.log(platform);
        setPlatformLink(`https://www.${platform.toLowerCase().trim()}.com`);
    },[platform]);


    const handleSubmit = async()=>{
        try {
            setLoading(true);
            Keyboard.dismiss();
            const resPlatform = await fetch(platformLink,{mode:'cors'});
            if (!resPlatform.ok) {throw new Error('Please check the platform');}
            const resLink = await fetch(link,{mode:'cors'});
            if (!resLink.ok) {throw new Error('please check the link.');}
            setLoading(false);
            // const colors = await getColors(`https://api.faviconkit.com/${platform.toLowerCase().trim()}.com/64`,{fallback:"#2ff3f4",key:`https://api.faviconkit.com/${platform.toLowerCase().trim()}.com/64`,cache:false})
            // console.log(colors)
            createLink({platform,platformLink,link,backgroundColor:'',color:'',imageLink:`https://api.faviconkit.com/${platform.toLowerCase().trim()}.com/64`});
        } catch (err:any){
            setError(err.message);
            console.log(err);
        }
    };

    useEffect(()=>{
        if (error){
            ToastAndroid.show(error,ToastAndroid.SHORT);
            setError('');
        }
    },[error]);

    return (
            <LinearGradient
            ref={wrapperRef}
            colors={['#8BC6EC', '#9599E2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="bg-blue-500 w-[300] rounded-xl p-[10] px-[20] absolute top-[250] -translate-y- left-10"
            >
            {loading && (
            <View className="absolute flex-1 bg-blue-800 text-white z-1000 w-[200] h-[150] rounded-[20] top-[20] left-[50] flex justify-center items-center"
            >
            <ActivityIndicator size="large" color="#fff"/>
                <Text>Loading</Text>
            </View>
            )}
            <View className='pt-[10]'>
                <TouchableOpacity className="self-end w-[25] h-[25] items-center justify-center bg-white border-2 border-black rounded-full" onPress={closeAddLink}>
                    <Image className='w-[15] h-[15]' source={require('../assets/images/close-icon.png')}/>
                </TouchableOpacity>
                <View className="my-[10]">
                    <View className="flex flex-row gap-[5] pb-[2]">
                        <Text>Platform</Text>
                        <Image source={{uri:`https://api.faviconkit.com/${platform.toLowerCase().trim()}.com/64`}} className='w-[20] h-[20] border-2'/>
                    </View>
                    <TextInput className="border-2 border-white rounded-xl p-0 px-[10]" onChangeText={(value)=>{
                        setPlatform(value);
                    }} />
                </View>
            </View>
            <View className='mt-[10]'>
                <TextInput className="border-2 border-white rounded-xl p-0 px-[10]" defaultValue="https://www." onChangeText={(value)=>{setLink(value);}}/>
            </View>
            <View className="flex justify-cente mt-[10] items-center flex-[1]">
                <TouchableOpacity className="border-2 border-white rounded-xl py-[5] px-[10] flex-[0] flex items-center justify-center w-[100]" onPress={handleSubmit}>
                    <Text className='font-bold'>Submit</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default AddLink;
