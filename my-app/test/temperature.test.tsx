import { render } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("muestra temperatura actual", () => {
  const { getByTestId } = render(<WeatherApp />);
  expect(getByTestId("temp-current").props.children).toMatch(/°/);
});

test("muestra min y max", () => {
  const { getByTestId } = render(<WeatherApp />);
  expect(getByTestId("temp-min")).toBeTruthy();
  expect(getByTestId("temp-max")).toBeTruthy();
});