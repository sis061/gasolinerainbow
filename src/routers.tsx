import type { JSX } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

/*----------------------------------*/

import Home from "./layout/sections/Home";
import Profile from "./layout/sections/Profile";
import Discography from "./layout/sections/Discography";
import AuthorNote from "./layout/sections/AuthorNote";
import Note from "./layout/sections/Note";
import News from "./layout/sections/News";

const Routers: React.FC<any> = (): JSX.Element => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/discography" element={<Discography />} />
      <Route path="/authornote">
        <Route path="" element={<AuthorNote />} />
        <Route path=":idx" element={<Note />} />
      </Route>
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

export default Routers;
