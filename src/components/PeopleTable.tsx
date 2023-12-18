import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { FilterContext } from './FilterContext';
import { SearchLink } from './SearchLink';

export const PeopleTable = () => {
  const { filtredPeople } = useContext(FilterContext);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const peoplethDuplications = [...filtredPeople].map(person => {
    const mother = filtredPeople.find(p => p.name === person.motherName);
    const father = filtredPeople.find(p => p.name === person.fatherName);

    return { ...person, mother, father };
  });

  const sortPeople = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const classNameFunction = (field: string) => classNames('fas', {
    'fa-sort': field !== sort,
    'fa-sort-up': field === sort && !order,
    'fa-sort-down': field === sort && order,
  });

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
              <SearchLink params={sortPeople('name')}>
                <span className="icon">
                  <i className={classNameFunction('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortPeople('sex')}>
                <span className="icon">
                  <i className={classNameFunction('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortPeople('born')}>
                <span className="icon">
                  <i className={classNameFunction('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortPeople('died')}>
                <span className="icon">
                  <i className={classNameFunction('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoplethDuplications.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
