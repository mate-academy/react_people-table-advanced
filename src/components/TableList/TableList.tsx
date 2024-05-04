import { useContext } from 'react';
import { PersonComponent } from '../PersonComponent';
import { Person } from '../../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { filterPeople } from '../../utils/filterPeople';
import { sortPeople } from '../../utils/sortPeople';
import { preparePeopleWithLinks } from '../../utils/preparePeopleWithLinks';
import { TableContext } from '../../store/TableContextProvider';

export const TABLE_FIELDS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const TableList = ({ people }: { people: Person[] }) => {
  const { setIsEmptyMessage } = useContext(TableContext);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  let preparedPeople = preparePeopleWithLinks(people);

  preparedPeople = filterPeople(preparedPeople, centuries, query, sex);
  setIsEmptyMessage(preparedPeople.length === 0);

  if (sortBy) {
    preparedPeople = sortPeople(preparedPeople, sortBy as keyof Person, order);
  }

  const handleSortIcon = (field: string) => {
    let iconClass = 'fa-sort';

    if (field.toLowerCase() === sortBy) {
      if (order !== 'desc') {
        iconClass = 'fa-sort-up';
      } else {
        iconClass = 'fa-sort-down';
      }
    }

    return (
      <span className="icon">
        <i className={`fas ${iconClass}`} />
      </span>
    );
  };

  const handleOrder = () => {
    if (sortBy && !order) {
      return 'desc';
    }

    return null;
  };

  const handleSort = (field: string) => {
    if (sortBy && order) {
      return null;
    }

    return field.toLowerCase();
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_FIELDS.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field !== 'Mother' && field !== 'Father' ? (
                  <>
                    {field}
                    <SearchLink
                      params={{
                        sort: handleSort(field),
                        order: handleOrder(),
                      }}
                    >
                      {handleSortIcon(field)}
                    </SearchLink>
                  </>
                ) : (
                  <>{field}</>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map((person: Person) => (
          <PersonComponent key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
