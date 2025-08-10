
import React from 'react';

interface StepProps {
  icon: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex items-center justify-center h-20 w-20 bg-white rounded-full text-4xl mb-4 shadow-md shadow-gray-400/10">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1 px-2">{description}</p>
    </div>
  );
};

export default Step;