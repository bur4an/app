import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    //maxHeight: 900,
  },
  button: {
    margin: theme.spacing.unit,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: '#c2d6d6',
    padding: 0,
  },
  listSubheader: {
    fontSize : '18pt'
  }
});



class SimpleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tickets:[], details: [], open: false};

    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
        const self = this;
        fetch('/cwapi', {
            method:'GET',
            headers: {
              'Content-Type': 'application/json'
            }
            })
          .then(res => res.json())
          .then(data => {console.log(data); self.setState({ tickets: data })});
    }

    handleClose = () => {
        this.setState({ open: false });
      };

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root} subheader={<li />}>
        {['Priority 1 - Emergency Response',
          'Priority 2 - Quick Response',
          'Priority 2 - VIP',
          'Priority 3 - Normal Response',
          'Priority 4 - Low Priority',
          'Priority 5 - Scheduled Work'].map(sectionId => (
        <li key={sectionId} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.listSubheader}>{sectionId}</ListSubheader>
            {this.state.tickets.filter(p => p.priority.name == sectionId).map(item => (
              <ListItem key={item.priority.id}>
                <ListItemText primary={<a
                    href={`https://connect.lancom.co.nz/v4_6_release/ConnectWise.aspx?locale=en_NZ&routeTo=ServiceFV&srRecID=${item.id}`} >
                    {item.summary}
                  </a>}
                  secondary={
                    <Button
                      color="primary"
                      onClick={() => {
                        fetch('/cwapi/notes', {
                        method:'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: item.id})
                        })
                        .then(res => res.json())
                        .then(details => this.setState({details: details, open: true}))
                        }}>
                        Show Notes
                    </Button>
                  }  />
              </ListItem>
            ))}
          </ul>
        </li>
        ))}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Tickets Notes"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.details.map((detail) => detail.text)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </List>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
