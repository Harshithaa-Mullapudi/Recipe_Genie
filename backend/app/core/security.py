from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

<<<<<<< HEAD
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
=======
from fastapi import HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
>>>>>>> auth-feature
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.db.models import User


SECRET_KEY = "YOUR_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Use Argon2 instead of bcrypt
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
<<<<<<< HEAD
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
=======
auth_scheme = HTTPBearer()
>>>>>>> auth-feature


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

<<<<<<< HEAD
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
=======
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(auth_scheme),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")

        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user  # <-- THIS IS IMPORTANT
>>>>>>> auth-feature
