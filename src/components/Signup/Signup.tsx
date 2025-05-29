"use client";
import LoginForm from "@/components/Login/LoginForm";
import Input from "@/components/reusable/Input";
import { getInputClass } from "@/helperFn/formValidation";
import ImagePicker from "../reusable/ImagePicker";

interface Login {
  onClose: () => void;
}

export default function Login({ onClose }: Login) {
  return (
    <form
      // action={formAction}
      className="bg-white p-6 rounded-sm shadow-xl w-full max-w-sm mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        Signup Form
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 ml-3 text-white font-bold p-2 text-sm rounded-sm"
        >
          Close
        </button>
      </h2>
      <div className="flex">
        <Input
          // defaultValue={formState.enteredValues?.firstName}
          // className={getInputClass("First name", formState.errors || [])}
          defaultValue="ddd"
          divClassName="mx-1"
          inputClassName=""
          label="First Name"
          id="firstName"
          type="text"
        />
        <Input
          // defaultValue={formState.enteredValues?.firstName}
          // className={getInputClass("First name", formState.errors || [])}
          defaultValue="ddd"
          divClassName="mx-1"
          inputClassName=""
          label="Last Name"
          id="lastName"
          type="text"
        />
      </div>

      <Input
        // defaultValue={formState.enteredValues?.firstName}
        // className={getInputClass("First name", formState.errors || [])}
        defaultValue="ddd"
        divClassName="mx-2"
        inputClassName=""
        label="Email"
        id="email"
        type="email"
      />

      <ImagePicker name="mehdi" label="Pick your Avatar" />

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 font-bold py-2 bg-green-800 text-white rounded w-full hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </div>
    </form>
  );
}
