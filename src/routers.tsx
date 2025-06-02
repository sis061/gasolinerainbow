import type { JSX } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

/*----------------------------------*/

import AuthorNote from "./pages/AuthorNote";
import Note from "./pages/AuthorNote/Note";
import Discography from "./pages/Discography";
import News from "./pages/News";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

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
