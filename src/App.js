import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginContextProvider from "./Context/AuthContext";
import { Provider } from "react-redux";

import { store } from "./redux/store";
// import PostContextProvider from "./Context/PostsContext";

import AppRoutes from "./components/Routes";

function App() {
  return (
    <Provider store={store}>
      <LoginContextProvider>
        <AppRoutes />
      </LoginContextProvider>
    </Provider>
  );
}

export default App;
