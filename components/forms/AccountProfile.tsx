'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log(values);
  }

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
            <FormItem className="">
              <FormLabel className="">Profile Image</FormLabel>
              {field.value ? (
                <Image
                  src={field.value}
                  alt="profile photo"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full object-contain"
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
              <FormControl className="">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload an Image"
                  className=""
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
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
