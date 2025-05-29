"use client";
import { useState } from "react";
import WelcomeHeader from "./WelcomHeader";
import EditProfileForm from "./EditProfileForm";
import { User } from "@/store/userApi";

export default function ProfilePage({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(true);

  return (
    <div className="px-4 py-8">
      <WelcomeHeader user={user} onEditClick={() => setIsEditing(true)} />
      {isEditing && (
        <EditProfileForm
          user={user}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <div className="h-500"></div>
    </div>
  );
}
