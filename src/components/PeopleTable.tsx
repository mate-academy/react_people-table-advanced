import { useState } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  getpeople: Person[]
};

export const PeopleTable: React.FC<Props> = ({ getpeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort' || '');
  const [sortValue, setSortValue] = useState('');
  // const [sortedPeople, setSortedPeople] = useState<Person[]>([])

  const heandleSort = () => {
    const params = new URLSearchParams(searchParams);
    let count = 0;

    if (count === 0) {
      count = +1;
      params.set('sort', sortValue);
      setSearchParams(params);
    }

    if (sort === sortValue && count === 1) {
      count = +1;
      params.set('sort', `${sortValue}&order=desc`);
      setSearchParams(params);
    }

    if (sort !== sortValue) {
      count = 1;
      params.set('sort', sortValue);
      setSearchParams(params);
    }
  };

  const { slug } = useParams();
  const getParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parentName = getpeople.find(person => person.name === name);

    if (parentName) {
      return <PersonLink person={parentName} />;
    }

    return name;
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
              <NavLink
                to={`#/people?sort${sort}`}
                onClick={() => {
                  heandleSort();
                  setSortValue('name');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink to="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink to="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink to="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {getpeople.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
