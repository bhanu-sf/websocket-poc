import { ThemeProvider } from "@mui/material/styles";
import MainPage from "./components/MainPage";
import MainPage2 from "./components/MainPage2";
import { theme } from "./theme";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainPage2 />
      </ThemeProvider>
    </div>
  );
}

export default App;
