import { SortableField } from '../../types/types';
import { SortableTableField } from './SortableTableField';

export const PeopleTableHead: React.FC = () => (
  <thead>
    <tr>
      <th>
        <SortableTableField title="Name" field={SortableField.Name} />
      </th>

      <th>
        <SortableTableField title="Sex" field={SortableField.Sex} />
      </th>

      <th>
        <SortableTableField title="Born" field={SortableField.Born} />
      </th>

      <th>
        <SortableTableField title="Died" field={SortableField.Died} />
      </th>

      <th>Mother</th>
      <th>Father</th>
    </tr>
  </thead>
);
