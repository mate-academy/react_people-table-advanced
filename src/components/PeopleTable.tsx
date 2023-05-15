import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Parent } from './Parent';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personData = '' } = useParams();
  const [searchParams] = useSearchParams();
  const theadList = ['Name', 'Sex', 'Born', 'Died'];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {theadList.map(theadName => {
            const lowerTheadName = theadName.toLowerCase();
            let newSortParams = {};

            if (sort !== lowerTheadName) {
              newSortParams = { sort: lowerTheadName, order: null };
            } else if (sort === lowerTheadName && order === null) {
              newSortParams = { order: 'desc' };
            } else {
              newSortParams = { sort: null, order: null };
            }

            return (
              <th key={theadName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {theadName}
                  <SearchLink
                    params={newSortParams}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        { 'fa-sort': sort !== lowerTheadName },
                        { 'fa-sort-up': sort === lowerTheadName && !order },
                        { 'fa-sort-down': sort === lowerTheadName && !!order },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => {
          const mother = people.find(
            currPerson => currPerson.name === person.motherName,
          );
          const father = people.find(
            currPerson => currPerson.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={personData === person.slug
                ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <Parent parent={mother} parentName={person.motherName} />
              </td>
              <td>
                <Parent parent={father} parentName={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
