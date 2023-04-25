import { SorterLink } from '../Links/SorterLink';
import { SortBy } from '../../types/SortBy';

export const HeaderTables = () => {
  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SorterLink sort={SortBy.name} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SorterLink sort={SortBy.sex} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SorterLink sort={SortBy.born} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SorterLink sort={SortBy.died} />
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
