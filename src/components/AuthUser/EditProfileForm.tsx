"use client";
import { useState } from "react";
import Input from "../reusable/Input";

export default function EditProfileForm({
  user,
  onCancel,
}: {
  user: any;
  onCancel: () => void;
}) {
  const [editableUser, setEditableUser] = useState(user);

  return (
    <form className="w-full bg-gradient-to-r from-black to-gray-600 p-6 rounded-lg shadow-lg mt-20 space-y-4 m-auto text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="First Name"
          type="text"
          id="firstname"
          defaultValue={editableUser.first_name}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Last Name"
          type="text"
          id="lastName"
          defaultValue={editableUser.last_name}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Email"
          type="email"
          id="email"
          defaultValue={editableUser.email}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Avatar"
          type="text"
          id="avatar"
          defaultValue={editableUser.avatar}
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 cursor-pointer border border-gray-500 text-gray-300 rounded hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 cursor-pointer bg-green-800 font-bold text-white rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
