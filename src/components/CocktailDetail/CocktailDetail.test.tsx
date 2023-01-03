import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailDetail } from "./CocktailDetail";
import {
  cocktailDetailIngredientHeavyMock,
  cocktailDetailMock
} from "../../mocks/CocktailDetailMock";
import { CocktailDetail as CocktailDetailType } from "types/CocktailTypes";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const setupRender = (cocktailDetailMock: CocktailDetailType) =>
  render(
    <CocktailDetail
      title={cocktailDetailMock.strDrink}
      imageUrl={cocktailDetailMock.strDrinkThumb}
      instructions={cocktailDetailMock.strInstructions}
      ingredients={cocktailDetailMock.ingredients}
    />,
    { wrapper: MemoryRouter }
  );

describe("Component verification", () => {
  test("01 - Test basic card detail render", () => {
    const { getByAltText } = setupRender(cocktailDetailMock);

    const nameElement = screen.getByText(cocktailDetailMock.strDrink);
    expect(nameElement).toBeInTheDocument();

    const image = getByAltText(`${cocktailDetailMock.strDrink} cocktail`);
    expect(image.getAttribute("src")).toContain(
      cocktailDetailMock.strDrinkThumb
    );

    cocktailDetailMock.ingredients.map((i) => {
      const ingredientElement = screen.getByText(`${i.measure} - ${i.measure}`);
      expect(ingredientElement).toBeInTheDocument();
    });

    const instructionsElement = screen.getByText(
      cocktailDetailMock.strInstructions
    );
    expect(instructionsElement).toBeInTheDocument();
  });
});
