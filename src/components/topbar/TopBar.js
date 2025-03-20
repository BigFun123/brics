import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { APPContext } from '../../lib/context';
import AppTheme from '../shared-theme/AppTheme';
import { Avatar, CssBaseline, Link, Stack, Tab, Tabs } from '@mui/material';
import { usePage } from '../../lib/usePage';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EjectIcon from '@mui/icons-material/Eject';
import DashboardIcon from '@mui/icons-material/Dashboard';



export default function TopBar() {

  const { isSignedIn } = React.useContext(APPContext);
  const { setAppState } = usePage();
  const { me } = React.useContext(APPContext);
  const { isUtilityPage } = usePage();

  function handleAvatar() {
    setAppState("profile");
  }

  function handleAdmin() {
    setAppState("admin");
  }

  function handleMain() {
    setAppState("main");
  }

  function responsive(text) {
    return (
      <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>{text}</Typography>
    )
  }

  return (
    <AppTheme >
      <CssBaseline enableColorScheme />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Stack spacing={1} direction="row" sx={{ justifyContent: 'space-between', marginRight: 2 }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Button onClick={handleMain}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  XBRICS
                </Typography>
              </Button>
              <Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
                {isSignedIn && !isUtilityPage() && <Button color="inherit" onClick={() => setAppState("transfer")} >
                  <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>{responsive('Transfer')}</Button>}
                {isSignedIn && !isUtilityPage() && <Button color="inherit" onClick={() => setAppState("buy")} >
                  <ElectricBoltIcon></ElectricBoltIcon>{responsive('Buy')}</Button>}
                {isSignedIn && !isUtilityPage() && <Button color="inherit" onClick={() => setAppState("sell")} ><EjectIcon></EjectIcon>
                  {responsive('Offer')}</Button>}
                {isSignedIn && !isUtilityPage() && <Button color="inherit" onClick={() => setAppState("dashboard")} ><DashboardIcon></DashboardIcon>
                  {responsive('Dashboard')}</Button>}
              </Stack>

            </Toolbar>

            <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between' }}>
              {/* {isSignedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
              {!isSignedIn && <Button color="inherit">Sign Up</Button>}
              {!isSignedIn && <Button color="inherit">Sign In</Button>} */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {me && me.admin && <Avatar variant="round" onClick={handleAdmin}><DashboardIcon></DashboardIcon></Avatar>}
                {me && <Avatar variant="round" onClick={handleAvatar}><PersonIcon></PersonIcon></Avatar>}
              </Box>
            </Stack>
          </Stack>
        </AppBar>
      </Box>
    </AppTheme>
  );
}
