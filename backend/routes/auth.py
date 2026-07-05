from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from passlib.context import CryptContext


from models import User
from schemas import (
    UserCreate,
    ForgotPassword,
    ResetPassword
)

from database import SessionLocal

from auth_utils import create_access_token

from dependencies import (
    get_current_user,
    get_db
)


router = APIRouter()


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



# =====================
# REGISTER
# =====================

@router.post("/register")
def register_user(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(
        user.password
    )


    new_user = User(

        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        phone_number=user.phone_number,
        institution=user.institution,
        department=user.department,
        batch=user.batch,
        year_semester=user.year_semester

    )


    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {

        "message":"Registration successful",
        "user_id":new_user.user_id

    }



# =====================
# LOGIN
# =====================


@router.post("/login")
def login_user(

    form_data: OAuth2PasswordRequestForm = Depends(),

    db: Session = Depends(get_db)

):


    user = db.query(User).filter(
        User.email == form_data.username
    ).first()


    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    if not pwd_context.verify(
        form_data.password,
        user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    token = create_access_token(
        {
            "user_id": user.user_id,
            "email": user.email
        }
    )


    return {

        "access_token":token,
        "token_type":"bearer"

    }



# =====================
# CURRENT USER
# =====================


@router.get("/me")
def get_me(

    user = Depends(get_current_user)

):

    return {

        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "department": user.department,
        "batch": user.batch,
        "role": user.role

    }


# =====================
# FORGOT PASSWORD
# =====================


@router.post("/forgot-password")
def forgot_password(

    data: ForgotPassword,

    db: Session = Depends(get_db)

):

    user = db.query(User).filter(
        User.email == data.email
    ).first()


    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {

        "message":
        "Email verified"

    }



# =====================
# RESET PASSWORD
# =====================


@router.post("/reset-password")
def reset_password(

    data: ResetPassword,

    db: Session = Depends(get_db)

):

    user = db.query(User).filter(
        User.email == data.email
    ).first()


    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.password_hash = pwd_context.hash(
        data.new_password
    )

    db.commit()

    return {

        "message":
        "Password reset successful"
    }
