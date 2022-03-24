import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddCompany from "../pages/admin/AddCompany";
import AddJob from "../pages/company/AddJob";
import Companies from "../pages/admin/Companies";
import Home from "../pages/admin/Home";
import ViewApplicants from "../pages/company/ViewApplicants";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import JobDetails from "../pages/user/JobDetails";
import Jobs from "../pages/user/Jobs";

// function ProtectedRoute({ component: Component, logic, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         logic ? <Component {...props} /> : <Navigate to="/" />
//       }
//     />
//   );
// }
export default function User() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login />}
            render={() => {
              localStorage.getItem("userData") === null ? (
                <Navigate replace to="/" />
              ) : (
                <Navigate replace to="/home" />
              );
            }}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/companysignup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addjob" element={<AddJob />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobdetails" element={<JobDetails />} />
          <Route path="/viewapplicants" element={<ViewApplicants />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </Router>
    </>
  );
}
