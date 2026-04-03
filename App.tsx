import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { registrarNotificaciones, programarNotificacionDiaria } from './src/utils/notificaciones';

export default function App() {
  useEffect(() => {
    (async () => {
      const ok = await registrarNotificaciones();
      if (ok) await programarNotificacionDiaria();
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <HomeScreen />
    </>
  );
}
