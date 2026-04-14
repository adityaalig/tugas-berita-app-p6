import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export const shareArticle = async (url: string, title: string) => {
  const isAvailable = await Sharing.isAvailableAsync();
  if (isAvailable) {
    await Sharing.shareAsync(url, { dialogTitle: title });
  } else {
    alert('Sharing tidak tersedia di perangkat ini');
  }
};