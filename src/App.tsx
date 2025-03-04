import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/navbar";
import Footer from "./shared/components/footer";
import Companies from "./pages/companies/companies";
import Professors from "./pages/professor/ProfessorIndex";
import ProfessorDetail from "./pages/professor/ProfessorDetail";
import ProfessorEdit from "./pages/professor/ProfessorEdit";
import IndexPage from "./pages/IndexPage";
import CreateCompany from "./pages/companies/create";
import EditCompany from "./pages/companies/edit";
import ShowCompany from "./pages/companies/show";
import HomePage from "./pages/welcome";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/auth/forgot-password";
import NavigationMenu from "./pages/navigation-menu";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/welcome" element={<HomePage />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/companys" element={<Companies />} />
            <Route path="/professors" element={<Professors />} />
            <Route path="/professors/:id" element={<ProfessorDetail />} />
            <Route path="/professors/:id/edit" element={<ProfessorEdit />} />
            <Route path="/companys/create" element={<CreateCompany />} />
            <Route path="/companys/:id/edit" element={<EditCompany />} />
            <Route path="/companys/:id" element={<ShowCompany />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/navigation-menu" element={<NavigationMenu />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;