import { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector(state=> state.user.user)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  useEffect(()=>{console.log('user',user);},[user])
  const logout=()=>{
    localStorage.clear();
    window.location.reload();
  }
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div>
    <Avatar onClick={handleClick} >{user?.firstName && user?.firstName[0]}</Avatar>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  </div>
  );
};

export default Header;
