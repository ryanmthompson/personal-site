__author__ = 'rthompson'
import flask
import jsonpickle
import logging
import os
import sys
from flask import redirect
from flask.ext.triangle import Triangle
from flask_socketio import SocketIO, send, emit

sys.setrecursionlimit(10000)

# Create Flask application
app = flask.Flask(__name__)

# Configure app settings
app.config['DEBUG'] = False

# Create dummy secret key so we can use sessions
app.config['SECRET_KEY'] = 'gqudmds79vw1mrbvrmhua0l8krz4lhkj'
Triangle(app)
socketio = SocketIO(app)

logging.basicConfig(filename='static/order66.log.txt',level=logging.DEBUG)

def create_or_update(data):
    logging.info(data)
    print data

def emit_data():
    socketio.emit('message', {'data': 'This function was initiated from the server after a client message'}, broadcast=True)

# Flask views
@app.route('/')
def map():
    return flask.render_template('index.html')

@app.route('/set-cookie')
def cookie_insertion():
    redirect_to_index = redirect('/')
    response = app.make_response(redirect_to_index )
    response.set_cookie('csrftoken',value='X4Uu9aWr6704SBkcogMdEAPELVi1dxCK')
    response.set_cookie('sessionid',value='gqudmds79vw1mrbvrmhua0l8krz4lhkj')
    return response

@socketio.on('connect')
def test_connect():
    print 'Client connected'

@socketio.on('cookie')
def handle_message(cookie):
    print 'received cookie: ' + str(cookie)
    create_or_update(jsonpickle.decode(cookie['data']))
#    emit('event', {'data': 'Server event'}, broadcast=True)


@socketio.on('message')
def handle_message(message):
    logging.info(message)
    print 'received message: ' + str(message)
    emit('message', {'data': 'Server event'}, broadcast=True)

@socketio.on('cone')
def jamCone(data):
    logging.info(data)
    print 'received cone: ' + str(data)
    emit('cone', {'data': data['data']}, broadcast=True)

@socketio.on('haas')
def jamHaas(data):
    logging.info(data)
    print 'received haas: ' + str(data)
    emit('haas', {'data': data['data']}, broadcast=True)

@socketio.on('mike')
def handle_message(data):
    logging.info(data)
    print 'received mike: ' + str(data)
    emit('mike', {'data': data['data']}, broadcast=True)

@socketio.on('scott')
def handle_message(data):
    logging.info(data)
    print 'received scott: ' + str(data)
    emit('scott', {'data': data['data']}, broadcast=True)

@socketio.on('patrick')
def handle_message(data):
    logging.info(data)
    print 'received patrick: ' + str(data)
    emit('patrick', {'data': data['data']}, broadcast=True)

@socketio.on('steve')
def handle_message(data):
    logging.info(data)
    print 'received steve: ' + str(data)
    emit('steve', {'data': data['data']}, broadcast=True)

@socketio.on('jammer')
def handle_message(data):
    logging.info(data)
    print 'received jammer: ' + str(data)
    emit('jammer', {'data': 'Server event'}, broadcast=True)

@socketio.on('hijackTorpedo')
def handle_message(data):
    logging.info(data)
    print 'received hijackTorpedo: ' + str(data)
    emit('hijackTorpedo', {'data': jsonpickle.decode(data['data'])}, broadcast=True)

@socketio.on('hijackShell')
def handle_message(data):
    logging.info(data)
    print 'received hijackShell: ' + str(data)
    emit('hijackShell', {'data': jsonpickle.decode(data['data'])}, broadcast=True)

@socketio.on('hijackBomber')
def handle_message(data):
    logging.info(data)
    print 'received hijackBomber: ' + str(data)
    emit('hijackBomber', {'data': jsonpickle.decode(data['data'])}, broadcast=True)

@socketio.on('hijackReveal')
def handle_message(data):
    logging.info(data)
    print 'received hijackReveal: ' + str(data)
    emit('hijackReveal', {'data': jsonpickle.decode(data['data'])}, broadcast=True)

@socketio.on('ships')
def handle_message(data):
    logging.info(data)
    print 'received ships: ' + jsonpickle.decode(data['data'])
    emit('ships', {'data': data['data']}, broadcast=True)

@socketio.on('rfi')
def handle_message(data):
    logging.info(data)
    print 'received rfi:'
    emit('intel', {'data': 'intel'}, broadcast=True)

@socketio.on('intel')
def handle_message(data):
    logging.info(data)
    print jsonpickle.decode(data['data'])
    #    print 'received intel: ' + jsonpickle.decode(data['data'])
    emit('intelReport', {'data': data['data']}, broadcast=True)

@socketio.on('refresh')
def handle_message(data):
    logging.info(data)
    print 'received refresh:'
    emit('refresh', {'data': ''}, broadcast=True)

@socketio.on('disconnect')
def test_disconnect():
    print 'Client disconnected'
    emit('disconnect', {'data': 'Client disconnected'})

if __name__ == '__main__':
    app_dir = os.path.realpath(os.path.dirname(__file__))
    socketio.run(app, host='0.0.0.0', port=5066)