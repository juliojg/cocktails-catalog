import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailDetailContainer } from "./CocktailDetailContainer";

import { CocktailDetail } from "types/CocktailTypes";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useFetch from "hooks/useFetch";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const cocktailDetailMock: CocktailDetail = {
  id: "1",
  strInstructions: "testInstructions1",
  strDrink: "testDrink1",
  strDrinkThumb: "testPhoto1",
  ingredients: [
    {
      name: "testIngredient1",
      measure: "testIngredient1measure"
    }
  ],
  error: false
};

jest.mock("../../hooks/useFetch");

const useMockFetch = jest.mocked(useFetch, false);

const setupRender = (cocktailId: string) =>
  render(
    <MemoryRouter initialEntries={[`/drinks/${cocktailId ?? ""}`]}>
      <Routes>
        <Route path="/drinks/:id" element={<CocktailDetailContainer />} />
      </Routes>
    </MemoryRouter>
  );

describe("Component verification", () => {
  test("01 - Test container correct fetch ", () => {
    useMockFetch.mockReturnValue([cocktailDetailMock, false, false]);
    const { getByAltText } = setupRender("1");
    const nameElement = screen.getByText(cocktailDetailMock.strDrink);
    expect(nameElement).toBeInTheDocument();

    const image = getByAltText(`${cocktailDetailMock.strDrink} cocktail`);
    expect(image.getAttribute("src")).toContain(
      cocktailDetailMock.strDrinkThumb
    );

    cocktailDetailMock.ingredients.map((i) => {
      const ingredientElement = screen.getByText(`${i.measure} - ${i.name}`);
      expect(ingredientElement).toBeInTheDocument();
    });

    const instructionsElement = screen.getByText(
      cocktailDetailMock.strInstructions
    );
    expect(instructionsElement).toBeInTheDocument();
  });
  test("02 - Test container pending fetch", () => {
    useMockFetch.mockReturnValue([cocktailDetailMock, true, false]);
    const unexistentId = "no-id";
    const { container } = setupRender(unexistentId);
    expect(container.getElementsByClassName("spinner-container").length).toBe(
      1
    );
  });
  test("03 - Test container error fetch", () => {
    useMockFetch.mockReturnValue([cocktailDetailMock, false, true]);
    const unexistentId = "no-id";
    setupRender(unexistentId);
    const nameElement = screen.getByText("error.unexistentCocktail");
    expect(nameElement).toBeInTheDocument();
  });
});
