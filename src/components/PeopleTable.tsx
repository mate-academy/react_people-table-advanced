import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { useState } from 'react';
import getSearchWith from '../utils/searchHelper';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const { slug: selectedUserSlug } = useParams();

  const findMother = (motherName: string) => {
    const mother = people.find(person => person.name === motherName);

    if (mother) {
      return (
        <Link to={`/people/${mother.slug}`} className="has-text-danger">
          {mother.name}
        </Link>
      );
    }

    return motherName;
  };

  const findFather = (fatherName: string) => {
    const father = people.find(person => person.name === fatherName);

    if (father) {
      return <Link to={`/people/${father.slug}`}>{father.name}</Link>;
    }

    return fatherName;
  };

  const [clickCount, setClickCount] = useState({
    name: 0,
    sex: 0,
    born: 0,
    died: 0,
  });

  const [sortKey, setSortKey] = useState<'name' | 'sex' | 'born' | 'died' | ''>(
    '',
  );

  // Handle click to update sorting state and trigger search param update
  const handleClick = (key: 'name' | 'sex' | 'born' | 'died') => {
    setSortKey(key);
    setClickCount(prev => ({
      ...prev,
      [key]: (prev[key] + 1) % 3,
    }));
  };

  const getSortIcon = (key: 'name' | 'sex' | 'born' | 'died') => {
    const count = clickCount[key];

    if (count === 0) {
      return 'fa-sort';
    }

    if (count === 1) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  const sortPeople = () => {
    const sortedPeople = [...people];

    switch (sortKey) {
      case 'name':
        sortedPeople.sort((a, b) =>
          clickCount.name === 1
            ? a.name.localeCompare(b.name)
            : clickCount.name === 2
              ? b.name.localeCompare(a.name)
              : 0,
        );
        break;

      case 'sex':
        sortedPeople.sort((a, b) =>
          clickCount.sex === 1
            ? a.sex.localeCompare(b.sex)
            : clickCount.sex === 2
              ? b.sex.localeCompare(a.sex)
              : 0,
        );
        break;

      case 'born':
        sortedPeople.sort((a, b) =>
          clickCount.born === 1
            ? a.born - b.born
            : clickCount.born === 2
              ? b.born - a.born
              : 0,
        );
        break;

      case 'died':
        sortedPeople.sort((a, b) =>
          clickCount.died === 1
            ? a.died - b.died
            : clickCount.died === 2
              ? b.died - a.died
              : 0,
        );
        break;
    }

    return sortedPeople;
  };

  const setSearchWith = (params: Record<string, string | null>) => {
    const searchString = getSearchWith(searchParams, params);

    setSearchParams(new URLSearchParams(searchString));
  };

  const handleSortChange = (key: 'name' | 'sex' | 'born' | 'died') => {
    handleClick(key);

    let order: 'asc' | 'desc' | null = null;

    if (clickCount[key] === 0) {
      order = 'asc';
    } else if (clickCount[key] === 1) {
      order = 'desc';
    }

    const params = { sort: key, order };

    setSearchWith(params);
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
              <a
                href="#/people?sort=name"
                onClick={e => {
                  e.preventDefault();
                  handleSortChange('name');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={e => {
                  e.preventDefault();
                  handleSortChange('sex');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born"
                onClick={e => {
                  e.preventDefault();
                  handleSortChange('born');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={e => {
                  e.preventDefault();
                  handleSortChange('died');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortPeople().map(
          ({ name, sex, born, died, fatherName, motherName, slug }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedUserSlug === `${slug}`,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>{motherName ? findMother(motherName) : '-'}</td>
              <td>{fatherName ? findFather(fatherName) : '-'}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
