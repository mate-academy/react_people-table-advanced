import React from 'react';

type Context = {
  selectedSlug: string,
  setSelectedSlug: React.Dispatch<React.SetStateAction<string>> | null,
};

export const slugContext = React.createContext<Context>({
  selectedSlug: '',
  setSelectedSlug: null,
});
