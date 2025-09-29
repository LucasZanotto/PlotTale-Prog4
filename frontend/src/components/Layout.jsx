import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const noPaddingRoutes = ["/login", "/register"];

const Layout = () => {
  const location = useLocation();
  const hasPadding = !noPaddingRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main style={hasPadding ? { padding: "1rem" } : {}}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
