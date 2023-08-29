import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person, SortField } from '../types';
import { Loader } from './Loader';
import { filterPeople } from '../utils/filter';
import { SearchLink } from './SearchLink';

type Props = {
  person: Person[]
  isLoading: boolean
};

export const PeopleTable:React.FC<Props> = ({ person, isLoading }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';
  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries') || [];

  const sortOrderIcon = (field: string) => (
    cn('fas', {
      'fa-sort': currentSearch !== `${field}`,
      'fa-sort-up': currentSearch === `${field}` && currentOrder !== 'desc',
      'fa-sort-down': currentSearch === `${field}` && currentOrder === 'desc',
    })
  );

  let currentSortField = '' as SortField;

  if (currentSearch === 'sex') {
    currentSortField = SortField.Sex;
  } else if (currentSearch === 'born') {
    currentSortField = SortField.Born;
  } else if (currentSearch === 'died') {
    currentSortField = SortField.Died;
  } else if (currentSearch === 'name') {
    currentSortField = SortField.Name;
  }

  const filteredPersons = filterPeople(person, {
    sortField: currentSortField,
    order: currentOrder,
    sex: currentSex,
    query: currentQuery,
    centuries: currentCenturies,
  });

  const findParent = (persons: Person[], parentName: string | null) => {
    return persons.find(parent => parent.name === parentName);
  };

  if (filteredPersons.length === 0 && !isLoading) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (isLoading) {
    return <Loader />;
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
              <SearchLink
                params={{
                  sort: currentSearch === SortField.Name
                  && currentOrder ? null : SortField.Name,
                  order: currentSearch === SortField.Name
                  && currentOrder !== 'desc' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className={sortOrderIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: currentSearch === SortField.Sex
                  && currentOrder ? null : SortField.Sex,
                  order: currentSearch === SortField.Sex
                  && currentOrder !== 'desc' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className={sortOrderIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: currentSearch === SortField.Born
                  && currentOrder ? null : SortField.Born,
                  order: currentSearch === SortField.Born
                  && currentOrder !== 'desc' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className={sortOrderIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: currentSearch === SortField.Died
                  && currentOrder ? null : SortField.Died,
                  order: currentSearch === SortField.Died
                  && currentOrder !== 'desc' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className={sortOrderIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPersons.map(personItem => {
          const father = findParent(person, personItem.fatherName);
          const mother = findParent(person, personItem.motherName);

          return (
            <tr
              key={personItem.slug}
              data-cy="person"
              className={cn(
                { 'has-background-warning': personItem.slug === slug },
              )}
            >
              <td>
                <Link
                  className={cn({ 'has-text-danger': personItem.sex === 'f' })}
                  to={{
                    pathname: `/people/${personItem.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {personItem.name}
                </Link>
              </td>

              <td>{personItem.sex}</td>
              <td>{personItem.born}</td>
              <td>{personItem.died}</td>
              <td>
                {mother ? (<Link className="has-text-danger" to={{ pathname: `/people/${mother.slug}`, search: searchParams.toString() }}>{personItem.motherName}</Link>) : (
                  personItem.motherName || '-'
                )}
              </td>
              <td>
                {father ? (<Link to={{ pathname: `/people/${father.slug}`, search: searchParams.toString() }}>{personItem.fatherName}</Link>) : (
                  personItem.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
