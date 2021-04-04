import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../photos/Group.png';

import HelpIcon from '@material-ui/icons/Help';


const useStyles = makeStyles((theme) => ({
  root: {
      // background: 'linear-gradient(#ac1c13, #bf4342)',
      background: '#ac1c13',
      paddingTop: '5px',
      paddingBottom: '5px'
  },
  signin: {
    width: "210px",
    height: "40px",
    cursor: "pointer",
    paddingLeft: "5px",
  },
  learnmore: {
    width: "210px",
    height: "40px",
    cursor: "pointer",
    color: "black",
    background: "white",
    fontFamily: 'sans-serif',
    textTransform: "none",
    borderRadius: '7px',
    '&:hover': {
      background: 'black',
      color: 'white',
    },   
  },
  learnmorefont: {
    fontSize: '18px',
    fontWeight: '500'
  }
}
));

export default function Component(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
          <img src={logo} alt="Logo" width={300} height={65} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button className={classes.learnmore}>
              <HelpIcon style={{fontSize: "medium", paddingRight: '5px'}}/>
              <p className={classes.learnmorefont}>Learn More</p>
            </Button>
            <div
              className={classes.signin}
              id="appleid-signin"
              data-mode="center-align"
              data-color="black"
              data-border="false"
              data-border-radius="15"
              data-size="32"
              data-type="continue"
            ></div>
            </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}