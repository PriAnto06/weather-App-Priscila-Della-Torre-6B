import { render } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("la app tiene todos los testID obligatorios", () => {
  const requiredTestIds = [
    "screen-weather",
    "header-city",
    "button-prev-day",
    "button-next-day",
    "temp-current",
    "temp-min",
    "temp-max",
  ];

  const { getByTestId } = render(<WeatherApp />);

  requiredTestIds.forEach((id) => {
    expect(getByTestId(id)).toBeTruthy();
  });
});