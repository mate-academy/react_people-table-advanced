import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  peoples: Person[],
};

type Obj = {
  sort?: string | null,
  order?: string | null,
};

function getParent(name: string | null, arr: Person[]) {
  return arr.find(person => person.name === name);
}

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;
  const [params] = useSearchParams();
  const [filteredPeoples, setFilteredPeoples] = useState<Person[]>(peoples);
  const [sortedPeoples, setSortedPeoples]
  = useState<Person[]>([...filteredPeoples]);
  const sortField = params.get('sort');
  const order = params.get('order');

  const { search } = useLocation();

  const sortTable = () => {
    if (!sortField) {
      setSortedPeoples(filteredPeoples);
    }

    if (sortField === 'name' || sortField === 'sex') {
      if (order === 'desc') {
        setSortedPeoples(prev => {
          return [...prev].sort((name1, name2) => {
            return name2[sortField].localeCompare(name1[sortField]);
          });
        });
      } else {
        setSortedPeoples(prev => {
          return [...prev].sort((name1, name2) => {
            return name1[sortField].localeCompare(name2[sortField]);
          });
        });
      }
    }

    if (sortField === 'born' || sortField === 'died') {
      if (order === 'desc') {
        setSortedPeoples(prev => {
          return [...prev].sort((a, b) => {
            return +b[sortField] - +a[sortField];
          });
        });
      } else {
        setSortedPeoples(prev => {
          return [...prev].sort((a, b) => {
            return +a[sortField] - +b[sortField];
          });
        });
      }
    }
  };

  const handleFilterChange = () => {
    let newPeoples = [...peoples];
    const query = params.get('query');
    const centuries = params.getAll('centuries');
    const sex = params.get('sex');

    if (query) {
      newPeoples = newPeoples.filter((i) => {
        const lowerQuery = query.toLowerCase();
        const lowerName = i.name.toLowerCase();
        const lowerFatherName = i.fatherName?.toLowerCase();
        const lowerMotherName = i.motherName?.toLowerCase();

        return (
          lowerName.includes(lowerQuery)
          || lowerFatherName?.includes(lowerQuery)
          || lowerMotherName?.includes(lowerQuery)
        );
      });
    }

    if (centuries.length) {
      newPeoples = newPeoples.filter((person) => {
        const bornCentury = Math.ceil(person.born / 100);

        return centuries.includes(bornCentury.toString());
      });
    }

    if (sex) {
      newPeoples = newPeoples.filter(person => person.sex === sex);
    }

    setFilteredPeoples(newPeoples);
    setSortedPeoples(newPeoples);
  };

  const handleSortSpan = (title: string, sortBy: string) => {
    let obj: Obj = { sort: sortBy, order: null };
    let classForArrow = 'fa-sort';

    if (params.get('sort') === sortBy && !params.get('order')) {
      obj = { sort: sortBy, order: 'desc' };
      classForArrow = 'fa-sort-up';
    }

    if (params.get('sort') === sortBy && params.get('order')) {
      obj = { sort: null, order: null };
      classForArrow = 'fa-sort-down';
    }

    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={obj}>
          <span className="icon">
            <i className={`fas ${classForArrow}`} />
          </span>
        </SearchLink>
      </span>
    );
  };

  useEffect(() => {
    handleFilterChange();
  }, [params]);

  useEffect(() => {
    sortTable();
  }, [sortField, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            {(() => handleSortSpan('Name', 'name'))()}
          </th>

          <th>
            {(() => handleSortSpan('Sex', 'sex'))()}
          </th>

          <th>
            {(() => handleSortSpan('Born', 'born'))()}
          </th>

          <th>
            {(() => handleSortSpan('Died', 'died'))()}
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeoples.map((person) => {
          const {
            name,
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = getParent(motherName, peoples);
          const father = getParent(fatherName, peoples);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
            >
              <td>
                <NavLink
                  to={`${slug}${search}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </NavLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {motherName ? (
                <td>
                  {mother ? (
                    <NavLink
                      className="has-text-danger"
                      to={`${mother.slug}${search}`}
                    >
                      {motherName}
                    </NavLink>
                  ) : motherName}
                </td>
              ) : (
                <td>-</td>
              )}

              {fatherName ? (
                <td>
                  {father ? (
                    <NavLink to={`${father.slug}${search}`}>
                      {fatherName}
                    </NavLink>
                  ) : fatherName}
                </td>
              ) : (
                <td>-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
