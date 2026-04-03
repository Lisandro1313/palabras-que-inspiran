import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getFraseDelDia } from '../data/frases';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registrarNotificaciones(): Promise<boolean> {
  if (!Device.isDevice) return false;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('frases', {
      name: 'Frase del día',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  return true;
}

export async function programarNotificacionDiaria(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const frase = getFraseDelDia();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '✨ Tu frase del día',
      body: `"${frase.texto.substring(0, 80)}..."`,
      data: { fraseId: frase.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });
}
