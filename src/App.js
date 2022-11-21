import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";

import { store } from "./redux/store";

import AppRoutes from "./components/Routes";

function App() {
  return (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
  );
}

export default App;
