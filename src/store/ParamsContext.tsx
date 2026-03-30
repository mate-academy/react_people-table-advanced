import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

interface State {
  sort: string | null;
  order: string;
  getIcon: (field: string) => string;
  addParam: (key: string, value: string) => string;
  toogleParam: (key: string, value: string) => string;
  toogleSort: (field: string) => string;
  removeParam: (key: string) => string;
}

const useParamsContext = createContext<State>({
  sort: null,
  order: 'asc',
  getIcon: () => '',
  addParam: () => '',
  toogleParam: () => '',
  toogleSort: () => '',
  removeParam: () => '',
});

export const ParamsProvider: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const getIcon = (field: string) => {
    return sort === field
      ? order === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up'
      : 'fa-sort';
  };

  const addParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);

    return `?${params.toString()}`;
  };

  const toogleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentValues = searchParams.getAll(key);
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    params.delete(key);

    newValues.forEach(v => {
      params.append(key, v);
    });

    return `?${params.toString()}`;
  };

  const toogleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (!sort) {
      params.set('sort', field);
    }

    if (sort && sort !== field) {
      params.set('sort', field);
    }

    if (sort && sort === field) {
      params.set('order', 'desc');
    }

    if (sort === field && order === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    return `?${params.toString()}`;
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    return `?${params.toString()}`;
  };

  const value = useMemo(() => {
    return {
      sort,
      order,
      getIcon: getIcon,
      addParam: addParam,
      toogleParam: toogleParam,
      toogleSort: toogleSort,
      removeParam: removeParam,
    };
  }, [searchParams]);

  return (
    <useParamsContext.Provider value={value}>
      {children}
    </useParamsContext.Provider>
  );
};

export const useParamsHelper = () => {
  const context = useContext(useParamsContext);

  if (context === undefined) {
    throw new Error('useParamsHelper must be used within a ParamsProvider');
  }

  return context;
};
