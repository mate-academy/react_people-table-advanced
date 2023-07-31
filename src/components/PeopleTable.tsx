import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person [];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const checkingMotherName = (personParentName: string | null) => {
    return personParentName
      ? people.find(person => person.name === personParentName) || null
      : null;
  };

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSort = (peopleForView: Person[], sortParam = '') => {
    if (sortParam.length) {
      return peopleForView.sort((a: Person, b: Person) => {
        // eslint-disable-next-line default-case
        switch (sortParam) {
          case ('name'):
          case ('sex'):
            return !order
              ? a[sortParam].localeCompare(b[sortParam])
              : b[sortParam].localeCompare(a[sortParam]);
          case ('born'):
          case ('died'):
            return !order
              ? a[sortParam] - b[sortParam]
              : b[sortParam] - a[sortParam];
        }
      });
    }

    return peopleForView;
  };

  const sortedPeople = useMemo(() => {
    const peopleForSorting = [...people];

    return handleSort(peopleForSorting, sort);
  }, [sort, order, people]);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
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
                        sort: !sort || (!order && sort) ? 'name' : null,
                        order: !order && sort ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={{
                        sort: !sort || (!order && sort) ? 'sex' : null,
                        order: !order && sort ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={{
                        sort: !sort || (!order && sort) ? 'born' : null,
                        order: !order && sort ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={{
                        sort: !sort || (!order && sort) ? 'died' : null,
                        order: !order && sort ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  </span>
                </th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {
                sortedPeople.map(person => (
                  <PersonLink
                    person={person}
                    key={person.slug}
                    checkingPersonName={checkingMotherName}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
