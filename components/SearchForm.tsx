"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const FormSchema = z.object({
  search: z.string().trim().min(2, {
    message: "Search must be at least 2 characters.",
  }),
});

const SearchForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // TODO - handle search
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="space-y-0 lg:mr-[0.81rem] lg:pt-[2.56rem]">
              <FormLabel className="hidden">Search</FormLabel>
              <FormControl>
                <>
                  <Label
                    htmlFor="search"
                    className="hidden pb-7 text-[0.75rem] font-semibold not-italic leading-[1.125rem] text-blue100 lg:block"
                  >
                    SEARCH
                  </Label>
                  <Input
                    id="search"
                    type="search"
                    className="h-12 truncate border-blue50 bg-[url('/svg-icons/filterSearch.svg')] bg-[0.75rem_center] bg-no-repeat pl-12 text-[0.875rem] 
                      font-medium not-italic leading-[1.3125rem] tracking-[-0.0175rem] text-gray700"
                    placeholder="Search by brand or title"
                    {...field}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hidden">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
