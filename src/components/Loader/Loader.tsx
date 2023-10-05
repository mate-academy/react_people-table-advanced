import { useEffect } from 'react';
import './Loader.scss';

export const Loader: React.FC<{
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  isError = false,
  setIsError,
}) => {
  useEffect(() => {
    if (setIsError) {
      setTimeout(() => setIsError(true), 5000);
    }
  }, []);

  return (
    <>
      {isError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        <div className="Loader" data-cy="loader">
          <div className="Loader__content" />
        </div>
      )}
    </>
  );
};
