from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 1. Add CORS middleware to allow requests from the React (Vite) frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5000",
        "http://192.168.29.107:5000"
    ],  # Vite and Express ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the input data structure using Pydantic
class PredictRequest(BaseModel):
    text: str

# 3. Create the /predict POST endpoint
@app.post("/predict")
async def predict(request: PredictRequest):
    # This is a dummy response for now
    # You can replace this logic with your actual prediction model later
    return {
        "result": f"Processed: {request.text}",
        "prediction": f"Processed: {request.text}",
        "status": "success",
        "message": "Hello from FastAPI!"
    }

# 4. Optional root endpoint for health check
@app.get("/")
async def root():
    return {"message": "FastAPI backend is running on port 8000"}
