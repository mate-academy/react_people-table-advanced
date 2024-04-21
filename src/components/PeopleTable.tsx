import classNames from 'classnames';
import { Person } from '../types';
import { PersonTableRow } from './PersonTableRow';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

type ConfigureNewParamsReturnType =
  | { sort: string; order: null }
  | { order: string }
  | { order: null; sort: null };

const configureIcon = (isActive: boolean, isOrderDesc: boolean) =>
  classNames('fas', {
    'fa-sort': !isActive,
    'fa-sort-down': isActive && isOrderDesc,
    'fa-sort-up': isActive && !isOrderDesc,
  });

const configureNewParams = (
  targetSortedBy: string,
  isOrderDesc: boolean,
  selectedSortedBy: null | string = '',
): ConfigureNewParamsReturnType => {
  if (selectedSortedBy !== targetSortedBy) {
    return { sort: targetSortedBy, order: null };
  }

  if (!isOrderDesc) {
    return { order: 'desc' };
  }

  return { order: null, sort: null };
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortedBy = searchParams.get('sort');

  const isOrderDesc = searchParams.get('order') === 'desc';
  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

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
              <SearchLink
                params={configureNewParams('name', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'name', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={configureNewParams('sex', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'sex', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={configureNewParams('born', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'born', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={configureNewParams('died', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'died', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
