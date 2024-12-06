import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AppLayout from "./components/ui/AppLayout";
import Calendario from "./pages/Calendario";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
                <Home
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
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
    </QueryClientProvider>
  );
}

export default App;
