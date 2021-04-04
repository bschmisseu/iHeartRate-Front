import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import wallpaper from '../../photos/wallpaper.jpg';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
  },
}));

export default function Header(props) {
  const classes = useStyles();
 
  return (
    <img src={wallpaper} alt="" className={classes.image} />
  );
}