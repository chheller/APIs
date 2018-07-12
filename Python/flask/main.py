import flask
from flask import Flask, abort, jsonify, request

from database import Database

# initializing flask application
app = Flask(__name__)


@app.route('/')
def greetings():
    """basic entrypoint

    Basic app's entrypoint. Greets the user with its framework
    """
    return 'Hello from Flask !'


@app.route('/users/<user_id>')
def get_user(user_id: int):
    """show user's information

    Given an ID, retrieve user's information

    Args:
        user_id (int): the id of the user we are
            looking for in the database

    Returns:
        JSON: the user's information with ``name `` and ``age``
            as keys.
    """
    # retrieving records
    records = Database.get_user(user_id)

    # establish response given ``records`` state
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
    """add a user to the database

    From a JSON payload, create a new record in the database
    Payload should provide relevant information, which are:
        - name as a string
        - age as an integer

    Returns:
        JSON: ``{'message': 'success'}`` on success
    """
    # ensure that the request is correct and contains relevant keys
    if not request.json \
            or not all(k in request.json for k in ['name', 'age']):
        abort(400)

    # create the new record
    Database.add_user(
        name=request.json['name'],
        age=request.json['age']
    )

    return flask.jsonify({'message': 'success'})


if __name__ == '__main__':
    # create the database
    Database.create_all()

    # launch the app on port 8080
    app.run(port=8080)
