import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export const PeopleTable = ({ people, selectedSlug, onSelect }: Props) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  function getSortLinkTarget(field: string) {
    if (currentSort !== field) {
      return getSearchWith(searchParams, {
        sort: field,
        order: null,
      }).toString();
    } else if (currentOrder !== 'desc') {
      return getSearchWith(searchParams, {
        sort: field,
        order: 'desc',
      }).toString();
    } else {
      return getSearchWith(searchParams, {
        sort: field,
        order: null,
      }).toString();
    }
  }

  function getSortIconClass(field: string) {
    if (currentSort !== field) {
      return 'fas fa-sort';
    } else if (currentOrder !== 'desc') {
      return 'fas fa-sort-up';
    } else {
      return 'fas fa-sort-down';
    }
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
              <Link to={{ search: getSortLinkTarget('name') }}>
                <span className="icon">
                  <i className={getSortIconClass('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: getSortLinkTarget('sex') }}>
                <span className="icon">
                  <i className={getSortIconClass('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: getSortLinkTarget('born') }}>
                <span className="icon">
                  <i className={getSortIconClass('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: getSortLinkTarget('died') }}>
                <span className="icon">
                  <i className={getSortIconClass('died')} />
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
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              onClick={() => onSelect(person.slug)}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName && '-'}
                {person.motherName && mother && <PersonLink person={mother} />}
                {person.motherName && !mother && (
                  <span className="has-text-danger">{person.motherName}</span>
                )}
              </td>
              <td>
                {!person.fatherName && '-'}
                {person.fatherName && father && <PersonLink person={father} />}
                {person.fatherName && !father && (
                  <span className="has-text-danger">{person.fatherName}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
