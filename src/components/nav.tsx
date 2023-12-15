import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

function NavBar() :JSX.Element{
    return (
        <View className="flex absolute bottom-0 flex-row bg-black justify-space-between"
        >
            <TouchableOpacity className="flex flex-column items-center justify-center">
                <Image source={require('../images/home-icon.png')}/>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-column items-center justify-center">
                <Image source={require('../images/url-icon.png')}/>
                <Text>Url</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NavBar;
