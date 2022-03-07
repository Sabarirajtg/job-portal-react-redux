import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "../pages/admin/Users";

export default function Admin() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
}
