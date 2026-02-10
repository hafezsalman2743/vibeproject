
export interface PredictionResponse {
  result?: string;
  error?: string;
}

export interface MarksResponse {
  marks?: number;
  status?: string;
  message?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const predict = async (input: string): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      result: data.prediction || data.result,
    };
  } catch (error) {
    console.error("Prediction failed:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
};


export const checkMarks = async (marks: number): Promise<MarksResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-marks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marks: marks }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Marks check failed:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
  }
};

