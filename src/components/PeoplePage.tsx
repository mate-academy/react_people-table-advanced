import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

import { SortLink } from './SortLink';
import { SearchLink } from './SearchLink';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(p => ({ ...p }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother: preparedPeople.find(m => m.name === person.motherName)
              || null,
            father: preparedPeople.find(f => f.name === person.fatherName)
              || null,
          });
        });

        setPeople(preparedPeople);
      });
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => {
      return Math.ceil(person.born / 100);
    };

    visiblePeople = visiblePeople.filter(
      person => centuries.includes(getCentury(person).toString()),
    );
  }

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visiblePeople = visiblePeople.filter(({ name, motherName, fatherName }) => {
      return [name, motherName || '', fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People page</h1>
      {visiblePeople.length}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-4-desktop">
            <nav className="panel">
              <p className="panel-heading">
                Filters
              </p>

              <p className="panel-tabs">
                <SearchLink
                  params={{ sex: null }}
                  className={classNames({ 'is-active': !sex })}
                >
                  All
                </SearchLink>

                <SearchLink
                  params={{ sex: 'm' }}
                  className={classNames({ 'is-active': sex === 'm' })}
                >
                  Male
                </SearchLink>

                <SearchLink
                  params={{ sex: 'f' }}
                  className={classNames({ 'is-active': sex === 'f' })}
                >
                  Female
                </SearchLink>
              </p>

              <div className="panel-block">
                <NameFilter />
              </div>

              <div className="panel-block">
                <CenturyFilter />
              </div>

              <div className="panel-block">
                <SearchLink
                  className="button is-link is-outlined is-fullwidth"
                  params={{ sex: null, query: null, centuries: null }}
                >
                  Reset all filters
                </SearchLink>
              </div>
            </nav>
          </div>

          <div className="column">
            <table
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <SortLink field="name" />
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <SortLink field="sex" />
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <SortLink field="born" />
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <SortLink field="died" />
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {visiblePeople.map(person => (
                  <tr
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : person.motherName}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : person.fatherName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
