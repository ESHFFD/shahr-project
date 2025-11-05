"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const OrderComponent = () => {
  const [steps, setSteps] = useState([[]]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const addNumber = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return;

    const currentNumbers = [...steps[currentStep]];
    const newNumbers = [...currentNumbers, num].sort((a, b) => a - b);

    const newSteps = steps.slice(0, currentStep + 1);
    newSteps.push(newNumbers as []);

    setSteps(newSteps);
    setCurrentStep(currentStep + 1);
    setInputValue("");
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      addNumber();
    }
  };
  const currentNumbers = steps[currentStep];
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-blue-100 w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Number Ordering
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Add numbers and watch them sort automatically
        </p>

        <div className="flex gap-2 mb-6">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a number..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
            disabled={currentStep < steps.length - 1}
          />
          <button
            onClick={addNumber}
            disabled={currentStep < steps.length - 1}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            <Plus />
            Add
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {currentNumbers.length} {currentNumbers.length === 1 ? "number" : "numbers"}
            </span>
          </div>

          <div className="min-h-[200px] bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            {currentNumbers.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-gray-400">
                No numbers yet. Start adding!
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {currentNumbers.map((num, idx) => (
                  <div
                    key={`${currentStep}-${idx}-${num}`}
                    className="bg-linear-to-br from-purple-500 to-blue-500 text-white px-6 py-4 rounded-lg font-bold text-xl shadow-lg transform transition-all duration-500 hover:scale-110"
                    style={{
                      animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ChevronLeft size={20} />
            Previous Step
          </button>
          <button
            onClick={goForward}
            disabled={currentStep === steps.length - 1}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Next Step
            <ChevronRight size={20} />
          </button>
        </div>

        {currentStep < steps.length - 1 && (
          <div className="mt-4 text-center text-sm text-orange-600 bg-orange-50 py-2 rounded-lg">
            viewing a previous step. Go to the latest step to add more numbers.
          </div>
        )}
      </div>

      {/* <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style> */}
    </div>
  );
};

export default OrderComponent;
