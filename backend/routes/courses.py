from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models import Course, StudentCourse
from schemas import CourseCreate

from dependencies import (
    get_current_user,
    admin_required,
    get_db
)


router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


# =====================
# GET ALL COURSES
# =====================

@router.get("/")
def get_courses(

    db: Session = Depends(get_db),
    user = Depends(get_current_user)

):
    courses = db.query(Course).all()

    return courses


# =====================
# ADMIN ADD COURSE
# =====================


@router.post("/add")
def add_course(

    course: CourseCreate,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)

):


    new_course = Course(

        course_name=course.course_name,
        description=course.description,
        course_type=course.course_type

    )


    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return {

        "message":"Course added",
        "course_id":new_course.course_id
    }



# =====================
# ADMIN DELETE COURSE
# =====================


@router.delete("/{course_id}")
def delete_course(

    course_id:int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)

):

    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if course is None:

        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )


    db.delete(course)
    db.commit()

    return {
        "message":"Course deleted"
    }


# =====================
# STUDENT SELECT COURSE
# =====================


@router.post("/select/{course_id}")
def select_course(

    course_id:int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)

):

    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if course is None:

        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )


    exists = db.query(StudentCourse).filter(

        StudentCourse.user_id == user.user_id,
        StudentCourse.course_id == course_id

    ).first()

    if exists:
        return {
            "message":"Already selected"
        }

    selected = StudentCourse(

        user_id=user.user_id,
        course_id=course_id

    )

    db.add(selected)
    db.commit()

    return {
        "message":"Course selected"
    }


# =====================
# STUDENT REMOVE COURSE
# =====================


@router.delete("/remove/{course_id}")
def remove_course(

    course_id:int,
    db:Session = Depends(get_db),
    user = Depends(get_current_user)

):


    selected = db.query(StudentCourse).filter(
        StudentCourse.user_id == user.user_id,
        StudentCourse.course_id == course_id

    ).first()

    if selected is None:

        raise HTTPException(
            status_code=404,
            detail="Course not selected"
        )


    db.delete(selected)
    db.commit()

    return {
        "message":"Removed from your courses"
    }



# =====================
# MY COURSES
# =====================


@router.get("/my")
def my_courses(

    db:Session = Depends(get_db),
    user = Depends(get_current_user)

):

    courses = (

        db.query(Course)

        .join(
            StudentCourse,
            Course.course_id == StudentCourse.course_id
        )

        .filter(
            StudentCourse.user_id == user.user_id
        )

        .all()

    )

    return courses
