import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person, Sort, Sex } from '../types';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

interface Options {
  sexParams: Sex | null;
  sortParams: Sort | null;
  orderParams: string | null;
  queryParams: string | null;
  centuriesParams: string[];
}

function getNormalizedName(person: Person | undefined, name: string | null) {
  if (person && person.sex === Sex.Female) {
    return (
      <Link className="has-text-danger" to={`/people/${person.slug}`}>
        {name}
      </Link>
    );
  }

  if (person && person.sex === Sex.Male) {
    return <Link to={`/people/${person.slug}`}>{name}</Link>;
  }

  return name ?? '-';
}

function getVisiblePeople(people: Person[], options: Options) {
  let updatedPeople = [...people];

  switch (options.sexParams) {
    case Sex.Male:
      updatedPeople = updatedPeople.filter(person => person.sex === Sex.Male);
      break;
    case Sex.Female:
      updatedPeople = updatedPeople.filter(person => person.sex === Sex.Female);
      break;
  }

  switch (options.sortParams) {
    case Sort.ByName:
      updatedPeople.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case Sort.BySex:
      updatedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case Sort.ByBorn:
    case Sort.ByDied:
      updatedPeople.sort((a, b) => a.born - b.born);
      break;
  }

  if (options.orderParams) {
    updatedPeople.reverse();
  }

  if (options.queryParams) {
    const query = options.queryParams.toLowerCase();

    updatedPeople = updatedPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query)
      );
    });
  }

  if (options.centuriesParams.length) {
    updatedPeople = updatedPeople.filter(person => {
      const centure = `${Math.ceil(person.born / 100)}`;

      return options.centuriesParams.includes(centure);
    });
  }

  return updatedPeople;
}

export default function PeopleTable({ people }: Props) {
  const { slug: slugParams } = useParams();

  const [searchParams] = useSearchParams();
  const sexParams = searchParams.get('sex') as Sex | null;
  const sortParams = searchParams.get('sort') as Sort | null;
  const orderParams = searchParams.get('order');
  const queryParams = searchParams.get('query');
  const centuriesParams = searchParams.getAll('centuries');

  const visiblePeople = getVisiblePeople(people, {
    sexParams,
    sortParams,
    orderParams,
    queryParams,
    centuriesParams,
  });

  const getSortedBy = (query: string) => {
    if (sortParams !== query) {
      return { sort: query, order: null };
    }

    if (orderParams !== 'desc') {
      return { sort: query, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getActiveClass = (query: string) => {
    let classNames = 'fa-sort';

    if (sortParams === query && !orderParams) {
      classNames = 'fa-sort-up';
    }

    if (sortParams === query && orderParams === 'desc') {
      classNames = 'fa-sort-down';
    }

    return cn('fas', classNames);
  };

  return (
    <>
      {visiblePeople.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {[Sort.ByName, Sort.BySex, Sort.ByBorn, Sort.ByDied].map(
                sortType => {
                  return (
                    <th key={sortType}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {sortType[0].toUpperCase() + sortType.slice(1)}
                        <SearchLink params={getSortedBy(sortType)}>
                          <span className="icon">
                            <i className={getActiveClass(sortType)} />
                          </span>
                        </SearchLink>
                      </span>
                    </th>
                  );
                },
              )}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => {
              const {
                name,
                sex,
                slug,
                born,
                died,
                fatherName,
                motherName,
                father,
                mother,
              } = person;

              return (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slugParams === slug,
                  })}
                >
                  <td>
                    <Link
                      to={`../${slug}`}
                      className={cn({ 'has-text-danger': sex === Sex.Female })}
                    >
                      {name}
                    </Link>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>{getNormalizedName(mother, motherName)}</td>
                  <td>{getNormalizedName(father, fatherName)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {visiblePeople.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
}
