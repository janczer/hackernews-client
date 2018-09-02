import React, { Component } from "react";
import {Button, Sort} from "./App";
import {sortBy} from "lodash";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const classNames = (...args) => args.reduce((acc, value) => acc + ' ' + value, '');

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({sortKey, isSortReverse});
  }

  render() {
    const {
      list,
      onDismiss,
    } = this.props;

    const {
      sortKey,
      isSortReverse,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={{width: '40%'}}>
            <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Title</Sort>
          </span>
          <span style={{width: '20%'}}>
            <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Author</Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}
                  isSortReverse={isSortReverse}>Comments</Sort>
          </span>
          <span style={{width: '10%'}}>
            <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey} isSortReverse={isSortReverse}>Points</Sort>
          </span>
          <span style={{width: '20%'}}>Buttons</span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.objectID} className={classNames("table-row", item.title ? '' : "table-row-comment")}>
          <span style={{width: '40%'}}>
            <a href={item.url}>{
              item.title ?
                item.title :
                item.comment_text.slice(0, 100) + '...'
            }</a>
          </span>
            <span style={{width: '20%'}}>
            {item.author}
          </span>
            <span style={{width: '10%'}}>
            {item.num_comments}
          </span>
            <span style={{width: '10%'}}>
            {item.points}
          </span>
            <span style={{width: '10%'}}>
            <Button
              onClick={() => window.open(`https://news.ycombinator.com/item?id=${item.objectID}`, '_blank')}
            >
              Comments
            </Button>
          </span>
            <span style={{width: '10%'}}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
          </div>
        )}
      </div>
    );
  }
}

export default Table;
// Table.propTypes = {
//   list: PropTypes.arrayOf(
//     PropTypes.shape({
//       objectID: PropTypes.string.isRequired,
//       author: PropTypes.string,
//       url: PropTypes.string,
//       num_comments: PropTypes.number,
//       points: PropTypes.number,
//     })
//   ).isRequired,
//   onDismiss: PropTypes.func.isRequired,
// };
