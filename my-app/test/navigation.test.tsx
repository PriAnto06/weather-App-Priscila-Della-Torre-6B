import { render, fireEvent } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("permite navegar al siguiente día", () => {
  const { getByTestId } = render(<WeatherApp />);

  fireEvent.press(getByTestId("button-next-day"));

  expect(getByTestId("temp-current")).toBeTruthy();
});