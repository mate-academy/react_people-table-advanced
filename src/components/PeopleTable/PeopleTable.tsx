import cn from 'classnames';

import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  function getRelation(name: string | null) {
    if (!name) {
      return '-';
    }

    const relatedPerson = people.find(person => person.name === name);

    if (relatedPerson) {
      return <PersonLink person={relatedPerson} />;
    } else {
      return name;
    }
  }

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  function getSortParams(field: string) {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentSort === field && currentOrder === null) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': currentSort !== 'name',

                      'fa-sort-up':
                        currentSort === 'name' && currentOrder === null,

                      'fa-sort-down':
                        currentSort === 'name' && currentOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': currentSort !== 'sex',

                      'fa-sort-up':
                        currentSort === 'sex' && currentOrder === null,

                      'fa-sort-down':
                        currentSort === 'sex' && currentOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': currentSort !== 'born',

                      'fa-sort-up':
                        currentSort === 'born' && currentOrder === null,

                      'fa-sort-down':
                        currentSort === 'born' && currentOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': currentSort !== 'died',

                      'fa-sort-up':
                        currentSort === 'died' && currentOrder === null,

                      'fa-sort-down':
                        currentSort === 'died' && currentOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getRelation(person.motherName)}</td>
            <td>{getRelation(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
