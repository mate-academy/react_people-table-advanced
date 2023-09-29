import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink';
import { ParentsLink } from '../ParentsLink';
import { SearchParms } from '../../types/SearchParams';
import { SortFields, SortOrder } from '../../types/SortFields';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const hasSortAsc = (linkName: string) => (
    searchParams.get(SearchParms.Sort) === linkName
    && !searchParams.has(SearchParms.Order)
  );

  const hasSortDesc = (linkName: string) => (
    searchParams.get(SearchParms.Sort) === linkName
    && searchParams.has(SearchParms.Order)
  );

  const hasNoSort = (linkName: string) => (
    searchParams.get(SearchParms.Sort) !== linkName
  );

  const changeParamsClick = (linkName: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (hasSortAsc(linkName)) {
      newParams.set(SearchParms.Order, SortOrder.Desc);

      return newParams.toString();
    }

    if (hasSortDesc(linkName)) {
      newParams.delete(SearchParms.Order);
      newParams.delete(SearchParms.Sort);

      return newParams.toString();
    }

    newParams.set(SearchParms.Sort, linkName);
    newParams.delete(SearchParms.Order);

    return newParams.toString();
  };

  return (
    <>
      {people.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {Object.values(SortFields).map(columnName => (
                <th key={columnName}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {columnName.toCapitalize()}
                    <Link to={{ search: changeParamsClick(columnName) }}>
                      <span className="icon">
                        <i className={classNames('fas', {
                          'fa-sort': hasNoSort(columnName),
                          'fa-sort-up': hasSortAsc(columnName),
                          'fa-sort-down': hasSortDesc(columnName),
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
            {people.map(person => {
              const {
                slug: pSlug,
                sex,
                born,
                died,
                motherName,
                fatherName,
              } = person;

              return (
                <tr
                  data-cy="person"
                  key={pSlug}
                  className={classNames({
                    'has-background-warning': slug === pSlug,
                  })}
                >
                  <td>
                    <PeopleLink person={person} />
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    <ParentsLink parentName={motherName} />
                  </td>
                  <td>
                    <ParentsLink parentName={fatherName} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
