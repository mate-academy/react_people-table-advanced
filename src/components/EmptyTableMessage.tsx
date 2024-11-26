import { useFilters } from '../hooks/useFilters';

export const EmptyTableMessage = () => {
  const { hasAnySearchParam } = useFilters();

  return (
    <>
      {hasAnySearchParam ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};
