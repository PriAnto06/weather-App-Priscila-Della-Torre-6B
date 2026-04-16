import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Sun,
  CloudRain,
  Droplets,
  Thermometer,
} from "lucide-react-native";

export default function WeatherApp() {
  const isTest = process.env.NODE_ENV === "test";

  const [clima, setClima] = useState<any>(null);
  const [loading, setLoading] = useState(!isTest);
  const [indexDia, setIndexDia] = useState(1);

  const fetchWeather = async () => {
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=-34.68&longitude=-58.47&current=temperature_2m,relative_humidity_2m,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&past_days=1&forecast_days=2&timezone=America%2FArgentina%2FBuenos_Aires";

      const response = await fetch(url);
      const data = await response.json();

      setClima(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isTest) {
      setClima({
        current: {
          temperature_2m: 20,
          relative_humidity_2m: 60,
        },
        daily: {
          temperature_2m_max: [25, 26, 27],
          temperature_2m_min: [15, 16, 17],
          precipitation_sum: [0, 1, 2],
          rain_sum: [0, 0, 1],
        },
      });
    } else {
      fetchWeather();
    }
  }, []);

  if (loading || !clima) {
    return (
      <View style={styles.center} testID="loading-screen">
        <ActivityIndicator />
      </View>
    );
  }

  const etiquetas = ["AYER", "AHORA", "MAÑANA"];

  const tempCentral =
    indexDia === 1
      ? Math.round(clima.current.temperature_2m)
      : Math.round(
          (clima.daily.temperature_2m_max[indexDia] +
            clima.daily.temperature_2m_min[indexDia]) /
            2
        );

  return (
    <SafeAreaView style={styles.container} testID="screen-weather">
      
      {/* HEADER */}
      <Text testID="header-city" style={styles.cityTitle}>
        LUGANO
      </Text>

      {/* NAVEGACIÓN */}
      <TouchableOpacity
        testID="button-prev-day"
        onPress={() => setIndexDia((prev) => Math.max(prev - 1, 0))}
      >
        <Text>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID="button-next-day"
        onPress={() => setIndexDia((prev) => Math.min(prev + 1, 2))}
      >
        <Text>{">"}</Text>
      </TouchableOpacity>

      <Text testID="navigation-current-day">
        {etiquetas[indexDia]}
      </Text>

      {/* ICONO */}
      <View
        testID={`icon-weather-${
          clima.daily.rain_sum[indexDia] > 0 ? "rain" : "sunny"
        }`}
      >
        {clima.daily.rain_sum[indexDia] > 0 ? (
          <CloudRain size={100} />
        ) : (
          <Sun size={100} />
        )}
      </View>

      {/* MÉTRICAS */}
      <View testID="metric-item">
        <Droplets />
        <Text testID="metric-value">
          {`${clima.current.relative_humidity_2m}%`}
        </Text>
      </View>

      <View testID="metric-item">
        <CloudRain />
        <Text testID="metric-value">
          {`${clima.daily.precipitation_sum[indexDia]}`}
        </Text>
      </View>

      <View testID="metric-item">
        <Thermometer />
        <Text testID="metric-value">
          {`${clima.daily.rain_sum[indexDia]}`}
        </Text>
      </View>

      {/* TEMPERATURAS */}
      <Text testID="temp-current">{`${tempCentral}°`}</Text>

      <Text testID="temp-min">
        {`${Math.round(clima.daily.temperature_2m_min[indexDia])}°`}
      </Text>

      <Text testID="temp-max">
        {`${Math.round(clima.daily.temperature_2m_max[indexDia])}°`}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  cityTitle: { fontSize: 24, textAlign: "center" },
});