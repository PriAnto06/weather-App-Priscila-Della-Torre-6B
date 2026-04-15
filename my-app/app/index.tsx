import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import { Sun, Cloud, CloudRain, Droplets, Wind, Thermometer } from "lucide-react-native";

export default function WeatherApp() {
  const [clima, setClima] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [indexDia, setIndexDia] = useState(1); 

  const fetchWeather = async () => {
    try {
     
      const url = "https://api.open-meteo.com/v1/forecast?latitude=-34.68&longitude=-58.47&current=temperature_2m,relative_humidity_2m,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum&past_days=1&forecast_days=2&timezone=America%2FArgentina%2FBuenos_Aires";
      const response = await fetch(url);
      const data = await response.json();
      setClima(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando el clima:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );

  // Lógica para etiquetas dinámicas
  const etiquetas = ["AYER", "AHORA", "MAÑANA"];
  const fechasHeader = clima.daily.time.map((t: string) => {
    const [y, m, d] = t.split("-");
    return `${d}/${m}`;
  });

  // Elegir temperatura central: Si es "Hoy" usa la actual, si no, usa el promedio del día
  const tempCentral = indexDia === 1 
    ? Math.round(clima.current.temperature_2m)
    : Math.round((clima.daily.temperature_2m_max[indexDia] + clima.daily.temperature_2m_min[indexDia]) / 2);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER FECHAS INTERACTIVO */}
      <View style={styles.header}>
        {fechasHeader.map((fecha: string, i: number) => (
          <TouchableOpacity key={i} onPress={() => setIndexDia(i)}>
            <Text style={indexDia === i ? styles.dateActive : styles.dateInactive}>
              {fecha}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.cityTitle}>LUGANO</Text>

      {/* ICONO CENTRAL SEGÚN LLUVIA DEL DÍA SELECCIONADO */}
      <View style={styles.mainIconContainer}>
        {clima.daily.rain_sum[indexDia] > 0 ? (
          <CloudRain size={180} color="#000" strokeWidth={1} />
        ) : (
          <Sun size={180} color="#000" strokeWidth={1} />
        )}
      </View>

      {/* STATS DEL DÍA SELECCIONADO */}
      <View style={styles.statsColumn}>
        <View style={styles.statItem}>
          <Droplets size={18} color="#000" />
          <Text style={styles.statText}>Humedad: {clima.current.relative_humidity_2m}%</Text>
        </View>
        <View style={styles.statItem}>
          <CloudRain size={18} color="#000" />
          <Text style={styles.statText}>Precip: {clima.daily.precipitation_sum[indexDia]} mm</Text>
        </View>
        <View style={styles.statItem}>
          <Thermometer size={18} color="#000" />
          <Text style={styles.statText}>Lluvia: {clima.daily.rain_sum[indexDia]} mm</Text>
        </View>
      </View>

      {/* DISEÑO DE TEMPERATURA ABAJO */}
      <View style={styles.tempSection}>
        <View style={styles.tempRow}>
          
          <View style={styles.sideTempBox}>
            <Text style={styles.minMaxLabel}>MIN</Text>
            <Text style={styles.minMaxTemp}>{Math.round(clima.daily.temperature_2m_min[indexDia])}°</Text>
          </View>

          <Text style={styles.currentTemp}>{tempCentral}°</Text>

          <View style={styles.sideTempBox}>
            <Text style={styles.minMaxLabel}>MAX</Text>
            <Text style={styles.minMaxTemp}>{Math.round(clima.daily.temperature_2m_max[indexDia])}°</Text>
          </View>

        </View>

        <View style={styles.nowWrapper}>
          <View style={styles.line} />
          <Text style={styles.nowText}>{etiquetas[indexDia]}</Text>
          <View style={styles.line} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingHorizontal: 50, 
    marginTop: 40 
  },
  dateInactive: { color: "#CCC", fontSize: 13, fontWeight: "500" },
  dateActive: { color: "#000", fontSize: 13, fontWeight: "900" },
  cityTitle: { textAlign: "center", fontSize: 28, fontWeight: "900", letterSpacing: 10, marginTop: 40 },
  mainIconContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  statsColumn: { paddingLeft: 40, gap: 12, marginBottom: 30 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  statText: { fontSize: 15, fontWeight: "500", color: "#333" },
  tempSection: { width: "100%", paddingHorizontal: 25, marginBottom: 50 },
  tempRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  currentTemp: { fontSize: 90, fontWeight: "bold", color: "#000", letterSpacing: -2 },
  sideTempBox: { alignItems: "center", width: 60 },
  minMaxLabel: { fontSize: 11, fontWeight: "bold", color: "#BBB", letterSpacing: 1 },
  minMaxTemp: { fontSize: 22, fontWeight: "400", color: "#000" },
  nowWrapper: { flexDirection: "row", alignItems: "center" },
  line: { flex: 1, height: 1.5, backgroundColor: "#F0F0F0" },
  nowText: { fontSize: 11, fontWeight: "900", marginHorizontal: 15, letterSpacing: 2, color: "#000" }
});