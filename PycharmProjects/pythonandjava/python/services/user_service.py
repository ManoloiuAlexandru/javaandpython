from db.models import UserDB


def add_user_service(user, db):
    user_db = UserDB(name=user.name, password=user.password)
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
