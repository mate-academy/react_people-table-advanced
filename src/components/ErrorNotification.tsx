export const ErrorNotification = () => {
  return (
    <>
      <p data-cy="peopleLoadingError">Something went wrong</p>
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
      <p>There are no people matching the current search criteria</p>
    </>
  );
};
