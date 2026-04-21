import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  filteredPeople: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, filteredPeople }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') as SortField | null;
  const currentOrder = searchParams.get('order');

  const getSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (currentOrder !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getIconClass = (field: SortField) =>
    classNames('fas', {
      'fa-sort': currentSort !== field,
      'fa-sort-up': currentSort === field && currentOrder !== 'desc',
      'fa-sort-down': currentSort === field && currentOrder === 'desc',
    });

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
                  <i className={getIconClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getIconClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getIconClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getIconClass('died')} />
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
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
