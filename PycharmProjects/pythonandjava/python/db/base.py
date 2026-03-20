from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://user:password@javanadpythondb:5432/mydb"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
