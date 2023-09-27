import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Form from "./components/Form";
import Tasks from "./pages/Tasks";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Register from "./pages/Register";

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
Amplify.configure(awsExports);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
    <AuthProvider>
        <BrowserRouter>
            <Routes>
              {/* <Route  element={<Homepage />} /> */}
              <Route index element={<Register />}/>
              <Route path="login" element={<Login />} />
              <Route path="verify" element={<Verify />}/>
              <Route
                path="task"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                {/* <Route path="form" element={<Form />} /> */}
              </Route>
              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;