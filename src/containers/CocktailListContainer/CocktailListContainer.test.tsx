import React from "react";
import { screen } from "@testing-library/react";
import { CocktailListContainer } from "./CocktailListContainer";
// import { CatalogContext } from "context/CatalogContext";
import { CocktailDetail } from "types/CocktailTypes";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { renderWithProviders } from "utils/tests-utils";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const cocktailDetailListMock: CocktailDetail[] = [
  {
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
  },
  {
    id: "2",
    strInstructions: "testInstructions2",
    strDrink: "testDrink2",
    strDrinkThumb: "testPhoto2",
    ingredients: [
      {
        name: "testIngredient1",
        measure: "testIngredient1measure"
      }
    ],
    error: false
  }
];

const setupRender = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={[`/drinks`]}>
      <Routes>
        <Route path="/drinks" element={<CocktailListContainer />} />
      </Routes>
    </MemoryRouter>
  );

describe("Component verification", () => {
  test("01 - Test container list correct fetch", () => {
    const { getByAltText } = setupRender();
    cocktailDetailListMock.map((c) => {
      const nameElement = screen.getByText(c.strDrink);
      expect(nameElement).toBeInTheDocument();
      const image = getByAltText(`${c.strDrink} cocktail`);
      expect(image.getAttribute("src")).toContain(c.strDrinkThumb);
    });
  });
  test("02 - Test container list pending fetch", () => {
    const { container } = setupRender();
    expect(container.getElementsByClassName("spinner-container").length).toBe(
      1
    );
  });
  test("03 - Test container list error fetch", () => {
    setupRender();
    const nameElement = screen.getByText("error.failToGetList");
    expect(nameElement).toBeInTheDocument();
  });
});
