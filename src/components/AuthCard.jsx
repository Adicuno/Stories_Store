import React from "react";

const AuthCard = ({ title, children, error, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {children}

        {footer && (
          <div className="mt-6 text-center text-gray-600">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
