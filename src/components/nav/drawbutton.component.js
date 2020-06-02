import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, right: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"Donate"}>
            <ListItemIcon> <AddBoxIcon /> </ListItemIcon>
            <ListItemText primary={"Donate"} />
        </ListItem>
        <ListItem button key={"Trips"}>
            <ListItemIcon> <DriveEtaIcon /> </ListItemIcon>
            <ListItemText primary={"Trips"} />
        </ListItem>
        <Divider/>
        <ListItem button key={"log"}>
          { props.loggedIn
              ? <ListItemIcon> <CloseIcon /> </ListItemIcon>
              : <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
          }
          { props.loggedIn
              ? <ListItemText primary={"Logout"}/>
              : <ListItemText primary={"Login"}/>
          }
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
        >
            <MenuIcon />
        </IconButton>
        <Drawer anchor='right' open={state['right']} onClose={toggleDrawer(false)}>
            {list('right')}
        </Drawer>
    </div>
  );
}

export default TemporaryDrawer;