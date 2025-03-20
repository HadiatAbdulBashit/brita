import AdvanceSearch from "@/components/advance-search";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FileSearch2 } from "lucide-react";
import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <main className='grow pt-8'>
        <Outlet />
      </main>
      <Sheet>
        <SheetTrigger className='bottom-4 right-0 lg:hidden fixed'>
          <Button className='pr-6'>
            <FileSearch2 />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <ScrollArea className='h-full'>
            <SheetHeader>
              <SheetTitle>Search News</SheetTitle>
              <SheetDescription>Find the updates you are looking for</SheetDescription>
            </SheetHeader>
            <div className='p-4 pt-0'>
              <AdvanceSearch />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Footer />
    </>
  );
};

export default DefaultLayout;
