import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  filteredPeople: Person[];
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findPersonByName = (name: string | null) => {
    const seekedPerson = people.find(person => person.name === name);

    if (!seekedPerson) {
      return null;
    }

    return seekedPerson;
  };

  const handleTableFilter = (s: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== s) {
      setSearchParams(getSearchWith(searchParams, { sort: s, order: null }));
    } else if (!currentOrder) {
      setSearchParams(getSearchWith(searchParams, { sort: s, order: 'desc' }));
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    }
  };

  const setIconClass = (sortType: string) => {
    if (sort === sortType && order === null) {
      return classNames('fas fa-sort-up');
    } else if (sort === sortType && order !== null) {
      return classNames('fas fa-sort-down');
    } else {
      return classNames('fas fa-sort');
    }
  };

  return (
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
                  <a onClick={() => handleTableFilter('name')}>
                    <span className="icon">
                      <i className={setIconClass('name')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a onClick={() => handleTableFilter('sex')}>
                    <span className="icon">
                      <i className={setIconClass('sex')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a onClick={() => handleTableFilter('born')}>
                    <span className="icon">
                      <i className={setIconClass('born')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a onClick={() => handleTableFilter('died')}>
                    <span className="icon">
                      <i className={setIconClass('died')} />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map(person => {
              const mother = findPersonByName(person.motherName);
              const father = findPersonByName(person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} name={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName ? (
                      <PersonLink person={mother} name={person.motherName} />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.fatherName ? (
                      <PersonLink person={father} name={person.fatherName} />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
