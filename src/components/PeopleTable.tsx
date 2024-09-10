import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface PeopleListProps {
  visiblePeople: Person[];
}
export const PeopleTable: React.FC<PeopleListProps> = ({ visiblePeople }) => {
  const { slugs } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortOption = (newSort: string) => {
    if (newSort !== currentSort) {
      return { sort: newSort, order: null };
    }

    if (newSort === currentSort && !order) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortClass = (sort: string) => {
    return classNames('fas', {
      'fa-sort': sort !== currentSort,
      'fa-sort-up': sort === currentSort && !order,
      'fa-sort-down': sort === currentSort && !!order,
    });
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
              <SearchLink params={{ ...getSortOption('name') }}>
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortOption('sex') }}>
                <span className="icon">
                  <i className={getSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortOption('born') }}>
                <span className="icon">
                  <i className={getSortClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ ...getSortOption('died') }}>
                <span className="icon">
                  <i className={getSortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === slugs,
              })}
            >
              <td>
                <PersonLink name={name?.trim()} slug={slug} sex={sex} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink
                    name={motherName?.trim()}
                    slug={mother.slug}
                    sex="f"
                  />
                ) : (
                  motherName?.trim() || `-`
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink
                    name={fatherName?.trim()}
                    slug={father.slug}
                    sex="m"
                  />
                ) : (
                  fatherName?.trim() || `-`
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
