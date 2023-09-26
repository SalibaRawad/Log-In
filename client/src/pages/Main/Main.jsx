import Cookies from "universal-cookie";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  faTable,
  faUser,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cookies = new Cookies();
const Main = () => {
  const logout = () => {
    cookies.remove("TOKEN");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen">
      <Sidebar color="#586F7C" backgroundColor="#7C7C7C">
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#F5F5F5",
                color: "#F4F4F9",
              },
            },
          }}
        >
          <MenuItem
            component={<Link to="/main" />}
            icon={<FontAwesomeIcon icon={faTable} />}
            color="#F4F4F9"
          >
            {" "}
            Dashboard
          </MenuItem>

          <SubMenu
            label="Registration"
            icon={<FontAwesomeIcon icon={faUser} />}
          >
            <MenuItem component={<Link to={"/register"}></Link>}>
              {" "}
              Sign Up
            </MenuItem>
            <MenuItem component={<Link to={"/"}></Link>}> Log In</MenuItem>
          </SubMenu>
          <MenuItem
            component={<Link to="/profile" />}
            icon={<FontAwesomeIcon icon={faCircleUser} />}
          >
            {" "}
            Profile
          </MenuItem>
          <div className=" absolute bottom-0">
            <button
              className="p-3 bg-black ml-20 mb-8 rounded-lg text-white"
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Main;
