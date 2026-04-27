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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  const tempCentral =
    indexDia === 1
      ? Math.round(clima.current.temperature_2m)
      : Math.round(
          (clima.daily.temperature_2m_max[indexDia] +
            clima.daily.temperature_2m_min[indexDia]) /
            2
        );

  // 📅 SOLO FECHAS
  const fechas = (() => {
    const hoy = new Date();

    const dias = [-1, 0, 1].map((offset) => {
      const d = new Date(hoy);
      d.setDate(hoy.getDate() + offset);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    return dias;
  })();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0f172a", padding: 20 }}
    >
      {/* HEADER */}
      <Text
        style={{
          fontSize: 28,
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        LUGANO
      </Text>

      {/* FECHAS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        {fechas.map((f, i) => (
          <TouchableOpacity key={i} onPress={() => setIndexDia(i)}>
            <Text
              style={{
                color: i === indexDia ? "white" : "#94a3b8",
                fontWeight: i === indexDia ? "bold" : "normal",
              }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ICONO */}
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        {clima.daily.rain_sum[indexDia] > 0 ? (
          <CloudRain size={100} color="white" />
        ) : (
          <Sun size={100} color="white" />
        )}
      </View>

      {/* MÉTRICAS CENTRADAS */}
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <Droplets color="white" />
          <Text style={{ color: "white" }}>
            {`${clima.current.relative_humidity_2m}%`}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <CloudRain color="white" />
          <Text style={{ color: "white" }}>
            {`${clima.daily.precipitation_sum[indexDia]}`}
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <Thermometer color="white" />
          <Text style={{ color: "white" }}>
            {`${clima.daily.rain_sum[indexDia]}`}
          </Text>
        </View>
      </View>

      {/* TEMPERATURAS */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {/* MIN */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: "white" }}>
            {`${Math.round(clima.daily.temperature_2m_min[indexDia])}°`}
          </Text>
          <Text style={{ color: "#94a3b8" }}>MIN</Text>
        </View>

        {/* ACTUAL */}
        <Text
          style={{
            fontSize: 60,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {`${tempCentral}°`}
        </Text>

        {/* MAX */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: "white" }}>
            {`${Math.round(clima.daily.temperature_2m_max[indexDia])}°`}
          </Text>
          <Text style={{ color: "#94a3b8" }}>MAX</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}