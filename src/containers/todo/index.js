import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, withStyles} from '@material-ui/core';
import Input from '../../components/input';
import TaskList from '../../components/task-list';
import * as actions from '../../store/actions';
import _ from 'lodash';
import styles from './styles';

class Todo extends Component {
  static propTypes = {
    todo: PropTypes.shape()
  };

  static defaultProps = {
    todo: {}
  }

  state = {
    editableItem: null,
    isReversed: null,
  }

  componentDidMount() {
    this.props.dispatch(actions.todo.getList());
  }
 
  onChange = data => {
    this.props.dispatch(actions.todo.change(data));
  }

  onCreate = () => {
    const idList = this.props.todo.list.length > 0 && this.props.todo.list.map(item => Number(item.id));
    const uniqueId = idList.length > 0 ? _.max(idList) + 1 : 0;
    const data = {...this.props.todo.data, id: uniqueId}
    this.props.dispatch(actions.todo.create(data)).then(() => {
      localStorage.setItem('list', JSON.stringify(this.props.todo.list));
    });
  }

  toggleCheck = id => () => {
    this.props.dispatch(actions.todo.toggleCheck(id)).then(() => {
      localStorage.setItem('list', JSON.stringify(this.props.todo.list));
    })
  }

  onEdit = id => () => {
    this.setState({editableItem: id})
    const data = this.props.todo.list.filter(item => item.id === id)[0];
    this.props.dispatch(actions.todo.change(data));
  }

  onCancel = () => {
    this.setState({editableItem: null});
    this.props.dispatch(actions.todo.clearData());
  }

  onUpdate = () => {
    this.setState({editableItem: null});
    this.props.dispatch(actions.todo.update()).then(() => {
      localStorage.setItem('list', JSON.stringify(this.props.todo.list));
    });
  }

  onDelete = id => () => {
    this.props.dispatch(actions.todo.delete(id)).then(() => {
      localStorage.setItem('list', JSON.stringify(this.props.todo.list));
    });
  }

  toggleSort = (isReversed) => () => {
    this.setState({
      isReversed: !isReversed,
    })

  }

  sort = (items) => {
    const sorted = [...items];
    return sorted.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      } else if (a.title > b.title) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  reverse = (items) => {
    const sorted = [...items];
    return sorted.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  render() {
    const {todo, classes} = this.props;
    const {editableItem, isReversed} = this.state;
    let list;
    if (isReversed === null) {
      list = todo.list;
    } else if (isReversed) {
      list = this.reverse(todo.list);
    } else {
      list = this.sort(todo.list);
    }
   
    return (
      <div>
        <header className={classes.header}>
          <Input
            onChange={this.onChange}
            data={editableItem !== null ? {} : todo.data}
            onFocus={this.onCancel}
          />
          <Button className={classes.button} variant="contained" color="primary" onClick={this.onCreate}>
            Add new item
          </Button>
          <Button className={classes.button} variant="contained" color="default" onClick={this.toggleSort(isReversed)}>Sort</Button>
          <TaskList
            data={todo.data}
            list={list}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            toggleCheck={this.toggleCheck}
            editableItem={editableItem}
            onChange={this.onChange}
            onCancel={this.onCancel}
            onUpdate={this.onUpdate}
          />
        </header>
      </div>
    );
  }
}

export default connect(state => ({
  todo: state.todo,
}))(withStyles(styles)(Todo));