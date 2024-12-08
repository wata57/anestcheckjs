import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Calendario from "./pages/Calendario";
import NovoCaso from "./pages/NovoCaso";
import Configuracoes from "./pages/Configuracoes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Perfil from "./pages/Perfil";
import AppLayout from "./components/app-layout/AppLayout";
import Admin from "./pages/Admin";
import ProtectedRouteAdmin from "./protected-routes/ProtectedRouteAdmin";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

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
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="app"
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
            <Route
              path="admin"
              element={
                <ProtectedRouteAdmin>
                  <Admin />
                </ProtectedRouteAdmin>
              }
            />
            <Route path="perfil" element={<Perfil />} />
            <Route path="novo-caso" element={<NovoCaso />} />
            <Route
              path="calendario"
              element={<Calendario setSidebarOpen={setSidebarOpen} />}
            />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 2000,
          },
          style: {
            fontWeight: "bold",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fffff",
            color: "#031011",
            textAlign: "center",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
