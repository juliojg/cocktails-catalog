import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: jest.fn().mockResolvedValue(42)} as unknown as Response)
  })
  test.skip('Basic useFetch use', async () => {
    const testUrl = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass';
    const { result, } = renderHook(() => useFetch(testUrl, jest.fn(x => 42)));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })
    
    const [res, loading, isError] = [...result.current];

    await waitFor(() => expect(res).toBe(42));

  });
});
