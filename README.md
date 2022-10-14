# My Booklist Webapp

## Features

 - Add / Remove / Edit book records
 - Searching and Sorting

## Project Structure

 ```
 .
 ├── LICENSE
 ├── README.md
 ├── assets
 │   ├── css
 │   │   └── bootstrap.min.css
 │   ├── js
 │   │   ├── MainController.js
 │   │   ├── angular-resource.min.js
 │   │   ├── angular-route.min.js
 │   │   ├── angular-sanitize.min.js
 │   │   ├── angular-strap.min.js
 │   │   ├── angular.min.js
 │   │   ├── bootstrap.min.js
 │   │   └── jquery.min.js
 │   └── partials
 │       ├── addbook.html
 │       ├── book.html
 │       ├── editable.html
 │       ├── index.html
 │       └── manage.html
 ├── config
 │   ├── web37_linux.yml    # Conda environment for Linux
 │   └── web37_mac.yml      # Conda environment for MacOS
 ├── index.html             # Click this to start
 └── src
     ├── app
     │   ├── __init__.py
     │   ├── models.py
     │   └── views.py
     ├── app.db             # SQLite Database with dummy data
     ├── config.py
     ├── db_create.py
     ├── requirements.txt
     └── run.py             # Run this to start

 ```

 - back-end: the server side code written in Python Flask. `app.db` is a database file containing some dummy data. An empty database can be created by running `db_create.py`.
 - front-end: the client side code written in AngularJS

 To use the app locally, both server and client should be running simultaneously.

 Please use **Chrome incognito window** to check the app.

## Run server code locally

 1. Download [Miniconda](https://docs.conda.io/en/latest/miniconda.html) / Anaconda.
 2. Create a Python **3.6** or **3.7** environment `conda create -n web37 python=3.7`
 3. Activate the environment `conda activate web37` or `source activate web37`
 4. Move to backend directory `cd ./back-end`
 5. Install dependencies `pip install -r requirements.txt`
 6. Run the server `python run.py`. It will run on http://localhost:5000
 7. To test the app, you may go to http://localhost:5000/books. All dummy data will be returned in JSON format.


 For Mac Intel computers, you may also use `conda env create -f config/web37_mac.yml` to configure environment (In replace of step 2 to 5)

 For Ubuntu 18.04 computers, you may also use `conda env create -f config/web37_linux.yml` to configure environment (In replace of step 2 to 5)

## Run client code locally

 ```
 cd .
 python -m http.server
 ```

 Then, use **Chrome** to navigate to http://localhost:8000 to view the app. If needed, click on `index.html` to start.
