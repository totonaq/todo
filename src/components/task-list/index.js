import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, List, ListItem, ListItemText, ListItemIcon, withStyles
} from '@material-ui/core';
import {Edit, Delete, CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons';
import Input from '../input';
import styles from './styles';

class TaskList extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    data: PropTypes.shape().isRequired,
    list: PropTypes.arrayOf(PropTypes.shape()),
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired,
    editableItem: PropTypes.number,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: {},
    list: [],
    editableItem: null
  }

  render() {
    const {
      classes, data, list, onDelete, onChange, onEdit, toggleCheck, editableItem, onCancel, onUpdate
    } = this.props;

    return(
      <List component="nav">
        {
          list.map(item => {
            return (
              <ListItem button key={item.id}>
                <ListItemIcon onClick={toggleCheck(item.id)}>
                  {
                    item.isCompleted
                    ? <CheckBox />
                    : <CheckBoxOutlineBlank />
                  }
                </ListItemIcon>
                {
                  editableItem === item.id
                  ? (
                    <div className={classes.inputWrap}>
                      <Input data={data} onChange={onChange}/>
                     </div> 
                  ) : (
                    <ListItemText
                      classes={{
                        primary: item.isCompleted ? classes.completed : classes.incompleted
                      }}
                      primary={item.title}
                    />
                  )
                }
                <ListItemIcon onClick={onEdit(item.id)}>
                  <Edit />
                </ListItemIcon>
                <ListItemIcon onClick={onDelete(item.id)}>
                  <Delete />
                </ListItemIcon>
                {
                   editableItem === item.id
                   && (
                     <div className={classes.buttonWrap}>
                       <Button className={classes.button} variant="contained" color="primary" onClick={onUpdate}>Save</Button>
                       <Button className={classes.button} variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
                     </div>
                   )
                }
              </ListItem>
            )
          })
        }
      </List>
    )
  }
}

export default withStyles(styles)(TaskList);