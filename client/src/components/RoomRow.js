import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
function RoomRow() {
  const [solu, setSolu] = useState([0, 1, 2, 3, 4]);
  const [huoneNro, setHuone] = useState(huoneNro);
  const renderRow = soluNro => {
    return (
      <Table.Cell>
        {soluNro}
        {huoneNro}
      </Table.Cell>
    );
  };

  {
    return solu.map(soluNro => {
      return renderRow(soluNro, huoneNro);
    });
  }
}

export default RoomRow;
