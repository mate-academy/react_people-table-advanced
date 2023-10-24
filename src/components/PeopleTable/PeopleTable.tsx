import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

type Column = {
  [key: string]: string,
};

const TABLE_COLUMNS: Column = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const defineSortParams = (columnKey: string) => {
    const isSortParamTheSame = searchParams.get('sort') === columnKey;
    const sortParam = searchParams.get('order') ? null : columnKey;
    const orderParam = searchParams.get('order') ? null : 'desc';

    const newSort = !isSortParamTheSame
      ? columnKey
      : sortParam;
    const newOrder = !isSortParamTheSame
      ? null
      : orderParam;

    return { sort: newSort, order: newOrder };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(TABLE_COLUMNS).map(columnKey => {
            const columnValue = TABLE_COLUMNS[columnKey];

            return (
              <th key={columnKey}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnValue}
                  <SearchLink
                    params={defineSortParams(columnKey)}
                  >
                    <span className="icon">
                      <i className={cn('fas fa-sort', {
                        'fa-sort-up': searchParams.get('sort') === columnKey
                          && !searchParams.get('order'),
                        'fa-sort-down': searchParams.get('sort') === columnKey
                          && !!searchParams.get('order'),
                      })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
