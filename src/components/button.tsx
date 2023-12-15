import React from 'react';
import {TouchableOpacity,Text,Image,StyleSheet,ImageSourcePropType, StyleProp,ViewStyle,TextStyle, TouchableOpacityProps, View} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string,
    buttonStyle?: StyleProp<ViewStyle>,
    handlePress?:()=>void,
    onLongPress?:()=>void,
    textStyle?:StyleProp<TextStyle>,
    image?:ImageSourcePropType,
    link:string,
    borderColor?:string
  }

const ButtonOutline:React.FC<CustomButtonProps> = ({title,buttonStyle,textStyle,image,handlePress,onLongPress,borderColor})=>{
    return (
        <TouchableOpacity style={[buttonStyle]} className="border border-gray-700 border-opacity-75 border-solid px-[2px] py-[1px] rounded-md flex flex-row items-center"
        onLongPress={onLongPress} onPress={handlePress}>
            <Text style={textStyle} className="text-md font-bold text-center p-[10]">{title}</Text>
            {image && (
            <View className="border-l-2 h-[32] p-1.5" style={{borderLeftColor:borderColor}}>
                <Image source={image} className="w-5 h-5 rounded-full"/>
            </View>
            )}
        </TouchableOpacity>
    );
};

export default ButtonOutline;
