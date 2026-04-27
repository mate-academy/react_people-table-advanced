/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  filteredPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, filteredPeople }) => {
  const findPerson = (name: string): Person | null => {
    return people.find(person => person.name === name) || null;
  };

  const [searchParams] = useSearchParams();

  const searchSort = searchParams.get('sort') || '';
  const searchOrder = searchParams.get('order') || '';

  const handleSort = (name: string): SearchParams => {
    if (!searchSort || searchSort !== name) {
      return { sort: name, order: null };
    }

    if (searchSort === name && !searchOrder) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const handleSortClass = (name: string) => {
    return classNames('fas', {
      'fa-sort-up': searchSort === name && !searchOrder,
      'fa-sort-down': searchSort === name && searchOrder,
      'fa-sort': searchSort !== name,
    });
  };

  const { slug } = useParams();

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
              <SearchLink params={handleSort('name')}>
                <span className="icon">
                  <i className={handleSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex')}>
                <span className="icon">
                  <i className={handleSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born')}>
                <span className="icon">
                  <i className={handleSortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died')}>
                <span className="icon">
                  <i className={handleSortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const foundMother = person.motherName
            ? findPerson(person.motherName)
            : null;
          const foundFather = person.fatherName
            ? findPerson(person.fatherName)
            : null;

          return (
            <tr
              data-cy="person"
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
                {foundMother ? (
                  <PersonLink person={foundMother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {foundFather ? (
                  <PersonLink person={foundFather} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
