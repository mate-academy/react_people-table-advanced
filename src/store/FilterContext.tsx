/* eslint-disable @typescript-eslint/no-unused-vars */
// import { createContext, useContext, useMemo, useState } from 'react';
// import { usePeoples } from './PeopleContext';

// export const FilterContext = createContext({
//   params: {} as URLSearchParams,
//   setParams: (_params: URLSearchParams) => {},
//   value: '',
//   setValue: (_value: string) => {},
// });

// export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
//   const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());
//   const [value, setValue] = useState('');

//   return (
//     <FilterContext.Provider value={{ params, setParams, value, setValue }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => useContext(FilterContext);

// export const useFilterTable = () => {
//   const { params, value } = useFilter();
//   const { peoples } = usePeoples();

//   return useMemo(() => {
//     return value
//       ? peoples.filter(
//           people =>
//             people.name.includes(value) ||
//             people.fatherName?.includes(value) ||
//             people.motherName?.includes(value),
//         )
//       : peoples;
//   }, [peoples, value]);
// };
