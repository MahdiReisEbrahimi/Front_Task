"use client";

import Input from "@/components/reusable/Input";
import PrintFormErrors from "@/components/reusable/PrintFormErrors";
import { User } from "@/store/userApi";
import {
  valueLengthChecker,
  emailChecker,
  getInputClass,
} from "@/helperFn/formValidation";
import ImagePicker from "../reusable/ImagePicker";
import { IoCloseSharp } from "react-icons/io5";
import { useActionState, useEffect, useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { signupAction } from "@/actions/signup/server-action";
import Error from "../reusable/Error";

// Types for managing form state and props
type SignupState = {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
};

interface Signup {
  onClose: () => void;
}

export default function Signup({ onClose }: Signup) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signup, isLoading, error } = useSignup();

  // Handle API error from custom signup hook
  if (error)
    return <Error message="Fetching data failed. Please try again later" />;

  // useActionState allows progressive enhancement and form submission via actions
  const [formState, formAction] = useActionState<
    SignupState & { activeUser?: User | null },
    FormData
  >((prevState, formData) => signupAction(prevState, formData), {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "", avatar: "" },
  });

  // Handle side effects after successful form submission:
  // - Calls custom signup hook
  // - Updates Redux store
  // - Navigates to user's page
  useEffect(() => {
    if (formState.errors === null && formState.activeUser) {
      const handleSignup = async () => {
        const result = await signup(formState.activeUser);

        if (result.success) {
          dispatch(addUser(result.data));
          onClose();

          setTimeout(() => {
            router.push(`/${result.data.id}`);
          }, 100);
        } else {
          console.log("Signup failed", result.error);
        }
      };

      handleSignup();
    }
  }, [formState]);

  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-between">
        Signup Form
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 cursor-pointer flex items-center ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
          <IoCloseSharp />
        </button>
      </h2>

      {/* First and Last Name fields side-by-side */}
      <div className="flex">
        <Input
          labelClassName=""
          defaultValue={formState.enteredValues?.firstName}
          inputClassName={getInputClass("First name", formState.errors || [])}
          divClassName="mx-1"
          label="First Name"
          id="firstName"
          type="text"
        />
        <Input
          labelClassName=""
          defaultValue={formState.enteredValues?.lastName}
          inputClassName={getInputClass("Last name", formState.errors || [])}
          divClassName="mx-1"
          label="Last Name"
          id="lastName"
          type="text"
        />
      </div>

      {/* Email field */}
      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.email}
        inputClassName={getInputClass("email", formState.errors || [])}
        divClassName="mx-2"
        label="Email"
        id="email"
        type="email"
      />

      {/* Avatar image picker */}
      <ImagePicker name="avatar" label="Pick your Avatar" />

      {/* Display any server-side form validation errors */}
      {formState.errors && <PrintFormErrors errors={formState.errors} />}

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 cursor-pointer font-bold py-2 bg-green-800 text-white rounded w-full hover:bg-green-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Signup"}
        </button>
      </div>
    </form>
  );
}
