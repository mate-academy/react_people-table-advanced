import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortBy } from '../types/SortBy';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugFromURL } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortField = (field: SortBy) => {
    if (field === sort && order) {
      return null;
    }

    return field;
  };

  const sortOrder = (field: SortBy) => {
    if ((field !== sort && !order)
      || (field === sort && order)) {
      return null;
    }

    return 'desc';
  };

  const getClassIcon = (field: string) => cn(
    'fas',
    { 'fa-sort': sort !== field },
    { 'fa-sort-up': sort === field && !order },
    { 'fa-sort-down': sort === field && order },
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
              <SearchLink
                params={{
                  sort: sortField(SortBy.Name),
                  order: sortOrder(SortBy.Name),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: sortField(SortBy.Sex),
                  order: sortOrder(SortBy.Sex),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: sortField(SortBy.Born),
                  order: sortOrder(SortBy.Born),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: sortField(SortBy.Died),
                  order: sortOrder(SortBy.Died),
                }}
              >
                <span className="icon">
                  <i className={getClassIcon(SortBy.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
          } = person;

          const mother = people.find(({ name: momName }) => (
            momName === motherName
          ));
          const father = people.find(({ name: dadName }) => (
            dadName === fatherName
          ));

          const mom = mother
            ? (
              <PersonLink
                name={motherName}
                sex={mother.sex}
                slug={mother.slug}
              />
            )
            : motherName;

          const dad = father
            ? (
              <PersonLink
                name={fatherName}
                sex={father.sex}
                slug={father.slug}
              />
            )
            : fatherName;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': slugFromURL === slug })}
            >
              <td aria-label={name}>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={person.slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? mom : '-'}</td>
              <td>{fatherName ? dad : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
