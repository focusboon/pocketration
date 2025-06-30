 
import React from 'react';
import { Image } from 'react-native';

const SliderCard = ({ uri }) => {
  return (
    <Image
      source={{ uri: uri }}
      className="w-64 h-36 rounded-2xl mr-4"
    />
  );
};

export default SliderCard;
