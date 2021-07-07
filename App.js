import React, { useState, useEffect } from 'react'
import logo from './logo.svg';

import HomePage from './components/HomePage.js'
import Elearning from './components/Elearning'
import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { DiAtom } from "react-icons/di"
import { GiHamburgerMenu } from 'react-icons/gi'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile.js'
import { AiOutlineUser } from "react-icons/ai";
import { Dropdown } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import { Table, Flag } from 'semantic-ui-react'

const countries = [
  { name: 'France', countryCode: 'fr' },
]
const flagRenderer = (item) => <Flag name={item.countryCode} />

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// import Secured from './utils/Secured';
function App() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profilAnchorEl, setProfilAnchorEl] = React.useState(null);
  const [lang, setLang] = useState("FR");

  const handleClick = (event) => {
    // console.log(event.currentTarget.id)
    if (event.currentTarget.id == "lang-button") {
      setAnchorEl(event.currentTarget);
    }
    else
      setProfilAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfilAnchorEl(null);

  };

  const handleLang = (event) => {
    if (event.target.alt == 'France')
      setLang("FR");
    else if (event.target.alt == 'GB')
      setLang("ENG");
    console.log(event.target.alt)
    // setLang("FR");

  }



  const [authLoading, setAuthLoading] = useState(true);
  const [toggle, setToggle] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <div className="container">
            <div className="navbar__container">
              <ul className="navbar__left">
                <div className="navbar__left_logo">
                  <DiAtom className="atomIcon line" />
                  <h2 className="prenom line">Gwenael</h2>
                  <h2 className="nom line">Bihan</h2>
                </div>
              </ul>
              {
                toggle ? (
                  <ul className="navbar__right">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/e-learning">E-learning</NavLink>
                    <div>
                      <Button
                        aria-controls="customized-menu"
                        id="lang-button"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                      >
                        {lang}
                      </Button>
                      <StyledMenu
                        id="lang-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClick={handleLang}
                        onClose={handleClose}
                      >
                        <StyledMenuItem id="0">
                          <ListItemIcon>
                            <img
                              alt="France"
                              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg" />
                          </ListItemIcon>
                        </StyledMenuItem>
                        <StyledMenuItem id="1">
                          <ListItemIcon>
                            <img
                              alt="GB"
                              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg" />
                          </ListItemIcon>
                        </StyledMenuItem>
                      </StyledMenu>
                    </div>
                    <div>
                      <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        id="profil-button"
                        color="primary"
                        onClick={handleClick}
                      >
                        Profil
                      </Button>
                      <StyledMenu
                        id="profil-menu"
                        anchorEl={profilAnchorEl}
                        keepMounted
                        open={Boolean(profilAnchorEl)}
                        onClose={handleClose}
                      >
                        <StyledMenuItem>
                          <NavLink activeClassName="active" to="/login">Login</NavLink>
                        </StyledMenuItem>
                        <StyledMenuItem>
                          <NavLink activeClassName="active" to="/register">Register</NavLink>
                        </StyledMenuItem>
                      </StyledMenu>
                    </div>
                  </ul>
                ) : ("")
              }
              <div className="toggle" onClick={() => setToggle(!toggle)}><GiHamburgerMenu /></div>
            </div>
          </div>

        </nav>
        <div className="content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/e-learning" component={Elearning} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
