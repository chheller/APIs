import java.sql.*;

import org.json.*;

/**
 * Basic database handler
 * 
 * This class implements basic functionnalities for the API:
 * - database initialization
 * - user creation
 * - user suppression
 * 
 * @version 0.1
 */
class Database {
    /**
     * Default database name
     */
    private static final String DB_NAME = "data.db";

    /**
     * Given a username and the age of the new user, create
     * a new record in the database.
     * 
     * @param  userName username of the new user
     * @param  userAge age of the new user
     */
    static void addUser(String userName, int userAge) {
        Connection c;
        Statement stmt;

        // sanitize name
        userName = userName.replaceAll("[^\\w]", "");

        try {
            // establish connection with the database
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            // create a new record
            stmt = c.createStatement();
            stmt.executeUpdate("insert into USER (name, age) " +
                    "values ('" + userName + "', " + userAge + ");");

            // end connection
            stmt.close();
            c.close();
        } catch (ClassNotFoundException | SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(1);
        }
    }

    /**
     * Initialize the database
     * 
     * Drop all records and the user table, then recreate it
     */
    static void createAll() {
        Connection c;

        try {
            // establish connection with the database 
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            Statement stmt = c.createStatement();
            // drop existing records and table
            stmt.executeUpdate("drop table if exists USER");
            // create the new table
            stmt.executeUpdate(
                    "create table USER (" +
                            "id   integer  primary key autoincrement," +
                            "name text     not null," +
                            "age  int      not null)"
            );

            // end connection
            stmt.close();
            c.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(1);
        }
    }

    /**
     * Get user's info from his ID
     * 
     * @param   userID id of the user
     * @return  results in a JSON object with "name" and "age"
     *          as keys
     */
    static JSONObject getUser(int userID) {
        Connection c;
        ResultSet rs;
        Statement stmt;

        JSONObject json = new JSONObject();

        try {
            // establish connection with the database
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            // query user's information
            stmt = c.createStatement();
            rs = stmt.executeQuery("select age, name from user where id = " + userID + ";" );

            // updating JSON from results
            while (rs.next()) {
                json.put("name", rs.getString("name"));
                json.put("age", rs.getInt("age"));
            }

            // end connection
            rs.close();
            stmt.close();
            c.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(1);
        }

        return json;
    }
}
