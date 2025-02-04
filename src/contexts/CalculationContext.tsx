// src/contexts/CalculationContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface CalculationState {
  currentGrade: string;
  desiredGrade: string;
  finalWeight: string;
  result: number | null;
}

interface CalculationContextType {
  calculationState: CalculationState;
  setCalculationState: React.Dispatch<React.SetStateAction<CalculationState>>;
  saveCalculation: (userId: string) => Promise<void>;
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export function CalculationProvider({ children }: { children: React.ReactNode }) {
  const [calculationState, setCalculationState] = useState<CalculationState>({
    currentGrade: '',
    desiredGrade: '',
    finalWeight: '',
    result: null
  });

  const saveCalculation = async (userId: string) => {
    if (!calculationState.result) return;

    try {
      const response = await fetch("/api/calculations/final-exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          input_data: {
            currentGrade: calculationState.currentGrade,
            desiredGrade: calculationState.desiredGrade,
            finalWeight: calculationState.finalWeight,
          },
          calculated_final_score_needed: calculationState.result,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save calculation');
      }
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  };

  return (
    <CalculationContext.Provider value={{ calculationState, setCalculationState, saveCalculation }}>
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  const context = useContext(CalculationContext);
  if (context === undefined) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
}