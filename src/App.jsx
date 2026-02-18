import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { fetchMe } from "./modules/auth.slice";
// import config from "./config.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authorization_token");

    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
