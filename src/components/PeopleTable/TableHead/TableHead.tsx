import { tableHeadRow } from '../../Data/Data';
import { TableHeadInfo } from './TableHeadInfo/TableHeadInfo';

export const TableHead = () => {
  return (
    <thead>
      <tr>
        {tableHeadRow.map((cell) => (
          <TableHeadInfo key={cell.id} cell={cell} />))}
      </tr>
    </thead>
  );
};
