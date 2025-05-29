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
import { useLoadUsers } from "@/hooks/useLoadUsers";
import { useSignup } from "@/hooks/useSignup";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

interface SignupState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}
interface Signup {
  onClose: () => void;
}

// SignupForm Action :
async function SignupAction(
  prevState: SignupState,
  formData: FormData,
  users: User[]
): Promise<SignupState & { activeUser?: User | null }> {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";

  // Selected Avatar:
  const avatar = formData.get("avatar") as File | null;
  const imageBuffer = await avatar.arrayBuffer();
  const avatarBase64 = Buffer.from(imageBuffer).toString("base64");

  const errors: string[] = [];

  if (!valueLengthChecker(firstName, 3))
    errors.push("First name must be at least 3 characters.");
  if (!valueLengthChecker(lastName, 3))
    errors.push("Last name must be at least 3 characters.");
  if (!emailChecker(email)) errors.push("Email is invalid!");
  if (!avatar || avatar.size === 0) {
    errors.push("Please pick an avatar image.");
  }

  const enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  } = { firstName, lastName, email, avatar: avatarBase64 };

  if (errors.length > 0) {
    return {
      errors,
      enteredValues,
    };
  }

  return {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "", avatar: "" },
    activeUser: {
      id: crypto.randomUUID().toString(),
      email,
      first_name: firstName,
      last_name: lastName,
      avatar: "https://tinyjpg.com/images/social/website.jpg",
    },
  };
}

export default function Signup({ onClose }: Signup) {
  const { users } = useLoadUsers();
  const dispatch = useDispatch();
  const router = useRouter();
  const { signup, isLoading, error } = useSignup();

  const [formState, formAction] = useActionState<
    SignupState & { activeUser?: User | null },
    FormData
  >((prevState, formData) => SignupAction(prevState, formData, users), {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "", avatar: "" },
  });

  // handling data submition (API AND REDUX) :
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

      <Input
        labelClassName=""
        defaultValue={formState.enteredValues?.email}
        inputClassName={getInputClass("email", formState.errors || [])}
        divClassName="mx-2"
        label="Email"
        id="email"
        type="email"
      />

      <ImagePicker name="avatar" label="Pick your Avatar" />

      {/* Print form Errors */}
      {formState.errors && <PrintFormErrors errors={formState.errors} />}

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 cursor-pointer font-bold py-2 bg-green-800 text-white rounded w-full hover:bg-green-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submiting..." : "Signup"}
        </button>
      </div>
    </form>
  );
}
