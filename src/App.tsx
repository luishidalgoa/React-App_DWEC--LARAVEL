import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/navbar";
import Companies from "./pages/companies/companies";
import Professors from "./pages/professor/ProfessorIndex";
import ProfessorDetail from "./pages/professor/ProfessorDetail";
import ProfessorEdit from "./pages/professor/ProfessorEdit";
import IndexPage from "./pages/IndexPage";
import CreateCompany from "./pages/companies/create";
import EditCompany from "./pages/companies/edit";
import ShowCompany from "./pages/companies/show";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/companys" element={<Companies />} />
          <Route path="/professors" element={<Professors />} />
          <Route path="/professors/:id" element={<ProfessorDetail />} />
          <Route path="/professors/:id/edit" element={<ProfessorEdit />} />
          <Route path="/companys/create" element={<CreateCompany />} />
          <Route path="/companys/:id/edit" element={<EditCompany />} />
          <Route path="/companys/:id" element={<ShowCompany/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;