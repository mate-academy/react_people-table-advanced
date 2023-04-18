import { SortType } from '../../types/SortType';
import { SortLink } from '../SortLink';

export const TableHead: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SortLink sortFilter={SortType.NAME} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SortLink sortFilter={SortType.SEX} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SortLink sortFilter={SortType.BORN} />
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SortLink sortFilter={SortType.DIED} />
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
