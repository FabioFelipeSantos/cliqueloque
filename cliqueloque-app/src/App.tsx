import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Contracts from "./pages/Contracts";
import { CompanyProvider } from "./components/contexts/CompanyProvider";

function App() {
  return (
    <BrowserRouter>
      <CompanyProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="company/:id" element={<Contracts />} />
        </Routes>
      </CompanyProvider>
    </BrowserRouter>
  );
}

export default App;
