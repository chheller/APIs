import flask
from flask import Flask, abort, jsonify, request

from database import Database

app = Flask(__name__)


@app.route('/')
def greetings():
    return 'Hello from Flask !'


@app.route('/users/<user_id>')
def get_user(user_id: int):
    records = Database.get_user(user_id)

    if not records:
        response = {'message': 'no user found'}
    else:
        response = {
            'name': records[0],
            'age': records[1]
        }

    return flask.jsonify(response)


@app.route('/users', methods=['POST'])
def add_user():
    if not request.json \
            or not all(k in request.json for k in ['name', 'age']):
        abort(400)

    Database.add_user(
        name=request.json['name'],
        age=request.json['age']
    )

    return flask.jsonify({'message': 'success'})


if __name__ == '__main__':
    Database.create_all()
    app.run(port=8080)
