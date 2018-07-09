import sqlite3
from typing import Tuple


class Database:
    DB_NAME = 'data.db'

    @staticmethod
    def add_user(name: str, age: int) -> None:
        db = sqlite3.connect(Database.DB_NAME)
        c = db.cursor()

        try:
            c.execute(
                'insert into USER(name, age) values (?, ?)',
                (name, age)
            )
        except sqlite3.IntegrityError as e:
            exit(e)
        
        db.commit()
        
        c.close()
        db.close()

    @staticmethod
    def create_all() -> None:
        db = sqlite3.connect(
            Database.DB_NAME,
            detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES,
            check_same_thread=False
        )
        db.isolation_level = None

        c = db.cursor()
        try:
            c.execute('drop table if exists USER')
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

        c.close()
        db.close()

    @staticmethod
    def get_user(user_id: int) -> Tuple[str, int]:
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
