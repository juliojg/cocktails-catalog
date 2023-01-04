import React, { useRef } from "react";

import { CocktailDetail } from "types/CocktailTypes";

export type CatalogStateType = {
  list?: CocktailDetail[];
  currentPage?: number;
};

type Props = {
  children: JSX.Element;
};

export const CatalogContext = React.createContext<React.MutableRefObject<any>>(
  undefined as any
);

export const CatalogContextProvider: React.FC<Props> = (props) => {
  const catalogState = useRef({});

  return (
    <CatalogContext.Provider value={catalogState}>
      {props.children}
    </CatalogContext.Provider>
  );
};
