import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { PaginationFooter, PaginationFooterProps } from "./PaginationFooter";
import {
  cocktailDetailIngredientHeavyMock,
  cocktailDetailMock
} from "../../mocks/CocktailDetailMock";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const setupRender = (paginationMock: PaginationFooterProps) =>
  render(<PaginationFooter {...paginationMock} />, { wrapper: MemoryRouter });

describe("Component verification", () => {
  test("01 - Test basic pagination footer render", () => {
    const paginationMock: PaginationFooterProps = {
      drinksPerPage: 3,
      totalDrinks: 15,
      paginate: jest.fn(),
      previousPage: jest.fn(),
      nextPage: jest.fn(),
      currentPage: 1
    };
    setupRender(paginationMock);
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const pages = getAllByRole("listitem");
    expect(pages.length).toBe(7);
  });
  test("02 - Test more drinks per page than total drinks", () => {
    const paginationMock: PaginationFooterProps = {
      drinksPerPage: 5,
      totalDrinks: 2,
      paginate: jest.fn(),
      previousPage: jest.fn(),
      nextPage: jest.fn(),
      currentPage: 1
    };
    setupRender(paginationMock);
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const pages = getAllByRole("listitem");
    expect(pages.length).toBe(
      Math.ceil(paginationMock.totalDrinks / paginationMock.drinksPerPage) + 2
    );
  });
  test("03 - Test more drinks than showable max ", () => {
    const paginationMock: PaginationFooterProps = {
      drinksPerPage: 5,
      totalDrinks: 2,
      paginate: jest.fn(),
      previousPage: jest.fn(),
      nextPage: jest.fn(),
      currentPage: 1,
      maxShowablePages: 1
    };
    setupRender(paginationMock);
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const pages = getAllByRole("listitem");
    expect(pages.length).toBe(
      Math.ceil(paginationMock.totalDrinks / paginationMock.drinksPerPage) + 2
    );
  });
  test("04 - Test pagination functions are called ", () => {
    const paginationMock: PaginationFooterProps = {
      drinksPerPage: 3,
      totalDrinks: 9,
      paginate: jest.fn(),
      previousPage: jest.fn(),
      nextPage: jest.fn(),
      currentPage: 1
    };
    setupRender(paginationMock);
    const list = screen.getAllByRole("listitem");
    list.map((li) => {
      fireEvent.click(li);
    });
    expect(paginationMock.previousPage).toBeCalledTimes(1);
    expect(paginationMock.nextPage).toBeCalledTimes(1);
    expect(paginationMock.paginate).toBeCalledTimes(
      Math.ceil(paginationMock.totalDrinks / paginationMock.drinksPerPage)
    );
  });
});
