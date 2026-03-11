from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Incident

class IncidentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_incident(
        self,
        user_id: str,
        scenario: str,
        description: str,
        priority: str,
        resolver_group: str
    ):
        incident = Incident(
            user_id=user_id,
            issue=description,
            priority=priority,
            resolver_group=resolver_group,
            status="Open"
        )
        self.db.add(incident)
        await self.db.commit()
        await self.db.refresh(incident)
        return incident

    async def get_recent_incidents(self, user_id: str, limit: int = 5):
        stmt = select(Incident).where(Incident.user_id == user_id).order_by(Incident.created_at.desc()).limit(limit)
        result = await self.db.execute(stmt)
        return result.scalars().all()