import { FC } from 'react';
import ClassNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { PeopleFilters } from './PeopleFilters';
import { SearchLink } from './SearchLink';

type Props = {
  setIsSelected: (name: string | null) => void,
  handleQueryChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
  centuries: string[],
  genders: string,
  people: Person[],
  error: string,
  isSelected: string | null,
  query: string,
  sort: string,
  order: string,
};

export const PeopleTable: FC<Props> = ({
  setIsSelected,
  handleQueryChange,
  people,
  isSelected,
  centuries,
  genders,
  query,
  error,
  sort,
  order,
}) => {
  const sortByClick = (value: string) => {
    const firstClick = sort !== value;
    const secondClick = sort === value && order === 'asc';

    if (firstClick) {
      return {
        sort: value,
        order: 'asc',
      };
    }

    if (secondClick) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {people && (
            <PeopleFilters
              handleQueryChange={handleQueryChange}
              centuries={centuries}
              genders={genders}
              query={query}
            />
          )}
        </div>
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>

          {!people
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {'Name Sex Born Died Mother Father'.split(' ').map(item => (
                      <th key={item}>
                        {item === 'Mother' || item === 'Father'
                          ? (
                            <span className="is-flex is-flex-wrap-nowrap">
                              {item}
                            </span>
                          )
                          : (
                            <span className="is-flex is-flex-wrap-nowrap">
                              {item}
                              <SearchLink params={sortByClick(item)}>
                                <span className="icon">
                                  <i className={ClassNames('fas',
                                    {
                                      'fa-sort': sort !== item,
                                      'fa-sort-down': order === 'asc',
                                      'fa-sort-up': order === 'desc',
                                    })}
                                  />
                                </span>
                              </SearchLink>
                            </span>
                          )}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {people.map(person => {
                    const motherDetails = people
                      .find(mother => mother.name === person.motherName);
                    const fatherDetails = people
                      .find(father => father.name === person.fatherName);

                    return (
                      <tr
                        className={ClassNames({
                          'has-background-warning': person.name === isSelected,
                        })}
                        data-cy="person"
                        key={person.name}
                      >
                        <PersonLink
                          person={person}
                          motherDetails={motherDetails}
                          fatherDetails={fatherDetails}
                          handleClick={setIsSelected}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};
