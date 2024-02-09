import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Parents } from '../types/Parents';
import { PersonItem } from './PersonItem';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[]
};

function findParents(people: Person[], person: Person): Parents {
  const father = people.find(item => item.name === person.fatherName) || null;
  const mother = people.find(item => item.name === person.motherName) || null;

  return { father, mother };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function getPreparedSearch(sortBy: string): string {
    let isOrderDeleted = false;

    if (order) {
      isOrderDeleted = true;
    }

    if (sort === sortBy) {
      return isOrderDeleted
        ? getSearchWith({ sort: null, order: null }, searchParams)
        : getSearchWith({ order: 'desc' }, searchParams);
    }

    return getSearchWith({ sort: sortBy, order: null }, searchParams);
  }

  function getIconStyle(name: string): string {
    let secondClass = 'fa-sort';

    if (sort === name) {
      secondClass = order && sort ? 'fas fa-sort-down' : 'fas fa-sort-up';
    }

    return `fas ${secondClass}`;
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
              <Link
                to={{ search: getPreparedSearch('name') }}
              >
                <span className="icon">
                  <i className={getIconStyle('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{ search: getPreparedSearch('sex') }}
              >
                <span className="icon">
                  <i className={getIconStyle('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{ search: getPreparedSearch('born') }}
              >
                <span className="icon">
                  <i className={getIconStyle('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{ search: getPreparedSearch('died') }}
              >
                <span className="icon">
                  <i className={getIconStyle('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const parents = findParents(people, person);

          return (
            <PersonItem
              key={person.slug}
              person={person}
              parents={parents}
            />
          );
        })}
      </tbody>
    </table>
  );
};
