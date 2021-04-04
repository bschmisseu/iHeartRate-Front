import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import TimelineIcon from '@material-ui/icons/Timeline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import picture from '../../photos/bryce.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    textAlign: 'center',
    fontWeight: '200',
    fontSize: '32px',
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(#ac1c13, #bf4342)',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
      
      width: '75px',
      height: '75px',
      marginTop: '25px',
      marginBottom: '25px',
      fontSize: '25px',
      alignSelf: 'center'
  },
  listLabel: {
    color: 'white',
    fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
    fontWeight: '300',
    textAlign: 'left'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div style={{color: 'white'}}>Welcome to iHeartRate!</div>
        <Avatar className={classes.avatar} alt="Bryce Schmisseur" src={picture}>BS</Avatar>
        <div style={{color: 'white', fontSize: '20px', marginBottom: '15px'}}>Bryce Schmisseur</div>
        <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '90%', alignSelf: 'center'}}/>
        <List>
            <ListItem>
              <Button style={{width: '100%'}}>
                  <ListItemIcon className={classes.listLabel}><TableChartIcon /></ListItemIcon>
                  <ListItemText><Typography className={classes.listLabel}>Table</Typography></ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button style={{width: '100%'}}>
                  <ListItemIcon className={classes.listLabel}><TimelineIcon /></ListItemIcon>
                  <ListItemText><Typography className={classes.listLabel}>Chart</Typography></ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button style={{width: '100%'}}>
                  <ListItemIcon className={classes.listLabel}><FavoriteIcon /></ListItemIcon>
                  <ListItemText><Typography className={classes.listLabel}>Last Recorded</Typography></ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button style={{width: '100%'}}>
                  <ListItemIcon className={classes.listLabel}><FavoriteIcon /></ListItemIcon>
                  <ListItemText><Typography className={classes.listLabel}>Average</Typography></ListItemText>
              </Button>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}