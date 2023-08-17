import { FC } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type Props = {
  setIsSelected: (name: string | null) => void,
  handleQueryChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
  centuries: string[],
  genders: string,
  isLoader: boolean,
  people: Person[],
  isSelected: string | null,
  query: string,
  error: string,
  sort: string,
  order: string,
};

export const PeoplePage: FC<Props> = ({
  setIsSelected,
  handleQueryChange,
  centuries,
  genders,
  isLoader,
  people,
  query,
  isSelected,
  error,
  sort,
  order,
}) => (
  <>
    <h1 className="title">People Page</h1>
    {isLoader
      ? <Loader />
      : (
        <PeopleTable
          setIsSelected={setIsSelected}
          handleQueryChange={handleQueryChange}
          genders={genders}
          centuries={centuries}
          people={people}
          isSelected={isSelected}
          query={query}
          error={error}
          sort={sort}
          order={order}
        />
      )}
  </>
);
