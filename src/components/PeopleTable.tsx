import { useCallback, useContext, useMemo } from 'react';
import { UsersContext } from '../store/PeopleContext';
import { Loader } from '../components/Loader';
import { Notification } from '../types/Notification';
import { PeopleFilters } from '../components/PeopleFilters';
import { SearchLink } from './SearchLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_SEX = 'sex';
const SORT_FIELD_BORN = 'born';
const SORT_FIELD_DIED = 'died';
const SORT_ORDER_DESC = 'desc';

type SortField = 'name' | 'sex' | 'born' | 'died' | null;
type SortOrder = 'desc' | null;
type Sex = 'm' | 'f';
type PreparedParams = {
  sortField: SortField;
  sortOrder: SortOrder;
  sex: Sex | null;
  query: string | null;
  centuries: string[];
};

const VALID_SORT_FIELDS: SortField[] = [
  SORT_FIELD_NAME,
  SORT_FIELD_SEX,
  SORT_FIELD_BORN,
  SORT_FIELD_DIED,
];

function parseSortField(value: string | null): SortField {
  return VALID_SORT_FIELDS.includes(value as SortField)
    ? (value as SortField)
    : null;
}

function parseSex(value: string | null): Sex | null {
  return value === 'f' || value === 'm' ? value : null;
}

function parseSortOrder(value: string | null): SortOrder {
  return value === SORT_ORDER_DESC ? SORT_ORDER_DESC : null;
}

const COLUMNS: Array<{ id: SortField; label: string }> = [
  { id: SORT_FIELD_NAME, label: 'Name' },
  { id: SORT_FIELD_SEX, label: 'Sex' },
  { id: SORT_FIELD_BORN, label: 'Born' },
  { id: SORT_FIELD_DIED, label: 'Died' },
];

function getPreparedPeople(
  people: Person[],
  { sex, query, centuries, sortField, sortOrder }: PreparedParams,
) {
  let preparedPeople = [...people];
  const normalizedQuery = query?.toLowerCase().trim();

  if (sex === 'm') {
    preparedPeople = preparedPeople.filter(person => person.sex === 'm');
  }

  if (sex === 'f') {
    preparedPeople = preparedPeople.filter(person => person.sex === 'f');
  }

  if (normalizedQuery) {
    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length > 0) {
    const ranges = centuries.map(c => {
      const start = (+c - 1) * 100 + 1;
      const end = +c * 100;

      return { start, end };
    });

    preparedPeople = preparedPeople.filter(person =>
      ranges.some(r => person.born >= r.start && person.born <= r.end),
    );
  }

  if (!sortField) {
    return preparedPeople;
  }

  preparedPeople = preparedPeople.sort((person1, person2) => {
    let result = 0;

    switch (sortField) {
      case SORT_FIELD_NAME:
      case SORT_FIELD_SEX:
        result = person1[sortField].localeCompare(person2[sortField]);
        break;

      case SORT_FIELD_BORN:
      case SORT_FIELD_DIED:
        result = person1[sortField] - person2[sortField];
        break;

      default:
        result = 0;
    }

    return sortOrder === SORT_ORDER_DESC ? -result : result;
  });

  return preparedPeople;
}

function getSortParams(
  field: SortField,
  currentSort: SortField,
  currentOrder: SortOrder,
) {
  if (currentSort !== field) {
    return { sort: field, order: null };
  }

  if (currentOrder === null) {
    return { sort: field, order: SORT_ORDER_DESC };
  }

  return { sort: null, order: null };
}

function getSortIconClass(
  field: SortField,
  currentSort: SortField,
  currentOrder: SortOrder,
) {
  if (currentSort !== field) {
    return 'fa-sort';
  }

  return currentOrder !== SORT_ORDER_DESC ? 'fa-sort-up' : 'fa-sort-down';
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people, message, loading } = useContext(UsersContext);
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams<{ slug?: string }>();

  const sortField = parseSortField(searchParams.get('sort'));
  const sortOrder = parseSortOrder(searchParams.get('order'));
  const sex = parseSex(searchParams.get('sex'));
  const query = searchParams.get('query');

  const preparedPeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries');

    return getPreparedPeople(people, {
      sex,
      query,
      centuries,
      sortField,
      sortOrder,
    });
  }, [people, sex, query, searchParams, sortField, sortOrder]);

  const peopleByName = useMemo(() => {
    return new Map(preparedPeople.map(p => [p.name, p]));
  }, [preparedPeople]);

  const getParent = useCallback(
    (parentName: string | null) => {
      if (!parentName) {
        return '-';
      }

      const parent = peopleByName.get(parentName);

      if (parent) {
        return (
          <Link
            to={{
              pathname: `/people/${parent.slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({ 'has-text-danger': parent.sex === 'f' })}
          >
            {parent.name}
          </Link>
        );
      }

      return parentName;
    },
    [peopleByName, searchParams],
  );

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {!loading && !message && people && <PeopleFilters />}
        </div>

        <div className="column">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && message === Notification.LoadingError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {message}
              </p>
            )}

            {!loading &&
              message !== Notification.LoadingError &&
              people.length === 0 && <p data-cy="noPeopleMessage">{message}</p>}

            {!loading && !message && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {COLUMNS.map(({ id, label }) => (
                      <th key={id}>
                        <span className="is-flex is-flex-wrap-nowrap">
                          {label}
                          <SearchLink
                            params={getSortParams(id, sortField, sortOrder)}
                          >
                            <span className="icon">
                              <i
                                className={classNames(
                                  'fas',
                                  getSortIconClass(id, sortField, sortOrder),
                                )}
                              />
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
                  {preparedPeople.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning': person.slug === selectedSlug,
                      })}
                    >
                      <td>
                        <Link
                          to={{
                            pathname: `/people/${person.slug}`,
                            search: searchParams.toString(),
                          }}
                          className={classNames({
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.name}
                        </Link>
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>{getParent(person.motherName)}</td>
                      <td>{getParent(person.fatherName)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
