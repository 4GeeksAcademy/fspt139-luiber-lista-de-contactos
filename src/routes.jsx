// Import necessary components and functions from react-router-dom.
import { AddContact } from "./pages/AddContact.jsx";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} /> {/* 👈 ¡AGREGA ESTA LÍNEA! */}
        <Route path="/edit-contact/:id" element={<AddContact />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    )
);