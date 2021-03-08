import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chartkick, { LineChart } from 'react-chartkick';
import Highcharts from 'highcharts';
import Paper from '@material-ui/core/Paper';

Chartkick.use(Highcharts);

const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px',
    },
    chartTitle: {
        fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
        fontWeight: '300',
        fontSize: '24px',
        textAlign: 'center',
        padding: '10px'
    }
});

const Graph = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root}>
                <div className={classes.chartTitle}>
                    BPM VS Time
                </div>
            <LineChart 
                titel = "Heart Rate"
                ytitle= "Beats per Minute (BPM)"
                xtitle= "Date Time"
                data={{"2021-02-07 14:27:33": 61, "2021-02-07 14:27:34": 62, "2021-02-07 14:27:35": 57, "2021-02-07 14:27:36": 61, "2021-02-07 14:27:37": 63, "2021-02-07 14:27:38": 64, "2021-02-07 14:27:39": 68, "2021-02-07 14:27:40": 74, "2021-02-07 14:27:41": 66, "2021-02-07 14:27:42": 66}} />
            </Paper>
        </div>
    )
}

export default Graph
