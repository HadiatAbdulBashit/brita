import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import InputError from "./ui/input-error";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { setSearch } from "@/redux/news/newsSlice";

type Inputs = {
  keyword: string;
  searchIn: string;
  sources: string;
  domains: string;
  excludeDomains: string;
  from: string;
  to: string;
  language: string;
  sortBy: string;
};

const AdvanceSearch = () => {
  const { languages, isLoading: metaLoading } = useSelector((state: any) => state.metaData);
  const search = useSelector((state: any) => state.news.search);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: search,
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    store.dispatch(setSearch(data));
    navigate("/search");
  };

  return (
    <div className='grow sticky top-6'>
      <h3 className='text-center font-semibold'>Advance Search</h3>

      <form className='grid gap-4 mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <Label htmlFor='keyword'>Keyword</Label>
          <Input
            id='keyword'
            type='keyword'
            autoFocus
            tabIndex={1}
            placeholder='keyword'
            {...register("keyword", { required: "Keyword is required" })}
            autoComplete='keyword'
          />
          <InputError message={errors.keyword?.message} />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='searchIn'>Search In</Label>
          <div className='flex flex-col gap-2'>
            {["title", "description", "content"].map((item, index) => (
              <div key={item + index} className='flex gap-2'>
                <Checkbox
                  id={item + "In"}
                  value={item}
                  {...register("searchIn", { required: "Select at least one", min: 1 })}
                  tabIndex={index + 2}
                  defaultChecked
                />
                <Label htmlFor={item + "In"} className='capitalize'>
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <InputError message={errors.searchIn?.message} />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='domains'>Domains</Label>
          <Input id='domains' type='text' tabIndex={6} placeholder='domains.com' {...register("domains")} autoComplete='domains' />
          <InputError message={errors.domains?.message} />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='excludeDomains'>Exclude Domains</Label>
          <Input
            id='excludeDomains'
            type='text'
            autoFocus
            tabIndex={7}
            placeholder='exclude-domains.com'
            {...register("excludeDomains")}
            autoComplete='excludeDomains'
          />
          <InputError message={errors.excludeDomains?.message} />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid gap-2'>
            <Label htmlFor='from'>Release Date from</Label>
            <Input
              id='from'
              type='date'
              autoFocus
              tabIndex={8}
              {...register("from")}
              autoComplete='from'
              className='block'
              max={new Date().toISOString().split("T")[0]}
            />
            <InputError message={errors.from?.message} />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='to'>Release Date to</Label>
            <Input
              id='to'
              type='date'
              autoFocus
              tabIndex={8}
              {...register("to")}
              autoComplete='to'
              className='block'
              max={new Date().toISOString().split("T")[0]}
            />
            <InputError message={errors.to?.message} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid gap-2'>
            <Label htmlFor='language'>Language</Label>
            <select {...register("language")} className='px-2 py-2 border border-input bg-background capitalize text-sm'>
              <option value={""} hidden selected>
                - Lang -
              </option>
              {metaLoading
                ? null
                : languages.map((item: string, index: number) => (
                    <option value={item} key={item + index} className='capitalize'>
                      {item}
                    </option>
                  ))}
            </select>
            <InputError message={errors.language?.message} />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='sortBy'>Sort By</Label>
            <select {...register("sortBy")} className='px-2 py-2 border border-input bg-background capitalize text-sm'>
              <option value={""} hidden selected>
                - Sort By -
              </option>
              {["relevancy", "popularity", "publishedAt"].map((item, index) => (
                <option value={item} key={item + index} className='capitalize'>
                  {item}
                </option>
              ))}
            </select>
            <InputError message={errors.sortBy?.message} />
          </div>
        </div>

        <Button type='submit' className='w-full' tabIndex={4}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default AdvanceSearch;
