import React from 'react';
import { FlatList } from 'react-native';
import UserLink from '../components/UserLink';
import { useSelector } from 'react-redux';


function UrlScreen():JSX.Element{
    const links = useSelector((state:any)=>state.links);
    return (
        <FlatList data={links}
        renderItem={(item:any)=><UserLink platform={item.platform}
        platformLink={item.platformLink}
        backgroundColor=""
        color="" link={item.link}
        imageLink={item.imageLink}/>}/>
    );
}

export default UrlScreen;
