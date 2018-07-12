import json

import bottle
from bottle import get, post
from bottle import abort, request

from database import Database

app = application = bottle.default_app()


@get('/')
def greetings():
    return 'Hello from Bottle !'


@get('/users/<user_id:int>')
def get_user(user_id: int):
    records = Database.get_user(user_id)

    if not records:
        response = {'message': 'no user found'}
    else:
        response = {
            'name': records[0],
            'age': records[1]
        }

    bottle.response.headers['Content-Type'] = 'application/json'
    return json.dumps(response)


@post('/users')
def add_user():
    if not request.json \
            or not all(k in request.json for k in ['name', 'age']):
        abort(400)

    Database.add_user(
        name=request.json['name'],
        age=request.json['age']
    )

    bottle.response.headers['Content-Type'] = 'application/json'
    return json.dumps({'message': 'success'})


if __name__ == '__main__':
    Database.create_all()
    bottle.run(port=8080)
