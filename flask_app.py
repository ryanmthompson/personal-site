from flask import Flask, render_template, url_for, session, redirect, g, make_response, request, jsonify
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
import bcrypt

#uri = 'mongodb://admin:admin@ds155160.mlab.com:55160/sandbox'
#client = pymongo.MongoClient(uri)
#db = client.get_default_database()
#db = client.sandbox
#collection = db.users

#songs = db['songs']
#query = {'song': 'One Sweet Day'}
#songs.update(query, {'$set': {'artist': 'Mariah Carey ft. Boyz II Men'}})
#cursor = songs.find({'weeksAtOne': {'$gte': 10}}).sort('decade', 1)

#for doc in cursor:
#    print ('In the %s, %s by %s topped the charts for %d straight weeks.' %
#       (doc['decade'], doc['song'], doc['artist'], doc['weeksAtOne']))

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'sandbox'
app.config['MONGO_URI'] = 'mongodb://admin:admin@ds155160.mlab.com:55160/sandbox'
app.config['SECRET_KEY'] = 'secret'

socketio = SocketIO(app)
mongo = PyMongo(app)

sessions = []

@app.before_request
def before_request():
    g.user = None
    if 'user' in session:
        g.user = session['user']

@app.route('/')
def index():
    if 'user' in session:
        #return 'You are logged in as ' + session['username']
        return render_template('home.html')

    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'name' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
            session['user'] = request.form['username']
            return redirect(url_for('index'))

    return 'Invalid username/password combination'

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['user'] = request.form['username']
            return redirect(url_for('index'))

        return 'That username already exists!'

    return render_template('register.html')

@app.route('/get_session')
def get_session():
    if 'user' in session:
        return session['user']

    return 'Not logged in!'

@app.route('/drop_session')
def drop_session():
    session.pop('user', None)
    return 'Dropped!'

@app.route("/set_cookie")
def set_cookie():
    resp = make_response('Setting cookie!')
    resp.set_cookie('framework', 'flask')
    resp.set_cookie('session_id', bcrypt.hashpw('flask', bcrypt.gensalt()))
    return resp

@app.route("/get_cookies")
def get_cookies():
    cookies = str(request.cookies)#.get('session_id')
    resp = make_response(jsonify(cookies))
    return resp

@app.route("/get_sessions")
def get_sessions():
    resp = make_response(jsonify(str(session)))
    return resp

@app.route("/get_config")
def get_config():
    config = str(app.config)
    resp = make_response(jsonify(config))
    return resp

@app.route('/home')
def home():
    if g.user:
        return render_template('home.html')

    return redirect(url_for('index'))

@app.route('/map')
def map():
    if g.user:
        return render_template('cesium.html')

    return redirect(url_for('index'))

@app.route('/trombone')
def trombone():
    if g.user:
        return render_template('trombone.html')

    return redirect(url_for('index'))

if __name__ == '__main__':
    # Start app
    app.run(debug=True)


