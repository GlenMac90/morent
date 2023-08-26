'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { UserValidation } from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { EditUserFormFields } from '@/lib/interfaces';

interface Props {
  user: string;
}

const AccountProfile: React.FC<Props> = ({ user }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');

  const router = useRouter();
  const pathname = usePathname();

  const userData = JSON.parse(user);

  const form = useForm<EditUserFormFields>({
    // resolver: zodResolver(UserValidation),
    defaultValues: {
      name: userData?.name || '',
      username: userData?.username || '',
      bio: userData?.bio || '',
      image: userData?.image || '',
    },
  });

  const onSubmit = async (values: EditUserFormFields) => {
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.image = imgRes[0].url;
      }
    }

    await updateUser({
      ...userData,
      name: values.name,
      username: values.username,
      bio: values.bio || '',
      image: values.image,
      path: pathname,
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
        className="flex w-full flex-col gap-5 self-center"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start">
              <FormLabel className="ml-1 p-4 pl-0">
                {field.value ? (
                  <div className="flex h-24 w-24">
                    <ImageWithFallback
                      src={field.value}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className=" rounded-full"
                    />
                  </div>
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
              <FormControl className="bg-white200 dark:bg-gray800">
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
              <FormLabel className="ml-1 pl-0 text-lg">Name</FormLabel>
              <FormControl className="bg-white200 dark:bg-gray800">
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
              <FormLabel className="ml-1 pl-0 text-lg">Username</FormLabel>
              <FormControl className="bg-white200 dark:bg-gray800">
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
              <FormLabel className="ml-1 pl-0 text-lg">Bio</FormLabel>
              <FormControl className="bg-white200 dark:bg-gray800">
                <Textarea rows={10} className="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="mt-4 bg-blue500 text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
