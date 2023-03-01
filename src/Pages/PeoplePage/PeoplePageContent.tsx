import { Person } from '../../types';
import { PeopleFilters } from '../../components/Filter/PeopleFilters';
import { PeopleTable } from '../../components/Table/PeopleTable';

interface Props {
  noDataOnServer: boolean,
  hasError: boolean,
  people: Person[],
  slug: string,
}

export const PeoplePageContent: React.FC<Props> = ({
  noDataOnServer,
  hasError,
  people,
  slug,
}) => {
  const hasPeople = Boolean(people.length);

  return (
    <>
      <div className="column is-7-tablet is-narrow-desktop">
        <PeopleFilters />
      </div>

      <div className="column">
        <div className="box table-container">
          {hasPeople && (
            <PeopleTable people={people} currentSlug={slug} />
          )}

          {!hasPeople && (
            <p>
              There are no people matching the current search criteria
            </p>
          )}

          {noDataOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {hasError && (
            <p data-cy="peopleLoadingError">Something went wrong</p>)}
        </div>
      </div>
    </>
  );
};
