import { PersonComponent } from '../PersonComponent';
import { Person } from '../../types/Person';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const TABLE_FIELDS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

const preparePeopleWithLinks = (peopleList: Person[]) => {
  return peopleList.map(person => {
    return {
      ...person,
      father:
        peopleList.find(candidate => candidate.name === person.fatherName) ||
        null,
      mother:
        peopleList.find(candidate => candidate.name === person.motherName) ||
        null,
    };
  });
};

export const TableList = ({ people }: { people: Person[] }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  let preparedPeople = preparePeopleWithLinks(people);

  if (centuries.length > 0) {
    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  function sortPeople(persons: Person[], field: keyof Person) {
    return [...persons].sort((person1, person2) => {
      const valueA = person1[field];
      const valueB = person2[field];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });
  }

  if (sortBy) {
    preparedPeople = sortPeople(preparedPeople, sortBy as keyof Person);
  }

  if (order) {
    preparedPeople = preparedPeople.reverse();
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
