import { SortType } from '../../types/SortType';
import { SortLink } from '../SortLink/SortLink';

export const SortHeader = () => {
  return (
    <tr>
      {Object.values(SortType).map(value => (
        <th key={value}>
          <span className="is-flex is-flex-wrap-nowrap">
            {`${value.slice(0, 1).toUpperCase()}${value.slice(1)}`}

            <SortLink sortField={value} />
          </span>
        </th>
      ))}

      <th>Mother</th>
      <th>Father</th>
    </tr>
  );
};
