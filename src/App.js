import logo from "./logo.svg";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <PasswordGenerator />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
