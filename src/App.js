import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import SignIn from './components/sign-in/SignIn';
import { APPContext, APPContextProvider, useAppContext } from './lib/context';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import SignUp from './components/sign-up/SignUp';
import { MainPage } from './pages/main';



function App() {

  return (
    <APPContextProvider>
      <MainPage></MainPage>
    </APPContextProvider>
  );
}

export default App;
