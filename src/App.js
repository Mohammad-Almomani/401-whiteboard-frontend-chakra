import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginContextProvider from "./Context/AuthContext";
// import PostContextProvider from "./Context/PostsContext";

import AppRoutes from "./components/Routes";

function App() {
  return (
    <LoginContextProvider>
        <AppRoutes />
     </LoginContextProvider>
  );
}

export default App;
