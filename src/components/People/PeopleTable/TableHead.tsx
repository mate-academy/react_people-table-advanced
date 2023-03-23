import { SortFieldTable } from '../../../types/SortFieldTable';
import { SortLink } from './SortLink';

export const TableHead = () => (
  <thead>
    <tr>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Name
          <SortLink sortField={SortFieldTable.NAME} />
        </span>
      </th>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Sex
          <SortLink sortField={SortFieldTable.SEX} />
        </span>
      </th>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Born
          <SortLink sortField={SortFieldTable.BORN} />
        </span>
      </th>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Died
          <SortLink sortField={SortFieldTable.DIED} />
        </span>
      </th>
      <th>Mother</th>
      <th>Father</th>
    </tr>
  </thead>
);
