import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SideBar from './../components/nav/SideBar';
import Table from '@material-ui/core/Table';
import Footer from './../components/nav/Footer';
import HeartRateService from './../services/HeartRateService';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Chartkick, { LineChart } from 'react-chartkick';
import Highcharts from 'highcharts';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

Chartkick.use(Highcharts);

const useStyles = makeStyles((theme) => ({
  gridRight: {
      padding: '25px',
  },
  heading: {
      marginBottom: '0px',
  },
  rootTable: {
    width: '100%',

  },
  containerTable: {
    maxHeight: 465,
    minHeight: 465,
  },
  rootHead: {
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
  },
  rootChart: {
    width: '100%',
    padding: '0px',
  },
  chartTitle: {
      fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
      fontWeight: '300',
      fontSize: '24px',
      textAlign: 'center',
      padding: '10px'
  },
  titleRate: {
    fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
    fontWeight: '300',
    fontSize: '18px',
    textAlign: 'center',
    padding: '0px'
    },
    listLabelRate: {
        fontFamily: '-apple-system-body, BlinkMacSystemFont, sans-serif',
        fontWeight: '100',
        fontSize: '23px',
        textAlign: 'left'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const columns = [
    { 
      id: 'bpm', 
      label: 'Beats per Minute',
      align: 'center' 
      },
    {
      id: 'date',
      label: 'Date/Time Recorded',
      minWidth: 170,
      align: 'center',
      format: (value) => moment(value).day(),
    },
  ];

function createData(unNum, bpm, date) {
    return {unNum, bpm, date };
}

export default function Dashboard() {
  const classes = useStyles();

  const [datesButtonDis, setDatesButtonDis] = useState(false);
  const [heartData, setHeartData] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(JSON.parse("{}"));
  const [avgRate, setAvgRate] = useState(0);
  const [lastRec, setLastRec] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

    useEffect(() => {
        HeartRateService.getUsers('001072.b2df559565e4408586c5ff8852b01b65.0530').then(response => {
            let arr = [];
            Object.keys(response.data).forEach(function(key) {
                let currDate = moment(response.data[key].date);
                let HeartRate = {
                    bpm: response.data[key].bpm,
                    date: currDate,
                    user_id: response.data[key].userid
                }
                arr.push(HeartRate);
            });
            let arrTable = arr.reverse();

            if (arrTable.length !== 0 ){
                setLastRec(arrTable[0].bpm);
                setHeartData(arrTable);
                let data = [];
                for(let i = 0; i < arrTable.length; i++){
                    data.push(createData(i, arrTable[i].bpm, arrTable[i].date.format('lll')));
                }
                setRows(data);
            
                let chartdata = "{";
                let currAveRate = 0;
                for(let i = 9; i >= 0; i--){
                    currAveRate += arrTable[i].bpm;
                    chartdata += '"' + arrTable[i].date.format('MMM D, YYYY h:m.s') + '": ' + arrTable[i].bpm;
                    if(i !== 0){
                        chartdata += ",";
                    }
                }
                console.log("Chart Data:", chartdata);
                chartdata += "}"
                setData(JSON.parse(chartdata));
                setAvgRate(Math.round(currAveRate / 10));
            } else {
                setDatesButtonDis(true);
            }
        })
    }, [])

    const updateGraph = (newPage, rowsPerPageNew, arr) => {
        let chartdata = "{";
        let currAveRate = 0;
        let count = 0;
        if(rowsPerPageNew !== -1)
        {
            for(let i = (newPage * rowsPerPageNew); i < ((rowsPerPageNew * newPage) + rowsPerPageNew); i++){
                if(i > arr.length - 1)
                {
                    break; 
                }
                currAveRate += arr[i].bpm;
                chartdata += '"' + arr[i].date.format('MMM D, YYYY h:m.s') + '": ' + arr[i].bpm + ',';
                count++;
            }
        } else {
            for(let i = 0; i < arr.length; i++){
                currAveRate += arr[i].bpm;
                chartdata += '"' + arr[i].date.format('MMM D, YYYY h:m.s') + '": ' + arr[i].bpm + ',';
                count++;
            }
        }
        chartdata = chartdata.substring(0, chartdata.length - 1)
        chartdata += "}"
        setData(JSON.parse(chartdata));
        setAvgRate(Math.round(currAveRate / count));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        updateGraph(newPage, rowsPerPage, heartData);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        updateGraph(0, +event.target.value, heartData);
    };

    const handleReset = () => {
        setOpen(false);
        let data = [];
        for(let i = 0; i < heartData.length; i++){
            data.push(createData(i, heartData[i].bpm, heartData[i].date.format('lll')));
        }
        setRows(data);
        let chartdata = "{";
        let currAveRate = 0;
        for(let i = 9; i >= 0; i--){
            currAveRate += heartData[i].bpm;
            chartdata += '"' + heartData[i].date.format('MMM D, YYYY h:m.s') + '": ' + heartData[i].bpm;
            if(i !== 0){
                chartdata += ",";
            }
        }
        chartdata += "}"
        setData(JSON.parse(chartdata));
        setAvgRate(Math.round(currAveRate / 10));
        setPage(0);
        setRowsPerPage(10);
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        let dateFrom = moment(selectedDateFrom);
        let dateTo = moment(selectedDateTo);
        if(dateFrom.isAfter(dateTo) || dateTo.isBefore(dateFrom)){
            alert("The date start must not be after the end date or the end date must not be before the start date!");
        } else {
            console.log("Hello")
            let tableData = [];
            let chartData = "{";
            let heartRates = 0;
            let numRates = 0;
            for(let i = 0; i < heartData.length; i++){
                let currDate = heartData[i].date;
                if(currDate.isAfter(dateFrom) && currDate.isBefore(dateTo)){
                    heartRates += heartData[i].bpm;
                    numRates++;
                    tableData.push(createData(i, heartData[i].bpm, heartData[i].date.format('lll')));
                    chartData += '"' + heartData[i].date.format('MMM D, YYYY h:m.s') + '": ' + heartData[i].bpm + ',';
                }
            }
            if (numRates > 0) {
                setAvgRate(Math.round(heartRates / numRates))
                chartData = chartData.substring(0, chartData.length - 1)
                chartData += "}"
                setRows(tableData);
                setData(JSON.parse(chartData));
                setPage(0);
                setRowsPerPage(-1);
            } else {
                console.log("No data found between those dates");
            }
        }
      };

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date);
    };

    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date);
    };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid>
            <SideBar />
        </Grid>
        <Grid lg={10} >
            <div className={classes.gridRight}>
                <div className={classes.heading}>
                    <div className={classes.rootHead}>
                        <Grid container spacing={3}>
                            <Grid className={classes.welcome} item xs={6}>
                                Welcome, Bryce Schmisseur
                                <div style={{fontSize: '20px'}}>This is your Dashboard</div>
                            </Grid>
                            <Grid className={classes.signIn} item xs={6}>
                            <Button disabled={datesButtonDis} className={classes.button} onClick={handleClickOpen}>Select Dates</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Grid container>
                    <Grid className={classes.gridRight} xs={6}>
                        <Paper className={classes.rootTable}>
                        <TableContainer className={classes.containerTable}>
                            <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody id="currentRows">
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.unNum}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                        );
                                    })}
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage > 0 ? rowsPerPage : rows.length}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </Paper>
                    </Grid>
                    <Grid className={classes.gridRight} xs={6}>
                        <div>
                            <Paper className={classes.rootGraph}>
                                <div className={classes.chartTitle}>
                                    BPM VS Time
                                </div>
                            <LineChart 
                                messages={{empty: "No data"}}
                                titel = "Heart Rate"
                                ytitle= "Beats per Minute (BPM)"
                                xtitle= "Date Time"
                                data={data} 
                                discrete = {true}
                                />
                            </Paper>
                        </div>
                        <Grid container>
                            <Grid className={classes.gridRight} xs={6}>
                                <Paper style={{padding: '15px'}}>
                                    <div className={classes.titleRate}>Average Heart Rate</div>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon style={{fontSize: 'large'}}><FavoriteIcon /></ListItemIcon>
                                            <ListItemText><Typography className={classes.listLabelRate}>{avgRate} BPM</Typography></ListItemText>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid className={classes.gridRight} xs={6}>
                                <Paper style={{padding: '15px'}}>
                                    <div className={classes.titleRate}>Last Recorded</div>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon style={{fontSize: 'large'}}><FavoriteIcon /></ListItemIcon>
                                            <ListItemText><Typography className={classes.listLabelRate}>{lastRec} BPM</Typography></ListItemText>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />
            </div>
        </Grid>
      </Grid>
      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Date Selector</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select any two dates that you would like to pull information from:
          </DialogContentText>
          <form className={classes.form} noValidate>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DialogContentText>
                    Start Date:
                </DialogContentText>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedDateFrom}
                        onChange={handleDateChangeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    /> 
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDateFrom}
                        onChange={handleDateChangeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
                <DialogContentText>
                    End Date:
                </DialogContentText>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedDateTo}
                        onChange={handleDateChangeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    /> 
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time"
                        value={selectedDateTo}
                        onChange={handleDateChangeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleReset} color="primary">
                Reset
            </Button>
          <Button onClick={handleClose} color="primary">
            <b>Select</b>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
}