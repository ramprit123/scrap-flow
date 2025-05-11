import React, { type PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
