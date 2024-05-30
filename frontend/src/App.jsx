import React from "react";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import RegisterContent from "./content/RegisterContent";
import RegisteredCard from "./pages/RegisteredCard";

import Tab from "./components/navigation/Tab";
import UpdateFormContent from "./content/UpdateFormContent";
import DeleteCard from "./content/RegisterCardsComponents/DeleteCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/home" element={<Home />} />
        <Route path="/dashboard/registered-card/" element={<RegisteredCard />}>
          <Route
            path="/dashboard/registered-card/updateCard/:id"
            element={<UpdateFormContent />}
          />
          <Route
            path="/dashboard/registered-card/deleteCard/:id"
            element={<DeleteCard />}
          />
        </Route>
      </Route>

      <Route path="/auth" element={<Authentication />} />
    </Route>
  )
);

function App() {
  return (
    <div className="">
      <RouterProvider router={router}>
        <Navbar />
      </RouterProvider>
    </div>
  );
}

export default App;
