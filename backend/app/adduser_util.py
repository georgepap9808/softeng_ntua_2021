from werkzeug.security import generate_password_hash, check_password_hash
from app.models import db, User

u = User(username = 'nikos',is_admin = true, token = None, first_name = 'nikolaos', last_name = 'markakis',country = 'gr', city = 'athens', street = 'malakismenou', number = 2, zip_code = '12311')
db.session.add(u)
sb.session.commit()