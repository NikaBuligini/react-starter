import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { defaultTableRowRenderer, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

const SortableTable = SortableContainer(Table);
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

function rowRenderer(props) {
  return <SortableTableRowRenderer {...props} />;
}

function CustomizedTable(props) {
  return <SortableTable rowRenderer={rowRenderer} {...props} />;
}

export default CustomizedTable;
