
import React from 'react';

interface AccordionItemProps {
  categoryInfo: {
    id: 'language' | 'behavior' | 'development';
    title: string;
    icon: string;
    questions: { id: string; label: string }[];
  };
  isOpen: boolean;
  onToggle: () => void;
  checkboxState: Record<string, boolean>;
  onCheckboxChange: (questionId: string, checked: boolean) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  categoryInfo,
  isOpen,
  onToggle,
  checkboxState,
  onCheckboxChange,
}) => {
  const isSelected = Object.values(checkboxState).some(v => v);

  return (
    <div className={`border rounded-xl transition-all duration-300 ${isOpen ? 'bg-gray-50 border-gray-300' : isSelected ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800"
      >
        <div className="flex items-center">
            <span className="mr-4 text-2xl">{categoryInfo.icon}</span>
            <span className="text-lg">{categoryInfo.title}</span>
            {isSelected && !isOpen && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 pb-5 pt-2 border-t border-gray-200">
          <div className="space-y-3 pt-2">
            {categoryInfo.questions.map(q => (
              <label key={q.id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkboxState[q.id] || false}
                  onChange={(e) => onCheckboxChange(q.id, e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                />
                <span className="text-gray-700 group-hover:text-gray-900">{q.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;