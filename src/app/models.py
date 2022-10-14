from app import db

class Book(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(1000), index=True)
	isbn = db.Column(db.String(100),index=True)
	author = db.Column(db.String(100))
