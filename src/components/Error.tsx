type Props = {
  error: string,
};

export const Error: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error === 'Something went wrong'
        && (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            {error}
          </p>
        )}
      {error === 'There are no people on the server'
        && (
          <p data-cy="noPeopleMessage">
            {error}
          </p>
        )}
    </>
  );
};
