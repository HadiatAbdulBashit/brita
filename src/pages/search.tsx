import AdvanceSearch from "@/components/advance-search";
import NewsCard from "@/components/news-card";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Article } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

const SearchPage = () => {
  const search = useSelector((state: any) => state.news.search);
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useSWR(
    `/everything?q="${search.keyword ? search.keyword : "Indonesia"}"&searchIn=${search.searchIn
      .map((item: string) => item)
      .join(",")}&domains=${search.domains}&excludeDomains=${search.excludeDomains}&from=${search.from}&to=${search.to}&language=${
      search.language
    }&sortBy=${search.sortBy}&pageSize=10&page=${page}`
  );

  console.log(search);

  return (
    <div className='container mx-auto'>
      <PageTitle title='Search' />
      <div className='flex gap-12 items-center mb-8'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Search News</h1>
      </div>
      {error ? (
        <div className='flex justify-center items-center grow'>
          <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
        </div>
      ) : (
        <div className='grid grid-cols-3 mt-12 gap-8'>
          <div className='col-span-2 flex flex-col gap-4'>
            {isLoading ? (
              <Skeleton className='w-full aspect-video' />
            ) : data.status === "error" ? null : (
              data.articles.map((article: Article, index: number) => <NewsCard key={index} article={article} isSide />)
            )}
            {isLoading ? (
              <Skeleton className='w-full aspect-video' />
            ) : data.status === "error" ? null : (
              <div className='flex justify-between items-center'>
                <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
                  Previous
                </Button>
                <p>
                  Page: {page} of {(data.totalResults / 10).toFixed()}
                </p>
                <Button onClick={() => setPage(page + 1)} disabled={data.totalResults / 10 < page}>
                  Next
                </Button>
              </div>
            )}
          </div>
          <div>
            <AdvanceSearch />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
