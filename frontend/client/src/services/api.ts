
export interface PredictionResponse {
  result?: string;
  error?: string;
}

export const predict = async (input: string): Promise<PredictionResponse> => {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input }), // Backend expects 'text'
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      result: data.prediction || data.result, // Map backend keys to frontend expectations
    };
  } catch (error) {
    console.error("Prediction failed:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
};
