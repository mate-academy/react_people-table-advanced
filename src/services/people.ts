import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Active, Person } from '../types';

export const isPerson = (people: Person[], parentsName: string | null) =>
  parentsName ? people.find(({ name }) => name === parentsName) : undefined;

export const isName = (name: string | null) => (name ? name : '-');

export const getPages = (centuries: string[], number: string) =>
  centuries.includes(number)
    ? centuries.filter((ch: string) => number !== ch)
    : [...centuries, number];

export const getParams = (sort: string, order: string, newOption: string) => {
  switch (true) {
    case !sort:
      return {
        sort: newOption,
        order: null,
      };

    case !order:
      return {
        sort: newOption,
        order: 'desc',
      };

    default:
      return {
        order: null,
        sort: null,
      };
  }
};

export const getLinkClass = ({ isActive }: Active) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const getIconClass = (sort: string, order: string, option: string) =>
  cn('fas', {
    'fa-sort': sort !== option,
    'fa-sort-up': sort === option && !order,
    'fa-sort-down': sort === option && !!order,
  });

export const useOptionForLink = (pathname: string) => {
  const [searchParams] = useSearchParams();

  return { pathname: pathname, search: searchParams.toString() };
};
