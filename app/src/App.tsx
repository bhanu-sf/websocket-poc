import { ThemeProvider } from "@mui/material/styles";
import MainPage from "./components/MainPage";
import { theme } from "./theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
