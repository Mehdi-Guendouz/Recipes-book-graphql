import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";

const Layout = () => {
  return (
    <div className="flex justify-between bg-white w-full">
      <div className="w-full ml-[300px]  bg-white  overflow-hidden">
        <Outlet />
      </div>
      <SideBar />
    </div>
  );
};

export default Layout;
