import { Article } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import estimateReadTime from "@/lib/count-long-read";
import { format } from "date-fns";

const NewsCard = ({ article, isMain, isSide = false }: { article: Article; isMain?: boolean; isSide?: boolean }) => {
  return (
    <Card className={`grow ${isSide && " flex-row gap-y-4"}`}>
      <img src={article.urlToImage ?? ""} alt={article.title} className={`object-cover aspect-video ${isSide ? "w-1/3" : "w-full"}`} />
      <div className={`grow flex flex-col ${isSide ? "gap-y-4 mt-2" : !isMain ? "gap-y-2" : "gap-y-6"}`}>
        <CardHeader className='px-0'>
          <CardDescription
            className={`flex ${(isMain ? "text-base" : "text-xs") + (isSide ? " flex-row-reverse justify-end gap-1" : " justify-between")}`}
          >
            <p>{format(new Date(article.publishedAt), "d LLL") + " • " + estimateReadTime(article.content ?? "")}</p>
            <p className=''>By {(article.author ?? "Unknown") + (isSide ? " • " : "")}</p>
          </CardDescription>
          <CardTitle className={`${isMain && "text-3xl"}`}>{article.title}</CardTitle>
        </CardHeader>
        <CardContent className={`px-0 ${isMain ? "text-xl" : "text-sm"}`}>
          <p>{article.description}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default NewsCard;
