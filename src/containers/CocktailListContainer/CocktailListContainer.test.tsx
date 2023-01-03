import React from "react";
import { render, screen } from "@testing-library/react";
import { CocktailListContainer } from "./CocktailListContainer";
import { CocktailListContext } from "../../App";
import { CocktailDetail } from "types/CocktailTypes";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useFetchCocktailsDetails from "hooks/useFetchCocktailsDetails";

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

jest.mock("../../hooks/useFetchCocktailsDetails");

const useMockFetch = jest.mocked(useFetchCocktailsDetails, false);

const mockState = jest.fn();

const setupRender = () =>
  render(
    <CocktailListContext.Provider value={mockState}>
      <MemoryRouter initialEntries={[`/drinks`]}>
        <Routes>
          <Route path="/drinks" element={<CocktailListContainer />} />
        </Routes>
      </MemoryRouter>
    </CocktailListContext.Provider>
  );

describe("Component verification", () => {
  test("01 - Test container list correct fetch", () => {
    useMockFetch.mockReturnValue([cocktailDetailListMock, false, false]);
    const { getByAltText } = setupRender();
    cocktailDetailListMock.map((c) => {
      const nameElement = screen.getByText(c.strDrink);
      expect(nameElement).toBeInTheDocument();
      const image = getByAltText(`${c.strDrink} cocktail`);
      expect(image.getAttribute("src")).toContain(c.strDrinkThumb);
    });
  });
  test("02 - Test container list pending fetch", () => {
    useMockFetch.mockReturnValue([cocktailDetailListMock, true, false]);
    const { container } = setupRender();
    expect(container.getElementsByClassName("spinner-container").length).toBe(
      1
    );
  });
  test("03 - Test container list error fetch", () => {
    useMockFetch.mockReturnValue([cocktailDetailListMock, false, true]);
    setupRender();
    const nameElement = screen.getByText("error.failToGetList");
    expect(nameElement).toBeInTheDocument();
  });
});
