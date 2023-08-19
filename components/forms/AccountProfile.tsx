'use client';

import React, { ChangeEvent, useState } from 'react';
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
import ImageWithFallback from '@/utils/ImageWithFallback';
import { isBase64Image } from '@/lib/utils';

import '@uploadthing/react/styles.css';

import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  user: string;
}

const AccountProfile: React.FC<Props> = ({ user }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');

  const router = useRouter();
  const pathname = usePathname();

  const userData = JSON.parse(user);

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: userData?.name || '',
      username: userData?.username || '',
      bio: userData?.bio || '',
      profile_photo: userData?.image || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }
    await updateUser({
      userId: userData.id,
      name: values.name,
      username: values.username,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
      onboarded: true,
      id: '',
      _id: undefined,
    });

    if (pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) return;

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        fieldChange((fileReader.result as string) || '');
      };
    }
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
                  <ImageWithFallback
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
              <FormLabel className="ml-1 p-4 pl-0">Username</FormLabel>
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
