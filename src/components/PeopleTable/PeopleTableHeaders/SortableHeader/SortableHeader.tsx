import { FC } from 'react';
import { SortByOptions } from '../../../../services/types';
import './SortableHeader.scss';
import { useSortHandler } from '../../../../services/hooks/useSortHandler';
import { useSortImage } from '../../../../services/hooks/useSortImage';

interface Props {
  name: SortByOptions;
}

export const SortableHeader: FC<Props> = ({ name }) => {
  const image = useSortImage(name);
  const handleHeaderClick = useSortHandler();

  return (
    <th
      className="is-capitalized sortable-header"
      onClick={() => handleHeaderClick(name)}
    >
      <div className="is-flex">
        {name}
        <span className="icon is-right">
          <img src={image} alt="" />
        </span>
      </div>
    </th>
  );
};
