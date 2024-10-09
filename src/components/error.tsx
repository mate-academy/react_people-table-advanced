import { useContext } from 'react';
import { MyContext } from './state';

export const Error = () => {
  const { error } = useContext(MyContext);

  return (
    <div className="block">
      <div className="box table-container">
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error || 'Something went wrong'}
        </p>
      </div>
    </div>
  );
};
