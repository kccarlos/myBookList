from flask import flash, json, request
from flask_admin.contrib.sqla import ModelView

from app import app, db, admin
from .models import Book

admin.add_view(ModelView(Book, db.session))

class bookEncoder(json.JSONEncoder):
	'''
		JSON encoder for books
	'''
	def default(self, obj):
		if isinstance(obj, Book):
			return {'id':obj.id, 'title': obj.title, 'isbn': obj.isbn, 'author': obj.author}
		return json.JSONEncoder.default(self, obj)

@app.route('/books', methods=['GET'])
def getbooks():
	'''
	Exposes route: /books
	Method: GET
	Returns: A list of books in the database
	'''
	books = Book.query.filter_by().all()
	return json.dumps(books,cls=bookEncoder)

@app.route('/book/<int:id>', methods=['GET'])
def getbook(id):
	'''
	Exposes route: /book/<id>
	Method: GET
	Returns: The book with the specified id or 404 if no book with that id exsists
	'''
	book = Book.query.filter_by(id=id).all()
	if len(book) == 1:
		return json.dumps(book,cls=bookEncoder), 200, {'ContentType':'application/json'}
	else:
		return "", 404, {'ContentType':'application/json'}

@app.route('/book/<int:id>', methods=['DELETE'])
def removebook(id):
	books = Book.query.filter_by(id=id).all()
	if len(books) < 1:
		return "", 404, {'ContentType':'application/json'}
	else:
		db.session.delete(books[0])
		db.session.commit()
		return "", 200, {'ContentType':'application/json'}

@app.route('/book/<int:id>', methods=['PUT'])
def updatebook(id):
	'''
	Exposes route: /book/<id>
	Method: PUT
	Returns: The modied book or 400 if something went wrong
	'''
	load = json.loads(request.data)
	t = Book.query.filter_by(id=id).first()

	try:
		id_ = load['id']
	except:
		id_ = id
	try:
		t.title = load['title']
	except:
		print("Error occured gettng title")
	try:
		t.isbn = load['isbn']
	except:
		print("Error occured gettng isbn")
	try:
		t.author = load['author']
	except:
		print("Error occured gettng author")
	if id != id_:
		return "", 400, {'ContentType':'application/json'}
	else:
		db.session.commit()
		return json.dumps(t,cls=bookEncoder), 200, {'ContentType':'application/json'}


@app.route('/books',methods=['POST'])
def addbook():
	'''
	Exposes route: /book/<id>
	Method: POST
	Returns: The new book or 400 if something went wrong
	'''
	load = json.loads(request.data)
	try:
		title = load['title']
		isbn = load['isbn']
		author = load['author']

		t = Book()
		t.title = title
		t.isbn = isbn
		t.author = author
		db.session.add(t)
		db.session.commit()
		return json.dumps(t,cls=bookEncoder), 200, {'ContentType':'application/json'}
	except Exception as e:
		print(e)
		return "", 400, {'ContentType':'application/json'}
