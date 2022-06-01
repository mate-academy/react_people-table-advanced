import { useLocation } from 'react-router-dom';

export const useSearchParams = () => {
  return new URLSearchParams(useLocation().search);
};
