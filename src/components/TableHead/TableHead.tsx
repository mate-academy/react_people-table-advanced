import { SortDirection } from '../../types/SortDirection';
import { SortFields } from '../../types/SortFields';

interface TableHeadProps {
  sortField: SortFields | null;
  sortDirection: SortDirection;
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
  const getSortIconClass = (columnField: SortFields): string => {
    if (sortField !== columnField) {
      return 'fa-sort';
    }

    switch (sortDirection) {
      case 'asc':
        return 'fa-sort-up';
      case 'desc':
        return 'fa-sort-down';
      default:
        return 'fa-sort';
    }
  };

  return (
    <thead>
      <tr>
        {Object.entries(tableValuesWhichSorted).map(
          ([linkName, columnName]) => {
            const columnField = linkName as SortFields;

            const iconClass = getSortIconClass(columnField);

            return (
              <th key={columnField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <a
                    onClick={event => {
                      event.preventDefault();
                      onSort(columnField);
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
