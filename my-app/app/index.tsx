import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react-native";

type Weather = {
  clima: "sunny" | "rain" | "cloud";
  temp: number;
  min: number;
  max: number;
  humedad: number;
  viento: number;
  presion: number;
};

const data: Weather[] = [
  { clima: "sunny", temp: 27, min: 22, max: 30, humedad: 55, viento: 1.2, presion: 1012 },
  { clima: "rain", temp: 20, min: 17, max: 22, humedad: 90, viento: 2.5, presion: 990 },
  { clima: "cloud", temp: 18, min: 15, max: 21, humedad: 70, viento: 1.8, presion: 1005 },
];

const dias = ["Hoy", "Mañana", "Pasado"];

export default function Home() {
  const [day, setDay] = useState(0);
  const weather = data[day];

  const nextDay = () => setDay((prev) => (prev + 1) % data.length);
  const prevDay = () => setDay((prev) => (prev - 1 + data.length) % data.length);

  const renderIcon = () => {
    switch (weather.clima) {
      case "sunny":
        return <Sun size={120} color="#000" strokeWidth={1.5} />;
      case "rain":
        return <CloudRain size={120} color="#000" strokeWidth={1.5} />;
      case "cloud":
        return <Cloud size={120} color="#000" strokeWidth={1.5} />;
    }
  };

  return (
    <View style={styles.container}>

      {/* NAV */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={prevDay}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.date}>{dias[day]}</Text>

        <TouchableOpacity onPress={nextDay}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* CIUDAD */}
      <Text style={styles.city}>LUGANO</Text>

      {/* ICONO */}
      <View style={styles.icon}>{renderIcon()}</View>

      {/* TEMP */}
      <Text style={styles.temp}>{weather.temp}°</Text>

      {/* MIN MAX */}
      <View style={styles.minMax}>
        <Text style={styles.minMaxText}>Min {weather.min}°</Text>
        <Text style={styles.minMaxText}>Max {weather.max}°</Text>
      </View>

      {/* STATS */}
      <View style={styles.stats}>
        <Text style={styles.stat}>💧 Humedad: {weather.humedad}%</Text>
        <Text style={styles.stat}>🌬 Viento: {weather.viento} m/s</Text>
        <Text style={styles.stat}>🧭 Presión: {weather.presion} hPa</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // pantalla completa blanca
    justifyContent: "center",
    alignItems: "center",
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 60,
  },

  arrow: {
    fontSize: 30,
    marginHorizontal: 30,
    color: "#000",
    fontWeight: "bold",
  },

  date: {
    fontSize: 16,
    color: "#000",
  },

  city: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 20,
  },

  icon: {
    marginVertical: 20,
  },

  temp: {
    fontSize: 60,
    fontWeight: "bold",
  },

  minMax: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 10,
  },

  minMaxText: {
    fontSize: 16,
    color: "#555",
  },

  stats: {
    marginTop: 20,
    alignItems: "center",
  },

  stat: {
    fontSize: 14,
    marginVertical: 3,
  },
});