from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.environ["DB_URI"]