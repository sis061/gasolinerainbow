import type { JSX } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

/*----------------------------------*/

import Home from "./layout/sections/Home";
import Profile from "./layout/sections/Profile";
import Discography from "./layout/sections/Discography";

const Routers: React.FC<any> = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/discography" element={<Discography />} />
    </Routes>
  );
};

export default Routers;
