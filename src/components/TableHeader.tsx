import { FC } from 'react';
import { SortingCell } from '../types/sortingCell';
import { SortingLink } from './SortingLink';

export const TableHeader: FC = () => {
  const sortableHeaderTitles = Object.values(SortingCell);

  return (
    <thead>
      <tr>
        {sortableHeaderTitles.map(title => (
          <th
            key={title}
            style={{
              textDecoration: 'none',
            }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              {title}
              <SortingLink cellType={title} />
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
