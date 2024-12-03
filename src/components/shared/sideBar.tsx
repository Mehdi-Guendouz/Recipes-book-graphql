import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChartBarStacked,
  CookingPot,
  Globe,
  LogOutIcon,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import { useUserStore } from "@/hooks/user-store";
import { useQueryStore } from "@/hooks/query-store";

const SideBar = () => {
  const navLinks = [
    {
      englishName: "Ingredients",
      path: "/",
      LightIcon: <ShoppingBasket color="#696D74" />,
      DarkIcon: <ShoppingBasket color="#696D74" />,
    },
    {
      englishName: "categories",
      path: "/category",
      LightIcon: <ChartBarStacked color="#696D74" />,
      DarkIcon: <ChartBarStacked color="#696D74" />,
    },
    {
      englishName: "Recipes",
      path: "/recipes",
      LightIcon: <CookingPot color="#696D74" />,
      DarkIcon: <CookingPot color="#696D74" />,
    },
    {
      englishName: "Community",
      path: "/community",
      LightIcon: <Globe color="#696D74" />,
      DarkIcon: <Globe color="#696D74" />,
    },

    {
      englishName: "Profile",
      path: "/profile",
      LightIcon: <UserRound color="#696D74" />,
      DarkIcon: <UserRound color="#696D74" />,
    },
  ] as const;
  const path = useLocation().pathname.split("/")[1];
  const user = useUserStore();
  //   const [userInformation, setUserInformation] = useState<userInformationType>(
  //     {} as userInformationType
  //   );
  const navigate = useNavigate();
  const queryStore = useQueryStore();

  const handleLogOut = () => {
    user.logout();
    localStorage.removeItem("token");
    navigate("login");
  };

  return (
    <>
      <aside
        className={cn(
          "h-screen max-w-[250px] min-w-[250px] xl:max-w-[300px] xl:min-w-[300px] fixed left-0  pt-6 pb-10 px-8 flex flex-col justify-between sideBar_box_shadow transition-all duration-300  lg:translate-x-0"
        )}
      >
        <div>
          {/* navigation */}
          <nav className="w-full">
            <ul className="w-full space-y-5">
              {navLinks.map((navLink, index) => (
                <li
                  className="w-full h-fit group/NavItem transition-all duration-300"
                  key={index}
                >
                  <Link
                    to={navLink.path}
                    className={cn(
                      "w-full transition-all duration-300  text-right rounded-md py-2  flex items-center justify-start sideBar-item-shadow"
                      //   isActive ? "bg-primary-green" : "bg-white"
                    )}
                  >
                    <div className="hidden group-hover/NavItem:block transition-all duration-300">
                      {navLink.LightIcon}
                    </div>

                    {path === navLink.englishName ? (
                      <div className="group-hover/NavItem:hidden">
                        {navLink.LightIcon}
                      </div>
                    ) : (
                      <div className="group-hover/NavItem:hidden">
                        {navLink.DarkIcon}
                      </div>
                    )}
                    <span
                      className={cn(
                        "ml-5 text-base transition-all duration-300 font-medium group-hover/NavItem:text-primary-green-dark",
                        path === navLink.englishName
                          ? "text-primary-green-dark"
                          : "text-primary-grey-700"
                      )}
                    >
                      {navLink.englishName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          className={cn(
            "flex items-end  py-14 gap-4 h-full flex-col  ",
            queryStore.query ? "justify-between" : "justify-end"
          )}
        >
          {queryStore.query && (
            <div className="bg-primary-red text-white p-1 rounded-md w-full h-full px-2">
              <p className="capitalize">the query executed is: </p>
              <p className="">{queryStore.query}</p>
            </div>
          )}
          <div
            onClick={handleLogOut}
            className="w-full flex items-center justify-start gap-4 cursor-pointer"
          >
            {/* logOut */}
            <LogOutIcon color="#F70404" />
            <span className="text-primary-red text-base font-medium">
              LogOut
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
