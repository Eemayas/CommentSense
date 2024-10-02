import React from "react";

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="mx-auto rounded-[28px] border border-slate-400 bg-slate-800 bg-opacity-30 p-5 shadow-lg backdrop-blur-sm">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthFormWrapper;
