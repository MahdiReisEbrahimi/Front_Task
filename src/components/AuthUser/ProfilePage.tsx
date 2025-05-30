"use client";
import { useState } from "react";
import WelcomeHeader from "./WelcomHeader";
import EditProfileForm from "./EditProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

//Main component of the profile page for logged in user
export default function ProfilePage({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);

  // get users from redux store
  const users = useSelector((state: RootState) => state.users.users);
  const user = users.find((user) => user.id === id);

  return (
    <div className="h-screen">
      <WelcomeHeader user={user} onEditClick={() => setIsEditing(true)} />
      {isEditing && (
        <EditProfileForm user={user} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
}
