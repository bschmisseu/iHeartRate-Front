import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  welcome: {
    textAlign: 'left',
    fontWeight: '250',
    fontSize: '28px'
  },
  signIn: {
    textAlign: 'right',
    fontWeight: '250',
  },
  button: {
    background: 'linear-gradient(#ac1c13, #bf4342)',
    color: 'white',
    fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
    fontWeight: '300',
  }
}));

export default function Heading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid className={classes.welcome} item xs={6}>
            Welcome, Bryce Schmisseur
            <div style={{fontSize: '20px'}}>This is your Dashboard</div>
        </Grid>
        <Grid className={classes.signIn} item xs={6}>
          <Button className={classes.button}>Select Dates</Button>
        </Grid>
      </Grid>
    </div>
  );
}