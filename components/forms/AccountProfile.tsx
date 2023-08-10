'use client';

import React, { useState } from 'react';
import { updateUser } from '@/lib/actions/user.actions';

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
  const [formData, setFormData] = useState(user);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    await updateUser({
      name: formData.name,
      username: formData.username,
      userId: user.id,
      bio: formData.bio,
      image: formData.image,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={formData?.bio}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData?.image}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default AccountProfile;
