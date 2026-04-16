import { render } from "@testing-library/react-native";
import WeatherApp from "../app/index";

test("renderiza métricas", () => {
  const { getAllByTestId } = render(<WeatherApp />);
  expect(getAllByTestId("metric-item").length).toBeGreaterThanOrEqual(3);
});