import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedPersonSlug: string | null;
  onSelectPerson: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  onSelectPerson,
}) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const enhancedPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName) || undefined,
    father: people.find(p => p.name === person.fatherName) || undefined,
  }));

  const getSortIcons = (field: string) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (!currentOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('name')}`}></i>
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('sex')}`}></i>
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('born')}`}></i>
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('died')}`}></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {enhancedPeople.map(person => {
          const {
            sex,
            born,
            died,
            mother,
            father,
            motherName,
            fatherName,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPersonSlug,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} onSelect={onSelectPerson} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} onSelect={onSelectPerson} />
                ) : motherName ? (
                  motherName
                ) : (
                  '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} onSelect={onSelectPerson} />
                ) : fatherName ? (
                  fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}

        {/* <tr data-cy="person">
          <td>
            <a href="#/people/philibert-haverbeke-1907">
              Philibert Haverbeke
            </a>
          </td>

          <td>m</td>
          <td>1907</td>
          <td>1997</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/emma-de-milliano-1876"
            >
              Emma de Milliano
            </a>
          </td>

          <td>
            <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
          </td>
        </tr>

        <tr data-cy="person" className="has-background-warning">
          <td>
            <a href="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </a>
          </td>

          <td>m</td>
          <td>1761</td>
          <td>1833</td>
          <td>-</td>

          <td>
            <a href="#/people/jacobus-bernardus-van-brussel-1736">
              Jacobus Bernardus van Brussel
            </a>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <a
              className="has-text-danger"
              href="#/people/lievijne-jans-1542"
            >
              Lievijne Jans
            </a>
          </td>

          <td>f</td>
          <td>1542</td>
          <td>1582</td>
          <td>-</td>
          <td>-</td>
        </tr>

        <tr data-cy="person">
          <td>
            <a href="#/people/bernardus-de-causmaecker-1721">
              Bernardus de Causmaecker
            </a>
          </td>

          <td>m</td>
          <td>1721</td>
          <td>1789</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/livina-haverbeke-1692"
            >
              Livina Haverbeke
            </a>
          </td>

          <td>
            <a href="#/people/lieven-de-causmaecker-1696">
              Lieven de Causmaecker
            </a>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};
