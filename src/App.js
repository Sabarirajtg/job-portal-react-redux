import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import Admin from "./routes/Admin";
import User from "./routes/User";

function App() {
  // const navigate = useNavigate();
  // if (JSON.parse(localStorage.getItem("userData")) !== null) {
  //   navigate("/jobs");
  // }
  return (
    <SnackbarProvider>
      <Admin />
      <User />
    </SnackbarProvider>
  );
}

export default App;
