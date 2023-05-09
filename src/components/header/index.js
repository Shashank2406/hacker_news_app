import React from 'react';
import {Image, Pressable} from 'react-native';

export const Header = ({goBack}) => {
  return (
    <Pressable style={{height: 80, justifyContent: 'center'}} onPress={goBack}>
      <Image
        style={{tintColor: 'black'}}
        source={require('../../assets/back_arrow.png')}
      />
    </Pressable>
  );
};
