/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { Props } from '../types/Props';
import { preparePeople } from '../utils/preparePeople';
import { SortField } from '../types/SortField';
import { SortFieldPrepare } from '../types/SortFieldForMap';

interface SortParams {
  sort: string | null,
  order: string | null,
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleFaSort = (sortField: SortField) => {
    return classNames('fas', {
      'fa-sort': sort !== sortField,
      'fa-sort-down':
        order === 'desc' && sort === sortField,
      'fa-sort-up':
        sort === sortField && !order,
    });
  };

  const normalizedPeople = people.map(person => {
    return {
      ...person,
      father: people.find(father => father.name === person.fatherName),
      mother: people.find(mother => mother.name === person.motherName),
    };
  });

  const filteredPeople = preparePeople(
    query,
    centuries,
    sex,
    normalizedPeople,
    sort as SortFieldPrepare,
    order,
  );

  const handleSortChange = (sortField: SortField) => {
    const sortParams: SortParams = { sort: null, order: null };

    if (sort === sortField && order !== 'desc') {
      sortParams.sort = sortField;
      sortParams.order = 'desc';
    }

    if (sort !== sortField) {
      sortParams.sort = sortField;
    }

    return sortParams;
  };

  return (
    <>
      {!(filteredPeople.length > 0)
        ? (<p> There are no people matching the current search criteria </p>)
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {SortField.Name}
                    <SearchLink params={
                      { ...handleSortChange(SortField.Name) }
                    }
                    >
                      <span className="icon">
                        <i className={handleFaSort(SortField.Name)} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {SortField.Sex}
                    <SearchLink params={
                      { ...handleSortChange(SortField.Sex) }
                    }
                    >
                      <span className="icon">
                        <i className={handleFaSort(SortField.Sex)} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {SortField.Born}
                    <SearchLink params={
                      { ...handleSortChange(SortField.Born) }
                    }
                    >
                      <span className="icon">
                        <i className={handleFaSort(SortField.Born)} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {SortField.Died}
                    <SearchLink params={
                      { ...handleSortChange(SortField.Died) }
                    }
                    >
                      <span className="icon">
                        <i className={handleFaSort(SortField.Died)} />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {filteredPeople.map((person) => (
                <PersonInfo person={person} key={person.slug} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
