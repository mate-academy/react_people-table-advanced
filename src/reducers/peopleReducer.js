const FILTER = 'FILTER';
const SORT_BY = 'SORT_BY';
const SORT_ORDER = 'SORT_ORDER';

export const actions = {
  filter: query => ({
    type: FILTER, query,
  }),
  sortBy: sortBy => ({
    type: SORT_BY, sortBy,
  }),
  sortOrder: sortOrder => ({
    type: SORT_ORDER, sortOrder,
  }),
};

export function peopleReducer(state, action) {
  switch (action.type) {
    case FILTER:
      return {
        ...state,
        query: action.query,
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: 'asc',
      };

    case SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder,
      };

    default:
      return state;
  }
}
