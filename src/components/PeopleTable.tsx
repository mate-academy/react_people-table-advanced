import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person, SortField } from '../types';
import { Loader } from './Loader';
import { filterPeople } from '../utils/filter';

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

  const handleSortType = (field: SortField) => {
    const param = new URLSearchParams(searchParams);
    let newSearch: SortField | null;
    let newOrder: string | null;

    if (!currentOrder && currentSearch === field) {
      newSearch = field;
      newOrder = 'desc';
    } else if (currentOrder && currentSearch === field) {
      newSearch = null;
      newOrder = null;
    } else {
      newSearch = field;
      newOrder = null;
    }

    if (newSearch) {
      param.set('sort', newSearch);
    } else {
      param.delete('sort');
    }

    if (newOrder) {
      param.set('order', newOrder);
    } else {
      param.delete('order');
    }

    return {
      pathname: '/people',
      search: param.toString(),
    };
  };

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
              <Link to={handleSortType(SortField.Name)}>
                <span className="icon">
                  <i className={sortOrderIcon('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handleSortType(SortField.Sex)}>
                <span className="icon">
                  <i className={sortOrderIcon('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handleSortType(SortField.Born)}>
                <span className="icon">
                  <i className={sortOrderIcon('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handleSortType(SortField.Died)}>
                <span className="icon">
                  <i className={sortOrderIcon('died')} />
                </span>
              </Link>
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
                <Link className={cn({ 'has-text-danger': personItem.sex === 'f' })} to={`/people/${personItem.slug}`}>
                  {personItem.name}
                </Link>
              </td>

              <td>{personItem.sex}</td>
              <td>{personItem.born}</td>
              <td>{personItem.died}</td>
              <td>
                {mother ? (<Link className="has-text-danger" to={`/people/${mother.slug}`}>{personItem.motherName}</Link>) : (
                  personItem.motherName || '-'
                )}
              </td>
              <td>
                {father ? (<Link to={`/people/${father.slug}`}>{personItem.fatherName}</Link>) : (
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
