import { CocktailList } from "components/CocktailList/CocktailList";
import ErrorPage from "components/common/ErrorPage/ErrorPage";
import Spinner from "components/common/Spinner/Spinner";
import { useGetList } from "hooks/useGetList";
import React from "react";
import { CocktailDetail } from "types/CocktailTypes";
import { useTranslation } from "react-i18next";

export const CocktailListContainer: React.FC<{}> = () => {
  const { t } = useTranslation();

  const [cocktailList, loading, error] = useGetList<CocktailDetail[]>();

  return error ? (
    <ErrorPage description={t("error.failToGetList")} redirectionLocation="/" />
  ) : loading ? (
    <Spinner />
  ) : (
    <CocktailList cocktailList={cocktailList} />
  );
};
