import { render } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("renderiza la pantalla principal", () => {
  const { getByTestId } = render(<WeatherApp />);
  expect(getByTestId("screen-weather")).toBeTruthy();
});