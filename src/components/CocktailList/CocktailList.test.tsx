import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailList } from "./CocktailList";
import { cocktailDetailListMock } from "../../mocks/CocktailDetailMock";
import { CocktailDetail as CocktailDetailType } from "types/CocktailTypes";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CatalogContext } from "App";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const mockState = {current: jest.fn()};

const setupRender = (cocktailList: CocktailDetailType[]) =>
  render(
    <CatalogContext.Provider value={mockState}>
      <MemoryRouter initialEntries={[`/drinks`]}>
        <Routes>
          <Route path="/drinks" element={<CocktailList cocktailList={cocktailList}  />} />
        </Routes>
      </MemoryRouter>
    </CatalogContext.Provider>
  );

describe("Component verification", () => {
  test("01 - Test basic list render", () => {
    const { getByAltText } = setupRender(cocktailDetailListMock);

    cocktailDetailListMock.map((c) => {
      const nameElement = screen.getByText(c.strDrink);
      expect(nameElement).toBeInTheDocument();

      const image = getByAltText(`${c.strDrink} cocktail`);
      expect(image.getAttribute("src")).toContain(c.strDrinkThumb);
    });
  });
});
