import React, { useContext, useEffect, useState } from 'react';
import { Image,Dimensions,Linking, Text,TouchableOpacity, View, ScrollView,ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
// import ListSection from '../components/listSection'
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import UserInfo from '../components/userSection';
import { UserContext } from '../context/userContext';
import { urlInterface, userInterface } from '../interface';
import AddLink from '../components/addLink';
import ShowLink from '../components/showLink';
import useAsyncStorage from '../hooks/useAsyncStorage';
import UrlSection from '../components/listSection';


  type HomeScreenProps = {
    navigation: StackNavigationProp<ParamListBase, 'Url'>,
  };

function Home({ navigation }: HomeScreenProps){
  const {setUser} = useContext(UserContext);
  const [links,setLinks] = useAsyncStorage([
    {color:'white',backgroundColor:'rgb(10,102,194)',platform:'Linkedin',platformLink:'https://www.linkedin.com/',link:'https://www.linkedin.com/in/vivek-yadav-58357b203/',imageLink:''},
    {color:'white',backgroundColor:'black',platform:'Github',platformLink:'https://www.github.com',link:'https://www.github.com/VivekYadav105',imageLink:''},
    {color:'white',backgroundColor:'#e1306c',platform:'Instagram',platformLink:'www.instagram.com',link:'https://www.github.com/VivekYadav105',imageLink:''},
  ]);
  const {width:parentWidth,height:parentHeight} = Dimensions.get('screen');
  const [link,setLink] = useState('');
  const [linkBar,setLinkBar] = useState(false);
  const [addLink,setAddLink] = useState(false);

  async function openInBrowser(userLink:string){
    try {
      const supported = await Linking.canOpenURL(userLink);
      console.log(userLink);
      if (!supported) {throw new Error('Web view not supported');}
      await Linking.openURL(userLink);
    }
    catch (err:any){
      ToastAndroid.show(err.message,ToastAndroid.SHORT);
    }
  }


  function copyLink(userLink:string){
    try {
      Clipboard.setString(userLink);
    } catch (err){
      console.log(err);
    }
  }

  function showLink(userLink:string){
    setLinkBar(true);
    setLink(userLink);
  }

  const closeAddLink = ()=>{setAddLink(false);};
  const closeShowLink = ()=>{setLinkBar(false);};
  const toShared = ()=>{navigation.navigate('Shared');};


    function createLink(ele:urlInterface){
      //validator function
      closeAddLink();
      setLinks((prev:urlInterface[])=>([...prev,{...ele}]));
    }


    function deleteLink(){

    }

    useEffect(()=>{
      setUser((prev:userInterface)=>({...prev,storedLinks:links.length}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[links]);


    return (
      <View style={{height:parentHeight}}>
        <UserInfo toShared={toShared} userName="user" storedLinks={links.length} sharedLinks={0} publicLink="www.google.com" />
        <View className="relative flex flex-col mt-[20] flex-[1]">
          <ScrollView>
            <View className="flex-1 p-[10] py-[20] bg-grey rounded-2xl mx-[10] h-[300]">
            <UrlSection showLink={showLink} openInBrowser={openInBrowser} links={links}/>
            {linkBar && <ShowLink copyLink={copyLink} deleteLink={deleteLink} link={link} closeShowLink={closeShowLink}/>}
            <TouchableOpacity
            onPress={()=>setAddLink(true)}
            className="bg-[#1f2e73] rounded-lg p-[1] w-[30] h-[30] absolute top-[10] right-[10] flex items-center justify-center"
            >
              <Image className='w-[20] h-[20]' source={require('../assets/images/add-icon.png')}/>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
        {addLink && <AddLink closeAddLink={closeAddLink} createLink={createLink} />}
        <View className="absolute bottom-0 gap-[10] flex flex-row justify-center flex-[1] left-[110] -translate-y-[75px]">
          <TouchableOpacity className="bg-black flex flex-col items-center justify-center p-[10] w-20 gap-[10] relative bottom-[10] rounded-xl" onPress={()=>{
            navigation.navigate('Url');
          }}>
            <Image className="w-[30] h-[30]" source={require('../assets/images/url-icon.png')}/>
            <Text> Url </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black flex flex-col items-center justify-center p-[10] w-20 gap-[10] relative bottom-[10] rounded-xl" onPress={()=>{
            navigation.navigate('Shared');
          }}>
            <Image className="w-[30] h-[30]" source={require('../assets/images/share-icon.png')}/>
            <Text>Share</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
}

export default Home;
