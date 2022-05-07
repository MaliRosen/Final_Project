import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";

import CONSTANTS from "../constants.js"

const Header = () => {

  const user = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="avatar-container">
      <Avatar onClick={handleClick}>
        {user?.firstName && user?.firstName[0]}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>שלום {user.firstName}</MenuItem>
        <MenuItem>
          הינך מחובר/ת כ:
          {user.type == CONSTANTS.TYPE.STUDENT
            ? CONSTANTS.TEXT.STUDENT
            : user.type == CONSTANTS.TYPE.TEACHER
            ? CONSTANTS.TEXT.TEACHER
            : user.type == CONSTANTS.TYPE.ADMIN && CONSTANTS.TEXT.ADMIN}
        </MenuItem>
        <MenuItem onClick={logout}>התנתקות</MenuItem>
      </Menu>
    </div>
  );
};

export default Header;