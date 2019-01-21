import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from './List.jsx';
import styled from 'styled-components';

const Container = styled.div`
 text-align: center;
`;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], value: 'P2 Tickets'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      fetch('/cwapi', {
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          }
          })
        .then(res => res.json())
        .then(list => {console.log(list); this.setState({ data: list })});
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        /*<Button variant="outlined" href="/msgraph" className={classes.button}>
          Connect
        </Button>
        <Button variant="outlined" href="/msgraph/disconnect" className={classes.button}>
          Disconnect
        </Button>*/
        <form onSubmit={this.handleSubmit}>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Load Tickets
          </Button>
        </form>
        <List data={this.state.data} />
      </Container>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
