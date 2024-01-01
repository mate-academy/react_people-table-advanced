import { ErrorMessages } from '../../types/ErrorMessages';

export const NotFoundPage = () => {
  return (
    <h1 className="title">{ErrorMessages.PAGE_NOT_FOUND}</h1>
  );
};
