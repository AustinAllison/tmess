import React from 'react';

const About = () => {
  return (
    <div className="about container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">About Our Platform</h1>
      <p className="text-lg mb-4 text-gray-700">
        Our platform is built to bridge the gap between property <b>Posters</b> and <b>Claimers</b>.
        It’s designed for real estate professionals to seamlessly manage and book property appointments.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Why Choose Us?</h2>
        <ul className="text-left inline-block text-gray-700 space-y-2">
          <li>🏠 <b>For Posters:</b> Post property appointments and manage schedules effortlessly.</li>
          <li>🗓️ <b>For Claimers:</b> View and claim available appointments with ease.</li>
          <li>🔒 Secure platform with role-based access and authentication.</li>
          <li>⚡ Fast and responsive UI for a smooth experience.</li>
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-lg">
          Built with <span className="font-semibold text-green-600">passion</span> for real estate professionals to make 
          property management simpler and more efficient.
        </p>
        <p className="text-gray-600 mt-2">Version: 1.0.0</p>
      </div>
    </div>
  );
};

export default About;
