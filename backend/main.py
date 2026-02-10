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

# 2. Define the input data structures using Pydantic
class PredictRequest(BaseModel):
    text: str

class MarksRequest(BaseModel):
    marks: float

# 3. Create the /predict POST endpoint
@app.post("/predict")
async def predict(request: PredictRequest):
    return {
        "result": f"Processed: {request.text}",
        "prediction": f"Processed: {request.text}",
        "status": "success",
        "message": "Hello from FastAPI!"
    }

# 4. Create the /check-marks POST endpoint
@app.post("/check-marks")
async def check_marks(request: MarksRequest):
    status = "Pass" if request.marks >= 40 else "Fail"
    return {
        "marks": request.marks,
        "status": status,
        "message": f"Student has {status.lower()}ed with {request.marks} marks."
    }


# 4. Optional root endpoint for health check
@app.get("/")
async def root():
    return {"message": "FastAPI backend is running on port 8000"}
