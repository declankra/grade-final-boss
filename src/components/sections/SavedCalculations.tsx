// src/components/sections/SavedCalculations.tsx
// Saved calculations for the authenticated final exam calculator page
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getSupabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

interface Calculation {
  id: string;
  created_at: string;
  input_data: {
    currentGrade: string;
    desiredGrade: string;
    finalWeight: string;
  };
  calculated_final_score_needed: number;
}

const SavedCalculations = () => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalculations = async () => {
      try {
        const supabase = getSupabase();
        
        const { data, error } = await supabase
          .from('gfb_final_exam_calculations')
          .select('*')
          .order('created_at', { ascending: false })
          .returns<Calculation[]>();

        if (error) throw error;

        setCalculations(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculations();
  }, []);

  // Get message based on required score
  const getResultMessage = (score: number): { message: string; color: string } => {
    if (score > 100) {
      return {
        message: "You're fucked.",
        color: "text-red-600"
      };
    } else if (score >= 85) {
      return {
        message: "Possible with intense study.",
        color: "text-orange-600"
      };
    } else if (score >= 60) {
      return {
        message: "Achievable with solid preparation.",
        color: "text-yellow-600"
      };
    } else {
      return {
        message: "You got this!",
        color: "text-green-600"
      };
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading calculations: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (calculations.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No saved calculations yet. Try calculating a final exam score to see it here!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {calculations.map((calc) => {
        const resultMessage = getResultMessage(calc.calculated_final_score_needed);
        
        return (
          <Card key={calc.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Need: {calc.calculated_final_score_needed.toFixed(2)}%
                </span>
                <span className={`text-sm ${resultMessage.color}`}>
                  {resultMessage.message}
                </span>
              </CardTitle>
              <CardDescription>
                Calculated {formatDistanceToNow(new Date(calc.created_at), { addSuffix: true })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Current Grade</p>
                  <p className="font-medium">{calc.input_data.currentGrade}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Desired Grade</p>
                  <p className="font-medium">{calc.input_data.desiredGrade}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Final Weight</p>
                  <p className="font-medium">{calc.input_data.finalWeight}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SavedCalculations;