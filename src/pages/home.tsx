import { useSelector } from "react-redux";
import { useState } from "react";
import useSWR from "swr";

import PageTitle from "@/components/page-title";
import NewsCard from "@/components/news-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { Article } from "@/types";

const Home = () => {
  const [selectedCategory, setCategory] = useState<string>("general");
  const [selectedCountry, setCountry] = useState<string>("id");
  const { categories, countries, isLoading: metaLoading } = useSelector((state: any) => state.metaData);

  const { data, error, isLoading } = useSWR(
    `/top-headlines?${selectedCategory === "" ? "country" : "category"}=${
      selectedCategory === "" ? selectedCountry : selectedCategory
    }&pageSize=10`
  );

  return (
    <div className='container mx-auto'>
      <PageTitle title='Home' />
      <div className='flex gap-12 items-center mb-8'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Top Headlines</h1>
        <ScrollArea className='whitespace-nowrap overflow-hidden'>
          <div className='flex w-max space-x-2 p-4'>
            {metaLoading ? (
              <Skeleton className='w-full h-8' />
            ) : (
              categories.map((category: string, index: number) => (
                <Button
                  className='capitalize shrink-0'
                  variant={selectedCategory === category ? "default" : "outline"}
                  disabled={selectedCategory === category}
                  size={"sm"}
                  key={index}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </Button>
              ))
            )}
            {metaLoading ? (
              <Skeleton className='w-full h-8' />
            ) : (
              countries.map((country: string, index: number) => (
                <Button
                  className='uppercase shrink-0'
                  variant={selectedCategory === country ? "default" : "outline"}
                  disabled={selectedCategory === country}
                  size={"sm"}
                  key={index}
                  onClick={() => {
                    setCountry(country);
                    setCategory("");
                  }}
                >
                  {country}
                </Button>
              ))
            )}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      {error ? (
        <div className='flex justify-center items-center grow'>
          <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-4 grid-rows-2 gap-8'>
            <div className='col-span-3 row-span-2 flex justify-between gap-8'>
              {isLoading ? (
                <Skeleton className='w-full aspect-video' />
              ) : (
                data.articles.slice(0, 1).map((article: Article, index: number) => <NewsCard key={index} article={article} isMain />)
              )}
              <Separator orientation='vertical' />
            </div>
            {isLoading ? (
              <>
                <Skeleton className='w-full h-full' />
                <Skeleton className='w-full h-full' />
              </>
            ) : (
              data.articles.slice(1, 3).map((article: Article, index: number) => <NewsCard key={index} article={article} />)
            )}
          </div>
          <div className='grid grid-cols-3 mt-12'>
            <div className='col-span-2 flex flex-col gap-4'>
              {isLoading ? (
                <Skeleton className='w-full aspect-video' />
              ) : (
                data.articles.slice(3).map((article: Article, index: number) => <NewsCard key={index} article={article} isSide />)
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
