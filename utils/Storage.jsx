import AsyncStorage from '@react-native-async-storage/async-storage';

export const addStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async (key) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const deleteStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};
