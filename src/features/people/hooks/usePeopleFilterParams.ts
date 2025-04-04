import { useSearchParamsUpdater } from './useSearchParamsUpdater';

export const usePeopleFilterParams = () => {
  const { searchParams } = useSearchParamsUpdater();
  const currentSexFilter = searchParams.get('sex');
  const currentCenturiesFilter = searchParams.getAll('centuries');
  const currentQueryFilter = searchParams.get('query');

  // const setSexFilter = (sex: Record<string, string | null>) => {
  //   updateParams(sex);
  // };

  // const toggleCenturiesFilter = (century: string) => {
  //   const exists = currentCenturiesFilter.includes(century);
  //   const newCenturies = exists
  //     ? currentCenturiesFilter.filter(c => c !== century)
  //     : [...currentCenturiesFilter, century];

  //   updateParams({
  //     centuries: newCenturies.length > 0 ? newCenturies : null,
  //   });
  // };

  return {
    currentSexFilter,
    currentCenturiesFilter,
    currentQueryFilter,
    // setSexFilter,
    // toggleCenturiesFilter,
  };
};
