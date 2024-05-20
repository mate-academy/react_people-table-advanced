import { SortLink } from './SortLink';
import { Sorts } from '../types/Sorts';

export const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SortLink name={Sorts.name}></SortLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SortLink name={Sorts.sex}></SortLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SortLink name={Sorts.born}></SortLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SortLink name={Sorts.died}></SortLink>
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
