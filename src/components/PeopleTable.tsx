import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './Person/PersonLink';
import { SearchLink } from './SearchLink';
import { SortBy } from '../types/SortBy';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortParams = (field: string) => {
    if (field === sortBy && !sortOrder) {
      return { sort: field, order: 'desc' };
    }

    if (field === sortBy && sortOrder) {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  const getParentContent = (parentName: string, peopleArr: Person[]) => {
    const parent = peopleArr.find(({ name }) => name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped
                    is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={getSortParams(SortBy.name)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== SortBy.name,
                      'fa-sort-up': sortBy === SortBy.name && !sortOrder,
                      'fa-sort-down': sortBy === SortBy.name && sortOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortParams(SortBy.sex)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== SortBy.sex,
                      'fa-sort-up': sortBy === SortBy.sex && !sortOrder,
                      'fa-sort-down': sortBy === SortBy.sex && sortOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams(SortBy.born)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== SortBy.born,
                      'fa-sort-up': sortBy === SortBy.born && !sortOrder,
                      'fa-sort-down': sortBy === SortBy.born && sortOrder,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortParams(SortBy.died)}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== SortBy.died,
                      'fa-sort-up': sortBy === SortBy.died && !sortOrder,
                      'fa-sort-down': sortBy === SortBy.died && sortOrder,
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
              'has-background-warning': person.slug === slug,
            })}
          >
            <td aria-label="Person Link">
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.motherName
                  ? getParentContent(person.motherName, people)
                  : '-'
              }
            </td>
            <td>
              {
                person.fatherName
                  ? getParentContent(person.fatherName, people)
                  : '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
