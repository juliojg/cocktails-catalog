import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailList } from "./CocktailList";
import { cocktailDetailListMock } from "../../mocks/CocktailDetailMock";
import { CocktailDetail as CocktailDetailType } from "types/CocktailTypes";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const setupRender = (cocktailList: CocktailDetailType[]) =>
  render(<CocktailList cocktailList={cocktailList} />, {
    wrapper: MemoryRouter
  });

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
