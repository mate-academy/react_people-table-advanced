import React from 'react';
import { useLocation } from 'react-router-dom';
import { AscOrder } from '../AscOrder/AscOrder';
import { DescOrder } from '../DescOrder/DescOrder';

type Props = {
  option: string;
};

export const SortOption: React.FC<Props> = React.memo(({ option }) => {
  const { search } = useLocation();

  return (
    <th>
      <span
        className="is-flex is-flex-wrap-nowrap"
      >
        {option}
        {search.includes('&order=desc')
          ? <DescOrder option={option} />
          : <AscOrder option={option} />}
      </span>
    </th>
  );
});
