import { useEffect } from "react";

const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title + " | Brita";
  }, [title]);

  return null;
};

export default PageTitle;
