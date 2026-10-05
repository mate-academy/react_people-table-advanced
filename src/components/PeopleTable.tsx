import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');
  const peopleByName = new Map(people.map(person => [person.name, person]));

  function getSortIcon(column: string) {
    if (sortBy !== column) {
      return 'fa-sort';
    }

    return order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  function handleSortClick(column: string) {
    let newSortBy = column;
    let newOrder = 'asc';

    if (sortBy === column) {
      if (order === 'asc') {
        newOrder = 'desc';
      } else if (order === 'desc') {
        newSortBy = '';
        newOrder = '';
      }
    }

    const newParams = getSearchWith(searchParams, {
      sort: newSortBy || null,
      order: newOrder || null,
    });

    setSearchParams(newParams);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a onClick={() => handleSortClick('name')}>
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={`fas ${getSortIcon('name')}`}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSortClick('sex')}>
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={`fas ${getSortIcon('sex')}`}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSortClick('born')}>
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={`fas ${getSortIcon('born')}`}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSortClick('died')}>
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={`fas ${getSortIcon('died')}`}
                  />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} name={person.name} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                name={person.motherName}
                person={
                  person.motherName
                    ? peopleByName.get(person.motherName)
                    : undefined
                }
              />
            </td>
            <td>
              <PersonLink
                name={person.fatherName}
                person={
                  person.fatherName
                    ? peopleByName.get(person.fatherName)
                    : undefined
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
