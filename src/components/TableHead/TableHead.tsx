import { SortFields } from '../../types/SortFields';

interface TableHeadProps {
  sortField: SortFields | null;
  sortDirection: 'asc' | 'desc' | null;
  onSort: (column: SortFields) => void;
}

const tableValuesWhichSorted = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

export const TableHead: React.FC<TableHeadProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  return (
    <thead>
      <tr>
        {Object.entries(tableValuesWhichSorted).map(
          ([linkName, columnName]) => {
            const field = linkName as SortFields;

            let iconClass = 'fa-sort';

            if (sortField === field) {
              iconClass =
                sortDirection === 'asc'
                  ? 'fa-sort-up'
                  : sortDirection === 'desc'
                    ? 'fa-sort-down'
                    : 'fa-sort';
            }

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <a
                    onClick={event => {
                      event.preventDefault();
                      onSort(field);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="icon ml-1">
                      <i className={`fas ${iconClass}`} />
                    </span>
                  </a>
                </span>
              </th>
            );
          },
        )}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
