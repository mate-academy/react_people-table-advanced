const tableHeadValues = {
  Name: 'Name',
  Sex: 'Sex',
  Born: 'Born',
  Died: 'Died',
  Mother: 'Mother',
  Father: 'Father',
};

export const TableHead = () => {
  return (
    <thead>
      <tr>
        {Object.values(tableHeadValues).map(columnName => (
          <th key={columnName}>{columnName}</th>
        ))}
      </tr>
    </thead>
  );
};
