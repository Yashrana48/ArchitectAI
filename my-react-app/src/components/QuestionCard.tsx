import React from 'react';
import type { QuestionCardProps } from '../types';

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  currentAnswer
}) => {
  const handleAnswerChange = (value: string) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {question.question}
        </h3>
        {question.required && (
          <span className="text-red-500 text-sm">* Required</span>
        )}
      </div>

      {question.type === 'select' && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={currentAnswer === option.value}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={currentAnswer || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your answer..."
        />
      )}

      {question.type === 'number' && (
        <input
          type="number"
          value={currentAnswer || ''}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter a number..."
        />
      )}

      <div className="mt-3 text-sm text-gray-500">
        Category: {question.category}
      </div>
    </div>
  );
};

export default QuestionCard;