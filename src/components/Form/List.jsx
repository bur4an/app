import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PasswordForm from './PasswordForm.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem key="Subheader" cols={1} style={{ height: 'auto' }}>
          <ListItemText >{props.value}</ListItemText>
        </ListItem>
        {props.data.map(list => (
          <ListItem key={list.id}>
            <ListItemText primary={list.displayName}
              secondary={<PasswordForm id={list.id} upn={list.userPrincipalName}/>}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
