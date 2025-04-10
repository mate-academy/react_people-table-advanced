import { useContext } from 'react';
import { PeopleContext } from '../contexts/PeopleContext';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../components/PersonLink';
import { SearchLink } from './SearchLink';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const params = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const gettingNextParams = (field: SortField | null) => {
    let nextSort: SortField | null = null;
    let nextOrder: SortOrder | null = null;

    if (currentSort !== field) {
      nextSort = field;
      nextOrder = null;
    } else if (currentSort === field && currentOrder === null) {
      nextSort = field;
      nextOrder = SortOrder.Desc;
    } else {
      nextSort = null;
      nextOrder = null;
    }

    return { nextSort, nextOrder };
  };

  const { nextSort: nameSort, nextOrder: nameOrder } = gettingNextParams(
    SortField.Name,
  );
  const { nextSort: sexSort, nextOrder: sexOrder } = gettingNextParams(
    SortField.Sex,
  );
  const { nextSort: bornSort, nextOrder: bornOrder } = gettingNextParams(
    SortField.Born,
  );
  const { nextSort: diedSort, nextOrder: diedOrder } = gettingNextParams(
    SortField.Died,
  );

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
              <SearchLink params={{ sort: nameSort, order: nameOrder }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !currentSort || currentSort !== SortField.Name,
                      'fa-sort-up':
                        currentSort === SortField.Name &&
                        currentOrder !== SortOrder.Desc,
                      'fa-sort-down':
                        currentSort === SortField.Name &&
                        currentOrder === SortOrder.Desc,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: sexSort, order: sexOrder }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !currentSort || currentSort !== SortField.Sex,
                      'fa-sort-up':
                        currentSort === SortField.Sex &&
                        currentOrder !== SortOrder.Desc,
                      'fa-sort-down':
                        currentSort === SortField.Sex &&
                        currentOrder === SortOrder.Desc,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: bornSort, order: bornOrder }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !currentSort || currentSort !== SortField.Born,
                      'fa-sort-up':
                        currentSort === SortField.Born &&
                        currentOrder !== SortOrder.Desc,
                      'fa-sort-down':
                        currentSort === SortField.Born &&
                        currentOrder === SortOrder.Desc,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sort: diedSort, order: diedOrder }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': !currentSort || currentSort !== SortField.Died,
                      'fa-sort-up':
                        currentSort === SortField.Died &&
                        currentOrder !== SortOrder.Desc,
                      'fa-sort-down':
                        currentSort === SortField.Died &&
                        currentOrder === SortOrder.Desc,
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
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': params.personSlug === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={person.mother}
                personName={person.motherName || undefined}
                people={people}
                isMother
              />
            </td>
            <td>
              <PersonLink
                person={person.father}
                personName={person.fatherName || undefined}
                people={people}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
