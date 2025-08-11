import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person/Person';
import { SearchParams } from '../utils/searchHelper';
import { SortLinks } from '../types/SortLinks';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugLink } = useParams();
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || null;
  const orderParam = searchParams.get('order') || null;
  const sexParam = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const prepareSortParam = (value: SortLinks): SearchParams => {
    if (sortParam === value && orderParam === 'desc') {
      return { sort: null, order: null };
    }

    if (sortParam === null) {
      return { sort: value };
    }

    if (sortParam === value) {
      return { order: 'desc' };
    }

    return { sort: value, order: null };
  };

  const getClassName = (value: SortLinks) => {
    return {
      'fa-sort': sortParam !== value,
      'fa-sort-up': sortParam === value && !orderParam,
      'fa-sort-down': sortParam === value && orderParam === 'desc',
    };
  };

  let preparedPeople = [...people];

  if (sortParam) {
    preparedPeople = preparedPeople.sort((pers1, pers2) => {
      switch (sortParam) {
        case SortLinks.Name:
        case SortLinks.Sex:
          return pers1[sortParam].localeCompare(pers2[sortParam]);

        case SortLinks.Born:
        case SortLinks.Died:
          return pers1[sortParam] - pers2[sortParam];

        default:
          return 0;
      }
    });
  }

  if (sexParam) {
    preparedPeople = preparedPeople.filter(person => person.sex === sexParam);
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      const { name, fatherName, motherName } = person;

      const normalizedQuery = query.toLocaleLowerCase().trim();
      const normalizedName = name.toLocaleLowerCase();
      const normalizedFatherName = fatherName?.toLocaleLowerCase();
      const normalizedMotherName = motherName?.toLocaleLowerCase();

      if (
        normalizedName.includes(normalizedQuery) ||
        normalizedFatherName?.includes(normalizedQuery) ||
        normalizedMotherName?.includes(normalizedQuery)
      ) {
        return true;
      }

      return false;
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const { born } = person;

      const centuryOfPersonBorn = Math.floor((born - 1) / 100) + 1;

      if (centuries.includes(`${centuryOfPersonBorn}`)) {
        return true;
      }

      return false;
    });
  }

  if (orderParam) {
    preparedPeople.reverse();
  }

  return (
    <>
      {!preparedPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.entries(SortLinks).map(([key, value]) => (
                <th key={key}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {key}
                    <SearchLink params={prepareSortParam(value)}>
                      <span className="icon">
                        <i className={cn('fas', getClassName(value))} />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {preparedPeople.map(
              ({
                slug,
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                father,
                mother,
              }) => (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slugLink === slug,
                  })}
                >
                  <td key={slug}>
                    <Link
                      to={{
                        pathname: `/people/${slug}`,
                        search: searchParams.toString(),
                      }}
                      className={cn({ 'has-text-danger': sex === 'f' })}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <Link
                        to={`/people/${mother.slug}`}
                        className="has-text-danger"
                      >
                        {mother.name}
                      </Link>
                    ) : (
                      motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link
                        to={{
                          pathname: `/people/${father.slug}`,
                          search: searchParams.toString(),
                        }}
                      >
                        {father.name}
                      </Link>
                    ) : (
                      fatherName || '-'
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </>
  );
};
