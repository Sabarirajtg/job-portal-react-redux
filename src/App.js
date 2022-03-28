import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import SidebarV1 from "./components/SidebarV1";
import Admin from "./routes/Admin";
import User from "./routes/User";

function App() {
  // const navigate = useNavigate();
  // if (JSON.parse(localStorage.getItem("userData")) !== null) {
  //   navigate("/jobs");
  // }
  return (
    <SnackbarProvider>
      {localStorage.getItem("userData") !== null ? <SidebarV1 /> : null}
      <Admin />
      <User />
    </SnackbarProvider>
  );
}

export default App;
