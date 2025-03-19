import useSWR from "swr";
import PageTitle from "@/components/page-title";
import { Article } from "@/types";
import NewsCard from "@/components/news-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [selectedCategory, setCategory] = useState<string>("general");
  const { categories, isLoading: metaLoading } = useSelector((state: any) => state.metaData);

  const { data, error, isLoading } = useSWR(`/top-headlines?category=${selectedCategory}`);

  return (
    <div className='container mx-auto'>
      <PageTitle title='Home' />
      <div className='flex gap-12 items-center mb-8 overflow-hidden'>
        <h1 className='text-3xl font-bold text-primary'>News</h1>
        <div className='grow flex gap-2 items-center'>
          {metaLoading ? (
            <Skeleton />
          ) : (
            categories.map((category: string, index: number) => (
              <Button
                className='capitalize'
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
        </div>
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
