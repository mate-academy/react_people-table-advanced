import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

enum SortSettings {
  born = 'born',
  name = 'name',
  died = 'died',
  sex = 'sex',
}

type Props = {
  preparedList: Person[];
  sortBy: string;
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  preparedList,
  sortBy,
  peopleList,
}) => {
  function setSortSettings(settings: SortSettings) {
    switch (settings) {
      case SortSettings.name:
        if (sortBy === 'name') {
          return 'nameReversed';
        } else if (sortBy === 'nameReversed') {
          return '';
        } else {
          return 'name';
        }

      case SortSettings.sex:
        if (sortBy === 'sex') {
          return 'sexReversed';
        } else if (sortBy === 'sexReversed') {
          return '';
        } else {
          return 'sex';
        }

      case SortSettings.born:
        if (sortBy === 'born') {
          return 'bornReversed';
        } else if (sortBy === 'bornReversed') {
          return '';
        } else {
          return 'born';
        }

      case SortSettings.died:
        if (sortBy === 'died') {
          return 'diedReversed';
        } else if (sortBy === 'diedReversed') {
          return '';
        } else {
          return 'died';
        }
    }
  }

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
                params={{ sortBy: setSortSettings(SortSettings.name) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'name' && sortBy !== 'nameReversed',
                      'fa-sort-up': sortBy === 'name',
                      'fa-sort-down': sortBy === 'nameReversed',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{ sortBy: setSortSettings(SortSettings.sex) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'sex' && sortBy !== 'sexReversed',
                      'fa-sort-up': sortBy === 'sex',
                      'fa-sort-down': sortBy === 'sexReversed',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{ sortBy: setSortSettings(SortSettings.born) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'born' && sortBy !== 'bornReversed',
                      'fa-sort-up': sortBy === 'born',
                      'fa-sort-down': sortBy === 'bornReversed',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{ sortBy: setSortSettings(SortSettings.died) }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortBy !== 'died' && sortBy !== 'diedReversed',
                      'fa-sort-up': sortBy === 'died',
                      'fa-sort-down': sortBy === 'diedReversed',
                    })}
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
        {preparedList.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            peopleList={peopleList}
          />
        ))}
      </tbody>
    </table>
  );
};
