"use client";
import { useState } from "react";
import WelcomeHeader from "./WelcomHeader";
import EditProfileForm from "./EditProfileForm";
import { User } from "@/store/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ProfilePage({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);

  const users = useSelector((state: RootState) => state.users.users);

  const user = users.find(user => user.id === id)
  return (
    <div className="h-screen">
      <WelcomeHeader user={user} onEditClick={() => setIsEditing(true)} />
      {isEditing && (
        <EditProfileForm user={user} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
}
