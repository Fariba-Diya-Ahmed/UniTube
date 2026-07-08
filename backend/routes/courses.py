from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models import Course, StudentCourse
from schemas import CourseCreate, CourseResponse

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

@router.get("/", response_model=list[CourseResponse])
def get_courses(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Course).all()


# =====================
# ADMIN ADD COURSE
# =====================

@router.post("/add")
def add_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):

    existing = db.query(Course).filter(
        Course.course_name == course.course_name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Course already exists"
        )

    new_course = Course(
        course_name=course.course_name,
        description=course.description,
        course_type=course.course_type
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return {
        "message": "Course added successfully",
        "course_id": new_course.course_id
    }


# =====================
# ADMIN DELETE COURSE
# =====================

@router.delete("/{course_id}")
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
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
        "message": "Course deleted successfully"
    }


# =====================
# STUDENT SELECT COURSE
# =====================

@router.post("/select/{course_id}")
def select_course(
    course_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    course = db.query(Course).filter(
        Course.course_id == course_id
    ).first()

    if course is None:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    selected = db.query(StudentCourse).filter(
        StudentCourse.user_id == user.user_id,
        StudentCourse.course_id == course_id
    ).first()

    if selected:
        raise HTTPException(
            status_code=400,
            detail="Course already selected"
        )

    new_selection = StudentCourse(
        user_id=user.user_id,
        course_id=course_id
    )

    db.add(new_selection)
    db.commit()

    return {
        "message": "Course selected successfully"
    }


# =====================
# STUDENT REMOVE COURSE
# =====================

@router.delete("/remove/{course_id}")
def remove_course(
    course_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
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
        "message": "Course removed successfully"
    }


# =====================
# MY COURSES
# =====================

@router.get("/my", response_model=list[CourseResponse])
def my_courses(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
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
