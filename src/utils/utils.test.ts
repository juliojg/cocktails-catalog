import { cocktailDetailListMock, cocktailDetailMock } from "../mocks/CocktailMocks";
import rawList from "../mocks/rawCocktailListMock.json";
import rawCocktail from "../mocks/rawCocktailDetailMock.json";
import { rawToCocktailList, rawToCocktailDetail } from "../utils/utils";


describe("Utility verification", () => {
  test("01 - Test raw list to id list conversion", () => {
    rawToCocktailList(rawList.drinks).forEach((id, index) => {
      expect(id).toBe(cocktailDetailListMock[index].id)
    })
  }),
    test("02 - Test raw cocktail to cocktailDetail conversion", () => {
      const detail = rawToCocktailDetail(rawCocktail);
      expect(detail.id).toBe(cocktailDetailMock.id)
      expect(detail.strDrink).toBe(cocktailDetailMock.strDrink)
      expect(detail.strDrinkThumb).toBe(cocktailDetailMock.strDrinkThumb)
      expect(detail.error).toBe(cocktailDetailMock.error)
      expect(detail.strInstructions).toBe(cocktailDetailMock.strInstructions)
      detail.ingredients.map((igr, index) => {
        expect(igr.name).toBe(cocktailDetailMock.ingredients[index]?.name);
        expect(igr.measure).toBe(cocktailDetailMock.ingredients[index]?.measure)
      })
    }),
    test("03 - Test raw cocktail to cocktailDetail conversion", () => {
      const detail = rawToCocktailDetail(null);
      expect(detail.error).toBe(true)
    })
})