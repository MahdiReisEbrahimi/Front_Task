"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../reusable/Input";
import PrintFormErrors from "../reusable/PrintFormErrors";
import { editUser } from "@/store/userSlice";
import Error from "../reusable/Error";
import { useUpdateUserServer } from "@/hooks/useUpdateUserServer";
import { editProfileAction } from "@/actions/profile/edit-profile-action";

interface EditProfileFormProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
  onCancel: () => void;
}


export default function EditProfileForm({
  user,
  onCancel,
}: EditProfileFormProps) {
  const dispatch = useDispatch();

  const [formState, formAction] = useActionState(editProfileAction, {
    errors: null,
    enteredValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatar: user.avatar,
    },
    userId: user.id,
  });

  const { updateUser, updatedUser, loading, error } = useUpdateUserServer();

  useEffect(() => {
    if (!formState.activeUser) return;

    const active = formState.activeUser;

    const runUpdate = async () => {
      await updateUser({
        id: active.id,
        first_name: active.first_name,
        last_name: active.last_name,
        email: active.email,
        avatar: active.avatar,
      });
    };

    runUpdate();
  }, [formState.activeUser]);

  useEffect(() => {
    // save edits on redux
    if (updatedUser) {
      const okUpdatedUser: {
        first_name: string;
        last_name: string;
        email: string;
        avatar: string;
        id: string;
      } = {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        id: formState.activeUser.id,
      };
      dispatch(editUser(okUpdatedUser));
      onCancel(); // close edit form
    }
  }, [updatedUser, error]);

  if (error)
    return (
      <Error message="Error accured during update. Please try again later." />
    );

  return (
    <form
      action={formAction}
      className="w-full bg-gradient-to-r from-black to-gray-600 p-6 rounded-lg shadow-lg mt-20 space-y-4 m-auto text-white"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="First Name"
          type="text"
          id="first_name"
          defaultValue={formState.enteredValues.firstName}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Last Name"
          type="text"
          id="last_name"
          defaultValue={formState.enteredValues.lastName}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Email"
          type="email"
          id="email"
          defaultValue={formState.enteredValues.email}
        />
        <Input
          labelClassName="text-white"
          inputClassName=""
          divClassName=""
          label="Avatar"
          type="text"
          id="avatar"
          defaultValue={formState.enteredValues.avatar}
        />

        <PrintFormErrors errors={formState.errors} />
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
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
