# 🧾 Manual de Usuario – Weather App Lugano

## 📌 Requisitos previos

Antes de ejecutar la aplicación, asegurarse de tener instalado:

* Node.js (versión recomendada 18 o superior)
* npm o bun
* Expo CLI (opcional, pero recomendado)

---

## 📥 Paso 1: Descargar el proyecto

Abrir la terminal y ubicarse en la carpeta donde querés guardar el proyecto:

git clone <URL_DEL_REPO>
cd weather-App-Priscila-Della-Torre-6B/my-app

---

## 📦 Paso 2: Instalar dependencias

Ejecutar:

npm install

o si usás bun:

bun install

Esto instalará todas las librerías necesarias del proyecto.

---

## ▶️ Paso 3: Ejecutar la aplicación

Iniciar el servidor de desarrollo:

npm start

o:

npm run dev

---

## 📱 Paso 4: Abrir la app

Se abrirá una interfaz de Expo. Tenés varias opciones:

* Presionar "a" → abrir en Android
* Presionar "w" → abrir en navegador web
* Escanear QR con la app Expo Go

---

## 🧪 Paso 5: Ejecutar tests

Para verificar que todo funciona correctamente:

npx jest

Resultado esperado:

7 passed, 0 failed

---

## ⚙️ ¿Cómo funciona la app?

La aplicación:

* Obtiene datos del clima desde una API externa
* Muestra:

  * Temperatura actual
  * Temperatura mínima
  * Temperatura máxima
  * Humedad
  * Precipitación
* Permite navegar entre:

  * Ayer
  * Hoy
  * Mañana

---

## 🧠 Modo testing (automático)

Cuando se ejecutan los tests:

* La app NO usa internet
* Usa datos simulados (mock)
* Esto evita errores y hace que los tests funcionen correctamente

---

## ❗ Posibles errores y soluciones

### Error: no carga la app

Ejecutar:

npm install

---

### Error: tests fallan

Verificar:

npx jest

---

### Error: comandos no funcionan

Verificar instalación de:

* Node.js
* npm o bun

---

## 📌 Comandos útiles

npm start        # Iniciar app
npm run android  # Abrir en Android
npm run web      # Abrir en navegador
npx jest         # Ejecutar tests

---

## ✅ Estado final del proyecto

* Aplicación funcional
* Tests aprobados
* Navegación entre días
* Datos reales y mock para testing

---
