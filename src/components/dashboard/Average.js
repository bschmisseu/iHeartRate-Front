import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
        fontWeight: '300',
        fontSize: '18px',
        textAlign: 'center',
        padding: '0px'
    },
    listLabel: {
        fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
        fontWeight: '100',
        fontSize: '27px',
        textAlign: 'left'
    },
    listIcon: {
        fontSize: 'large'
    }
    
});

const Average = () => {

    const classes = useStyles();
    
    return (
        <Paper style={{padding: '15px'}}>
            <div className={classes.title}>Average Heart Rate</div>
            <List>
                <ListItem>
                    <ListItemIcon style={{fontSize: 'large'}}><FavoriteIcon /></ListItemIcon>
                    <ListItemText><Typography className={classes.listLabel}>72 BPM</Typography></ListItemText>
                </ListItem>
            </List>
        </Paper>
    )
}

export default Average
