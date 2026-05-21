import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Sun, CloudRain, Droplets, Thermometer } from 'lucide-react-native';

import * as Location from 'expo-location';

export default function Index() {
  const [clima, setClima] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [indexDia, setIndexDia] = useState(1);

  const [ubicacion, setUbicacion] = useState('Cargando ubicación...');

  // OBTENER CLIMA
  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&past_days=1&forecast_days=2&timezone=auto`;

      const response = await fetch(url);

      const data = await response.json();

      setClima(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let subscription: any;

    const startTracking = async () => {
      try {
        // PEDIR PERMISO
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log('Permiso denegado');
          return;
        }

        // UBICACIÓN EN TIEMPO REAL
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 1,
          },

          async (location) => {
            const lat = location.coords.latitude;

            const lon = location.coords.longitude;

            // OBTENER NOMBRE DEL LUGAR
            try {
              const direccion = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: lon,
              });

              console.log(direccion);

              if (direccion.length > 0) {
                const lugar =
                  direccion[0].district ||
                  direccion[0].city ||
                  direccion[0].subregion ||
                  direccion[0].region ||
                  'Villa Riachuelo';

                setUbicacion(lugar);
              } else {
                setUbicacion('Villa Riachuelo');
              }
            } catch {
              setUbicacion('Villa Riachuelo');
            }

            // ACTUALIZAR CLIMA
            fetchWeather(lat, lon);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // LOADING
  if (loading || !clima) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f172a',
        }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // TEMPERATURA CENTRAL
  const tempCentral =
    indexDia === 1
      ? Math.round(clima.current.temperature_2m)
      : Math.round(
          (clima.daily.temperature_2m_max[indexDia] + clima.daily.temperature_2m_min[indexDia]) / 2
        );

  // FECHAS
  const fechas = (() => {
    const hoy = new Date();

    return [-1, 0, 1].map((offset) => {
      const d = new Date(hoy);

      d.setDate(hoy.getDate() + offset);

      return `${d.getDate()}/${d.getMonth() + 1}`;
    });
  })();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#0f172a',
        padding: 20,
      }}>
      {/* UBICACIÓN */}
      <Text
        style={{
          color: 'white',
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 10,
        }}>
        {ubicacion}
      </Text>

      {/* FECHAS */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 25,
        }}>
        {fechas.map((f, i) => (
          <TouchableOpacity key={i} onPress={() => setIndexDia(i)}>
            <Text
              style={{
                color: i === indexDia ? 'white' : '#94a3b8',

                fontWeight: i === indexDia ? 'bold' : 'normal',

                fontSize: 18,
              }}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ICONO */}
      <View
        style={{
          alignItems: 'center',
          marginVertical: 30,
        }}>
        {clima.daily.rain_sum[indexDia] > 0 ? (
          <CloudRain size={120} color="white" />
        ) : (
          <Sun size={120} color="white" />
        )}
      </View>

      {/* MÉTRICAS */}
      <View style={{ alignItems: 'center' }}>
        {/* HUMEDAD */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Droplets color="white" />

          <Text
            style={{
              color: 'white',
              fontSize: 18,
              marginLeft: 10,
            }}>
            {clima.current.relative_humidity_2m}%
          </Text>
        </View>

        {/* PRECIPITACIÓN */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <CloudRain color="white" />

          <Text
            style={{
              color: 'white',
              fontSize: 18,
              marginLeft: 10,
            }}>
            {clima.daily.precipitation_sum[indexDia]}
          </Text>
        </View>

        {/* LLUVIA */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Thermometer color="white" />

          <Text
            style={{
              color: 'white',
              fontSize: 18,
              marginLeft: 10,
            }}>
            {clima.daily.rain_sum[indexDia]}
          </Text>
        </View>
      </View>

      {/* TEMPERATURAS */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 35,
        }}>
        {/* MIN */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
            }}>
            {Math.round(clima.daily.temperature_2m_min[indexDia])}°
          </Text>

          <Text style={{ color: '#94a3b8' }}>MIN</Text>
        </View>

        {/* CENTRAL */}
        <Text
          style={{
            fontSize: 70,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {tempCentral}°
        </Text>

        {/* MAX */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
            }}>
            {Math.round(clima.daily.temperature_2m_max[indexDia])}°
          </Text>

          <Text style={{ color: '#94a3b8' }}>MAX</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
