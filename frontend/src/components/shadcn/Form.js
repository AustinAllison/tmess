// src/components/shadcn/Form.js

import React from 'react';

const Form = ({ children, ...props }) => {
  return (
    <form {...props} className="space-y-4">
      {children}
    </form>
  );
};

const FormField = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const FormLabel = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 font-semibold">
      {children}
    </label>
  );
};

const FormMessage = ({ children }) => {
  return <div className="mt-1 text-sm text-red-500">{children}</div>;
};

export { Form, FormField, FormLabel, FormMessage };
