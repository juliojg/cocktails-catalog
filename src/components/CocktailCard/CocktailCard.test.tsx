import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailCard } from "./CocktailCard";
import {
  cocktailDetailIngredientHeavyMock,
  cocktailDetailMock,
  ingredientMock
} from "../../mocks/CocktailDetailMock";
import { CocktailDetail } from "types/CocktailTypes";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const setupRender = (cocktailDetailMock: CocktailDetail) =>
  render(
    <CocktailCard id={cocktailDetailMock.id} detail={cocktailDetailMock} />,
    { wrapper: MemoryRouter }
  );

describe("Component verification", () => {
  test("01 - Test basic card render", () => {
    const { getByAltText } = setupRender(cocktailDetailMock);

    const nameElement = screen.getByText(cocktailDetailMock.strDrink);
    expect(nameElement).toBeInTheDocument();

    const image = getByAltText(`${cocktailDetailMock.strDrink} cocktail`);
    expect(image.getAttribute("src")).toContain(
      cocktailDetailMock.strDrinkThumb
    );

    const ingredientElement = screen.getByText(
      cocktailDetailMock.ingredients[0].name
    );
    expect(ingredientElement).toBeInTheDocument();
  });
  test("02 - Test card render with long ingredient list", () => {
    const { getByAltText } = setupRender(cocktailDetailIngredientHeavyMock);

    const nameElement = screen.getByText(
      cocktailDetailIngredientHeavyMock.strDrink
    );
    expect(nameElement).toBeInTheDocument();

    const image = getByAltText(
      `${cocktailDetailIngredientHeavyMock.strDrink} cocktail`
    );
    expect(image.getAttribute("src")).toContain(
      cocktailDetailIngredientHeavyMock.strDrinkThumb
    );

    const firstIngredientElement = screen.getByText(
      cocktailDetailIngredientHeavyMock.ingredients[0].name
    );
    expect(firstIngredientElement).toBeInTheDocument();
    const secondIngredientElement = screen.getByText(
      cocktailDetailIngredientHeavyMock.ingredients[1].name
    );
    expect(secondIngredientElement).toBeInTheDocument();

    const remainingIngredients = screen.getByText(
      `cardLabel.and ${
        cocktailDetailIngredientHeavyMock.ingredients.length - 2
      } cardLabel.moreIngredients`
    );
    expect(remainingIngredients).toBeInTheDocument();
  });
});
