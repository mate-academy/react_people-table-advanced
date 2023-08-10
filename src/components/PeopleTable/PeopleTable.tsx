/* eslint-disable no-console */
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types/Person';
import { SearchLink } from '../SearchLink/SearchLink';

export type Props = {
  peoples: Person[],
};

const tableHeaders = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable = ({ peoples }: Props) => {
  const [searchParameters] = useSearchParams();

  const sex = searchParameters.get('sex') || '';
  const query = searchParameters.get('query') || '';
  const centuries = searchParameters.getAll('centuries') || [];
  const sort = searchParameters.get('sort') || '';
  const order = searchParameters.get('order') || '';

  const getPreparedUsers = ({
    sexPar,
    queryPar,
    centuriesPar,
    sortPar,
    orderPar,
  }: {
    sexPar: string,
    queryPar: string,
    centuriesPar: string[],
    sortPar: string,
    orderPar: string,
  }): Person[] => {
    let newPeoples = [...peoples];

    if (sexPar.length > 0) {
      newPeoples = newPeoples.filter((person) => person.sex === sexPar);
    }

    if (queryPar.length > 0) {
      newPeoples = newPeoples.filter((person) => {
        const normQuery = queryPar.toLowerCase();

        return person.name.toLowerCase().includes(normQuery)
          || person.motherName?.toLowerCase().includes(normQuery)
          || person.fatherName?.toLowerCase().includes(normQuery);
      });
    }

    if (centuriesPar.length > 0) {
      const centuryFilteredPeoples: Person[] = [];

      centuriesPar.forEach((cent) => {
        centuryFilteredPeoples.push(...peoples.filter((person) => (
          person.born < (+cent * 100)
            && person.born >= (+cent * 100 - 100)
        )));
      });

      newPeoples = peoples.filter(person => (
        centuryFilteredPeoples.some(human => human.name === person.name)
      ));
    }

    if (sortPar.length > 0) {
      switch (sortPar) {
        case 'name':
        case 'sex':
          newPeoples.sort((a, b) => (orderPar
            ? b[sortPar].localeCompare(a[sortPar])
            : a[sortPar].localeCompare(b[sortPar])
          ));

          break;
        case 'born':
        case 'died':
          newPeoples.sort((a, b) => (orderPar
            ? b[sortPar] - a[sortPar]
            : a[sortPar] - b[sortPar]
          ));

          break;
        default: return newPeoples;
      }
    }

    return newPeoples;
  };

  const preparedUsers = getPreparedUsers({
    sexPar: sex,
    queryPar: query,
    centuriesPar: centuries,
    sortPar: sort,
    orderPar: order,
  });

  console.log(preparedUsers.length);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                {(!sort || sort !== header.toLowerCase()) && (
                  <SearchLink
                    params={{
                      sort: header.toLowerCase(),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort')}
                      />
                    </span>
                  </SearchLink>
                )}
                {sort === header.toLowerCase() && !order && (
                  <SearchLink
                    params={{
                      sort: header.toLowerCase(),
                      order: 'desc',
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort-up')}
                      />
                    </span>
                  </SearchLink>
                )}
                {(order && sort === header.toLowerCase()) && (
                  <SearchLink
                    params={{
                      sort: null,
                      order: null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort-down')}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedUsers.length < 1 && peoples.length > 0 && (
          <p>There are no people matching the current search criteria</p>
        )}
        {preparedUsers.length < 1 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
        {preparedUsers.map((user) => (
          <PeopleItem person={user} key={user.slug} />
        ))}
      </tbody>
    </table>
  );
};
