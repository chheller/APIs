import sqlite3
from typing import Tuple

"""Basic database handler

This class implements basic functionnalities for the API:
    - database initialization
    - user creation
    - user suppression

.. _Google Python Style Guide:
   http://google.github.io/styleguide/pyguide.html

"""

class Database:
    DB_NAME: str = 'data.db'
    """str: database name.

    Can be ``:memory`` if user doesn't want to store his records.
    """

    @staticmethod
    def add_user(name: str, age: int) -> None:
        """Add a new user into the database

        Given a username and the age of the new user, create
        a new record in the database.
     
        Args:
            name (str): username of the new user
            age  (int): age of the new user
        """
        # establish the connection with the database
        db = sqlite3.connect(Database.DB_NAME)
        c = db.cursor()

        try:
            # create a new record
            c.execute(
                'insert into USER(name, age) values (?, ?)',
                (name, age)
            )
        except sqlite3.IntegrityError as e:
            exit(e)

        db.commit()

        # end connection
        c.close()
        db.close()

    @staticmethod
    def create_all() -> None:
        db = sqlite3.connect(
            Database.DB_NAME,
            detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES,
            check_same_thread=False
        )
        """Initialize the database

        Drop all records and the user table, then recreate it
        """
        db.isolation_level = None
        
        # establish connection with the database
        c = db.cursor()
        try:
            # drop existing records and table
            c.execute('drop table if exists USER')
            # create the new table
            c.execute('''
                create table USER (
                    id    integer  primary key autoincrement,
                    name  text     not null,
                    age   int      not null
                )
            ''')
        except sqlite3.IntegrityError as e:
            exit(e)

        db.commit()

        # end connection
        c.close()
        db.close()

    @staticmethod
    def get_user(user_id: int) -> Tuple[str, int]:
        """Get user's info from his ID

        Args:
            user_id (int): id of the user
        
        Returns:
            Tuple[str, int]: user's information as ``(name, age)``
        """
        db = sqlite3.connect(Database.DB_NAME)
        c = db.cursor()
        c.execute(
            'SELECT name, age FROM USER WHERE id LIKE ?',
            (user_id,)
        )

        ret = c.fetchone()

        c.close()
        db.close()

        return ret
