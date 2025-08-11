/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  people: Person[];
}

const titleArr = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

  const [searchParams] = useSearchParams();

  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  function handleFilterChange(sortType: string) {
    if (sort === sortType && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === sortType) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: sortType, order: null };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titleArr.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      handleFilterChange(title.toLowerCase()),
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== title.toLowerCase(),
                        'fa-sort-up': sort === title.toLowerCase() && !order,
                        'fa-sort-down': sort === title.toLowerCase() && order,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(
          ({
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            father,
            mother,
            slug,
          }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedSlug === slug,
              })}
            >
              <td>
                <PersonLink name={name} sex={sex} slug={slug} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink name={mother.name} sex="f" slug={mother.slug} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink name={father.name} sex="m" slug={father.slug} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
