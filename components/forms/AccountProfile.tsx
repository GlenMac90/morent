'use client';

import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import * as z from 'zod';

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}

const AccountProfile: React.FC<Props> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: '',
      name: '',
      username: '',
      bio: '',
    },
  });

  const onSubmit = (values: z.infer<typeof UserValidation>) => {
    console.log(values);
  };

  const handleImage = (
    e: ChangeEvent,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel className="ml-1 p-4 pl-0">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className=" rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className=" object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload an Image"
                  className=""
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel className="ml-1 p-4 pl-0">Name</FormLabel>
              <FormControl className="">
                <Input type="text" className="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel className="ml-1 p-4 pl-0">User Name</FormLabel>
              <FormControl className="">
                <Input type="text" className="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel className="ml-1 p-4 pl-0">Bio</FormLabel>
              <FormControl className="">
                <Textarea rows={10} className="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-blue500 text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
