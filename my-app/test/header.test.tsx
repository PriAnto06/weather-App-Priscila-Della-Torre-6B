import { render } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("muestra la ciudad", () => {
  const { getByTestId } = render(<WeatherApp />);
  expect(getByTestId("header-city")).toBeTruthy();
});