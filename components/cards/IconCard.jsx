import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
  Fontisto,
} from '@expo/vector-icons';

const ICON_MAP = {
  ionic: Ionicons,
  material: MaterialIcons,
  awesome: FontAwesome,
  entypo: Entypo,
  ant: AntDesign,
  feather: Feather,
  awesome5: FontAwesome5,
  community: MaterialCommunityIcons,
  oct: Octicons,
  fontisto:Fontisto,
};

export default function IconCard({ name, type, size = 24, color = 'black' }) {
  const IconComponent = ICON_MAP[type];

  if (!IconComponent) return <View />;

  return (
    <View>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
}
