// src/components/shadcn/Input.js

import React from 'react';
import clsx from 'clsx';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...props}
    />
  );
};

export { Input };
