import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField, withStyles} from '@material-ui/core';
import styles from './styles';

class Input extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    data: PropTypes.shape().isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    onFocus: () => {}
  }

  onChange = name => e => {
    // if you want to add another text field, you will easily reuse this part of code
    const data = {...this.props.data, [name]: e.target.value};
    this.props.onChange(data);
  }

  render() {
    const {classes, data, onFocus} = this.props;
    
    return(
      <TextField
        onFocus={onFocus}
        onChange={this.onChange('title')}
        placeholder="Type your task title"
        value={data.title || ''} 
      />
    )
  }
}

export default withStyles(styles)(Input);