import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { LinkPerson } from './LinkPerson';
import cn from 'classnames';
import { useState } from 'react';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

enum Sort {
  name = 'name',
  sex = 'sex',
  died = 'died',
  born = 'born',
}

type SortOrder = 'asc' | 'desc';

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortedPeople, setSortedPeople] = useState<Person[]>(people);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();

  // const searchParams = new URLSearchParams(prevParams.toString());

  const toggleSortOrder = () => {
    return setSortOrder(prevState => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const sortPeople = (column: Sort): Person[] => {
    const sorted = [...people];

    sorted.sort((a, b) => {
      const columnA = a[column];
      const columnB = b[column];

      if (typeof columnA === 'string' && typeof columnB === 'string') {
        return sortOrder === 'asc'
          ? columnA.localeCompare(columnB)
          : columnB.localeCompare(columnA);
      } else {
        return sortOrder === 'asc'
          ? Number(columnA) - Number(columnB)
          : Number(columnB) - Number(columnA);
      }
    });

    return sorted;
  };

  const handlerSortBy = (column: Sort) => {
    toggleSortOrder();
    setSortedPeople(sortPeople(column));

    searchParams.set('order', 'desc');
    setSearchParams(searchParams);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });

    // console.log(`${location.pathname}?${searchParams.toString()}`);
  };

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
              <SearchLink params={{ sort: 'name' }}>
                <span
                  onClick={() => {
                    handlerSortBy(Sort.name);
                  }}
                  className="icon"
                >
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="?sort=sex">
                <span onClick={() => handlerSortBy(Sort.sex)} className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="?sort=born">
                <span onClick={() => handlerSortBy(Sort.born)} className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="?sort=died">
                <span onClick={() => handlerSortBy(Sort.died)} className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const { slug, born, died, sex, fatherName, motherName } = person;
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <LinkPerson person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <LinkPerson person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <LinkPerson person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
