// src/providers/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import store from "@/store/index";

// to provide redux to the main layout page
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
