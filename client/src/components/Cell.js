import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'semantic-ui-react';

function Cell() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData('0');
  }, []);

  const renderCell = () => {
    return <Table.Cell>{data}</Table.Cell>;
  };

  return <div>{renderCell()}</div>;
}

export default Cell;
