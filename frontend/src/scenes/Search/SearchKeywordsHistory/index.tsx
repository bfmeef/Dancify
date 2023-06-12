import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { searchActions } from "@features/search/searchSlice";

import SearchKeywordsItem from "./SearchKeywordsItem/SearchKeywordsItem";
import SearchKeywordsHeader from "./SearchKeywordsItem/SearchKeywordsHeader";

export default function SearchKeywordsHistory() {
  const dispatch = useAppDispatch();
  const { keywords } = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(searchActions.getAllKeywords());
  }, [dispatch]);

  return (
    <>
      {/* 최근 검색어 영역 */}
      <section
        className={`h-60 w-full overflow-scroll rounded-md border  sm:shadow-md md:block md:shadow-none`}
      >
        {/* 헤더 회색 영역 */}
        <SearchKeywordsHeader />

        {/* 최근 검색어 리스트 */}
        <ul className="px-4">
          {/* 5개만 검색어 노출 */}
          {keywords.slice(0, 5).map((keyword, index) => (
            <SearchKeywordsItem
              key={index + keyword}
              keyword={keyword}
              index={index}
            />
          ))}
        </ul>
      </section>
    </>

    //? 추후 연관 검색어 추천 넣기
  );
}