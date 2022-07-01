from dotenv import load_dotenv
load_dotenv()

from app import *
app.app_context().push()

from models import initDB
initDB()