import React, { useMemo, useState } from 'react';

type LoaderContextType = {
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoaderContext = React.createContext<LoaderContextType>({
  loader: false,
  setLoader: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LoaderProvider: React.FC<Props> = ({ children }) => {
  const [loader, setLoader] = useState(false);

  const value = useMemo(
    () => ({
      loader,
      setLoader,
    }),
    [loader],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
