import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Contracts from "./pages/Contracts";
import { CompanyProvider } from "./components/contexts/CompanyProvider";
import Receipts from "./pages/Receipt";

function App() {
  return (
    <BrowserRouter>
      <CompanyProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/company/:companyId" element={<Contracts />} />
          <Route path="/contract/:contractId" element={<Receipts />} />
        </Routes>
      </CompanyProvider>
    </BrowserRouter>
  );
}

export default App;
