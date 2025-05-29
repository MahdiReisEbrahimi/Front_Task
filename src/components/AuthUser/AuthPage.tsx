"use client";
import { useState } from "react";
import Image from "next/image";
import IsLoading from "../reusable/IsLoading";

export default function AuthPage({ user, intro }: { user: any; intro: string }) {
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <IsLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-black p-8 rounded-xl shadow-lg max-w-md w-full text-center transition-transform transform hover:scale-105 duration-300">
        <Image
          src={editableUser.avatar}
          alt={`Avatar of ${editableUser.first_name}`}
          width={200}
          height={200}
          className="rounded-full mb-4 mx-auto shadow-md"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {editableUser.first_name} {editableUser.last_name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          <span className="text-blue-600">{editableUser.email}</span>
        </p>
        <p className="text-md text-gray-700 italic text-left">{intro}</p>

        {/* دکمه ویرایش */}
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="mt-4 px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="first_name"
                value={editableUser.first_name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={editableUser.last_name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={editableUser.avatar}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
