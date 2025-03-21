import { useSelector } from "react-redux";
import { format } from "date-fns";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";

import estimateReadTime from "@/lib/count-long-read";

import { Article } from "@/types";

const News = () => {
  const news: Article = useSelector((state: any) => state.news.content);

  if (!news.title) return null;

  return (
    <div className='container max-w-xl mx-auto'>
      <PageTitle title='News' />
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl'>{news.title}</h1>
        <div className='flex justify-between'>
          <p>{format(new Date(news.publishedAt), "d LLL") + " • " + estimateReadTime(news.content ?? "")}</p>
          <p>By {news.author ?? "Unknown"}</p>
        </div>
        <figure>
          <img src={news.urlToImage ?? ""} alt={news.title} />
          <figcaption className='text-xs p-2 text-justify'>{news.description}</figcaption>
        </figure>
        <div className='text-justify'>
          {news.content
            ?.split("[")[0]
            ?.split("\n\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          <a href={news.url} target='_blank' rel='noopener noreferrer'>
            <Button variant={"link"} className='px-0 mt-4'>
              Read More
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default News;
