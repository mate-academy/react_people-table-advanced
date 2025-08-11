import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('useGoods must be used within GoodsProvider');
  }

  return context;
};
