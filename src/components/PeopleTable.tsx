import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Filter, Person, Sort } from '../types';
import classNames from 'classnames';
import { modifyPerson } from '../utils/modifyPerson';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';
import { getSearchWith } from '../utils/searchWith';

type Props = {
  people: Person[];
  filter: Filter;
};

export const PeopleTable: React.FC<Props> = ({ people, filter }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const { sort, order, query, centuries } = filter;

  const arrowStyling = order ? 'fa-sort-down' : 'fa-sort-up';

  const handleSorting = (sortBy: Sort) => {
    const sorted =
      sortBy === sort
        ? order
          ? { order: null, sort: null }
          : { order: 'desc', sort: sortBy }
        : { order: null, sort: sortBy };

    return getSearchWith(sorted, searchParams);
  };

  const filteredPeople = filterPeople(people, query, centuries, filter.sex);

  const sortedPeople = sortPeople(filteredPeople, sort, order);

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
              <Link to={{ search: handleSorting(Sort.name) }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      sort === Sort.name ? arrowStyling : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting(Sort.sex) }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      sort === Sort.sex ? arrowStyling : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting(Sort.birth) }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      sort === Sort.birth ? arrowStyling : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting(Sort.death) }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      sort === Sort.death ? arrowStyling : 'fa-sort',
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const modifiedPerson = modifyPerson(people, person);

          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
          } = modifiedPerson;

          const validatedMotherName = motherName || '-';
          const validatedFatherName = fatherName || '-';

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`./${person.slug}?${searchParams}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <td>
                  <Link to={`./${mother.slug}`} className="has-text-danger">
                    {validatedMotherName}
                  </Link>
                </td>
              ) : (
                <td>{validatedMotherName}</td>
              )}

              {father ? (
                <td>
                  <Link to={`./${father.slug}`}>{validatedFatherName}</Link>
                </td>
              ) : (
                <td>{validatedFatherName}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
