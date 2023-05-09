import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './style';
export const Button = ({title, img}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        style={styles.buttonImg}
        source={img ? img : require('../../assets/taxiBlack.png')}
      />
      <Text style={{color: '#fff', paddingLeft: 10}}>{title}</Text>
    </TouchableOpacity>
  );
};
