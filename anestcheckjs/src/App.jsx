import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AppLayout from "./components/ui/AppLayout";
import Calendario from "./pages/Calendario";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="home" replace />} />
        <Route
          element={
            <AppLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        >
          <Route
            path="home"
            element={
              <Home sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            }
          />
          <Route path="perfil" element={<Perfil />} />
          <Route
            path="calendario"
            element={<Calendario setSidebarOpen={setSidebarOpen} />}
          />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
