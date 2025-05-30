"use server";

import fs from "fs";
import { User } from "@/store/userApi";
import { emailChecker, valueLengthChecker } from "@/helperFn/formValidation";

interface SignupState {
  errors: string[] | null;
  enteredValues: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
}

export async function signupAction(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState & { activeUser?: User | null }> {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const avatarFile = formData.get("avatar") as File | null;

  const errors: string[] = [];

  if (!valueLengthChecker(firstName, 3))
    errors.push("First name must be at least 3 characters.");
  if (!valueLengthChecker(lastName, 3))
    errors.push("Last name must be at least 3 characters.");
  if (!emailChecker(email)) errors.push("Email is invalid!");
  if (!avatarFile || avatarFile.size === 0)
    errors.push("Please pick an avatar image.");

  const enteredValues = {
    firstName,
    lastName,
    email,
    avatar: "",
  };

  if (errors.length > 0) {
    return { errors, enteredValues };
  }

  const buffer = Buffer.from(await avatarFile.arrayBuffer());
  const ext = avatarFile.name.split(".").pop();
  const fileName = `${firstName}${lastName}.${ext}`;
  const filePath = `public/images/${fileName}`;

  await fs.promises.writeFile(filePath, buffer);

  return {
    errors: null,
    enteredValues: { firstName: "", lastName: "", email: "", avatar: "" },
    activeUser: {
      id: crypto.randomUUID(),
      email,
      first_name: firstName,
      last_name: lastName,
      avatar: `/images/${fileName}`,
    },
  };
}
