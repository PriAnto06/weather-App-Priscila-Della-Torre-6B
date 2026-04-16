global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        main: {
          temp: 20,
          temp_min: 15,
          temp_max: 25,
          humidity: 60,
          pressure: 1013,
        },
        wind: {
          speed: 10,
        },
        weather: [
          {
            main: "Clear",
          },
        ],
        name: "Lugano",
      }),
  })
) as jest.Mock;