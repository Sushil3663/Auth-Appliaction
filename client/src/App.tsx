import React, { Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import routelist from "./routeList/RouteList";

function App() {
  return (
    <>
      <Suspense fallback={"...Loading"}>
        <Routes>
          {routelist.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
