import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/navbar";
import Companies from "./pages/companies/companies";
import Professor from "./pages/professor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/companys" element={<Companies />} />
          <Route path="/professors" element={<Professor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
