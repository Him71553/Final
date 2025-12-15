from pathlib import Path
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
	PORT: int = Field(3000, ge=1024, le=65535)
	JWT_SECRET: str = Field(..., min_length=32, max_length=256)

	model_config = SettingsConfigDict(env_file=Path(".env"))


class UserBase(BaseModel):
	username: str


class UserCreate(UserBase):
	password: str = Field(..., min_length=6, max_length=50)
