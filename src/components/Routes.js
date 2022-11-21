import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./post";
import Copyright from "./CopyRight";
import MenuAppBar from "./navbar";
import { useEffect } from "react";
import cookies from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { isAuthorizedRedux } from "../redux/authSlicer";
import { gitPosts } from "../actions/PostsActions";
import { checkToken } from "../actions/AuthActions";

function AppRoutes() {
  
  const dispatch = useDispatch();

  const isAuthorized = useSelector(isAuthorizedRedux)

  useEffect(() => {
    if (cookies.load("token")) {
      checkToken(dispatch);
      gitPosts(dispatch);
    }
  }, [isAuthorized]);

  return (
    <div className="App" data-testid="homePage">
      <>
        <Router>
          <MenuAppBar />
          <Routes >
            <Route
              path="/signup/*"
              element={isAuthorized ? <Navigate to="/post" /> : <SignUp />}
            />
            <Route
              path="/post/*"
              element={isAuthorized ? <Post /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin/*"
              element={isAuthorized ? <Navigate to="/Post" /> : <SignIn />}
            />
            <Route
              path="/*"
              element={isAuthorized ? <Post /> : <Navigate to="/signin" />}
            />
          </Routes>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Router>
      </>
    </div>
  );
}

export default AppRoutes;
