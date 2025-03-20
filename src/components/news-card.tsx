import { Link } from "react-router";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import estimateReadTime from "@/lib/count-long-read";

import { setNews } from "@/redux/news/newsSlice";

import store from "@/redux/store";

import { Article } from "@/types";

const NewsCard = ({ article, isMain, isSide = false }: { article: Article; isMain?: boolean; isSide?: boolean }) => {
  const onClickNews = () => {
    store.dispatch(setNews(article));
  };

  return (
    <Card className={`grow overflow-hidden ${isSide && " flex-row gap-y-4"}`}>
      <Link to={"/news"} className={`${isSide ? "max-w-1/3 min-w-1/3" : "w-full"}`} onClick={onClickNews}>
        <img
          src={article.urlToImage ?? "https://placehold.co/600x400"}
          alt={article.title}
          className={`hover:brightness-75 object-cover aspect-video`}
        />
      </Link>
      <div className={`flex grow flex-col ${isSide ? "gap-y-4 mt-2" : !isMain ? "gap-y-2" : "gap-y-6"}`}>
        <CardHeader className='px-0'>
          <CardDescription
            className={`flex ${(isMain ? "text-base" : "text-xs") + (isSide ? " flex-row-reverse justify-end gap-1" : " justify-between")}`}
          >
            <p>{format(new Date(article.publishedAt), "d LLL") + " • " + estimateReadTime(article.content ?? "")}</p>
            <p className=''>By {(article.author ?? "Unknown") + (isSide ? " • " : "")}</p>
          </CardDescription>
          <Link to={"/news"} onClick={onClickNews}>
            <CardTitle className={`hover:text-primary ${isMain && "text-3xl"}`}>{article.title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent className={`px-0 ${isMain ? "text-xl" : "text-sm"}`}>
          <p className='text-justify'>{article.description}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default NewsCard;
