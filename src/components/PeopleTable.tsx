import { FC } from 'react';
import {
  Link, useLocation, useParams, useResolvedPath, useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';

interface Props {
  people: Person[],
  isActiveSort: boolean,
  activateSort: (param: boolean) => void,
  updateSearch: (params: { [key: string]: string[] | string | null }) => void,
}

export const PeopleTable: FC<Props> = (props) => {
  const {
    people, updateSearch, activateSort, isActiveSort,
  } = props;

  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const { slug = '' } = useParams();
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const isSelected = (person: Person) => person.slug === slug;

  const findMother = (person: Person) => people
    .find(mother => person.motherName === mother.name);
  const findFather = (person: Person) => people
    .find(father => father.name === person.fatherName);

  const headers: [keyof Person, string][] = [
    ['name', 'Name'],
    ['sex', 'Sex'],
    ['born', 'Born'],
    ['died', 'Died'],
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map((title) => (
            <th key={title[0]}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title[1]}
                <a
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    const sortByType = title[0];

                    if (sort !== sortByType) {
                      updateSearch({ order: null, sort: `${sortByType}` });
                      activateSort(true);
                    }

                    if (!isActiveSort && !order) {
                      updateSearch({ sort: `${sortByType}` });
                      activateSort(true);

                      // return;
                    }

                    if (isActiveSort && sort === sortByType) {
                      updateSearch({ order: 'desc', sort: `${sortByType}` });
                      activateSort(false);

                      // return;
                    }

                    if (!isActiveSort && sort === sortByType && order) {
                      updateSearch({ order: null, sort: null });
                    }
                  }}
                >
                  <span className="icon">
                    <i className={cn(
                      'fas',
                      { 'fa-sort': !sort || sort !== title[0] },
                      { 'fa-sort-up': (!order && sort === title[0]) },
                      { 'fa-sort-down': (order && sort === title[0]) },
                    )}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (

          <tr
            data-cy="person"
            className={cn({
              'has-background-warning': isSelected(person),
            })}
            key={person.slug}
          >
            <td>
              <Link
                to={{
                  pathname: `${parentPath}${person.slug}`,
                  search: location.search,
                  hash: `${parentPath}${person.slug}`,
                }}
                style={{ color: person.sex === 'f' ? 'red' : 'blue' }}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>

              {findMother(person)
                ? (
                  <Link
                    to={{
                      pathname: `${parentPath}${findMother(person)?.slug}`,
                      search: location.search,
                    }}
                    style={{ color: 'red' }}
                  >
                    {person.motherName }
                  </Link>
                )
                : person.motherName || '-'}
            </td>
            <td>
              { findFather(person)
                ? (
                  <Link
                    to={{
                      pathname: `${parentPath}${findFather(person)?.slug}`,
                      search: location.search,
                    }}
                  >
                    { person.fatherName}
                  </Link>
                )
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};
