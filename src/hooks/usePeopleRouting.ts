import { useParams } from 'react-router-dom';

export const usePeopleRouting = () => {
  const { personId } = useParams();

  return {
    personId,
  };
};
