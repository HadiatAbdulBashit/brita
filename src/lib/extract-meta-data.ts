import { NewsSource } from "@/types";

export const extractNewsMetadata = (newsSources: NewsSource[]) => {
  const languages = new Set();
  const categories = new Set();
  const countries = new Set();

  newsSources.forEach((source) => {
    if (source.language) languages.add(source.language);
    if (source.category) categories.add(source.category);
    if (source.country) countries.add(source.country);
  });

  return {
    languages: Array.from(languages),
    categories: Array.from(categories),
    countries: Array.from(countries),
  };
};
