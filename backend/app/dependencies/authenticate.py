from typing import Annotated
from fastapi import Cookie, HTTPException
from ..security import verify_jwt_token


def auth_dependency(jwt_token: Annotated[str | None, Cookie()] = None):
	if jwt_token is None:
		raise HTTPException(status_code=401, detail="Unauthorized")

	jwt_payload = verify_jwt_token(jwt_token)
	if jwt_payload is None:
		raise HTTPException(status_code=401, detail="Unauthorized")

	return jwt_payload
