# main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from agents.ai_agent import AIAgent
from services.incident_service import IncidentService
from loaders.playbook_loader import PlaybookLoader

# Load environment variables from .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set")

# Create Async SQLAlchemy engine
engine: AsyncEngine = create_async_engine(
    DATABASE_URL,
    echo=True,
    future=True
)

# Async session factory
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Initialize FastAPI
app = FastAPI(title="AI Support Portal API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
incident_service = IncidentService(session_factory=async_session)
playbook_loader = PlaybookLoader()
ai_agent = AIAgent(playbook_loader=playbook_loader, incident_service=incident_service)

# Application startup event
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Create tables if they don't exist
        await conn.run_sync(lambda sync_conn: None)  # replace with Base.metadata.create_all(sync_conn) if using declarative Base
    print("Application startup complete!")

# Sample chat endpoint
@app.post("/chat")
async def chat(user_id: str, message: str):
    response = ai_agent.process_message(user_id, message)
    return response

# Endpoint to check database connection
@app.get("/health")
async def health_check():
    try:
        async with engine.connect() as conn:
            await conn.execute("SELECT 1")
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}