import java.sql.*;

import org.json.*;


class Database {
    private static final String DB_NAME = "data.db";

    static void addUser(String userName, int userAge) {
        Connection c;
        Statement stmt;

        // sanitize name
        userName = userName.replaceAll("[^\\w]", "");

        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            stmt = c.createStatement();
            stmt.executeUpdate("insert into USER (name, age) " +
                    "values ('" + userName + "', " + userAge + ");");

            stmt.close();
            c.close();
        } catch (ClassNotFoundException | SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(1);
        }
    }

    static void createAll() {
        Connection c;

        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            Statement stmt = c.createStatement();
            stmt.executeUpdate("drop table if exists USER");
            stmt.executeUpdate(
                    "create table USER (" +
                            "id   integer  primary key autoincrement," +
                            "name text     not null," +
                            "age  int      not null)"
            );

            stmt.close();
            c.close();
        } catch (SQLException | ClassNotFoundException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(1);
        }
    }

    static JSONObject getUser(int userID) {
        Connection c;
        ResultSet rs;
        Statement stmt;

        JSONObject json = new JSONObject();

        try {
            Class.forName("org.sqlite.JDBC");
            c = DriverManager.getConnection("jdbc:sqlite:" + DB_NAME);

            stmt = c.createStatement();
            rs = stmt.executeQuery("select age, name from user where id = " + userID + ";" );

            while (rs.next()) {
                json.put("name", rs.getString("name"));
                json.put("age", rs.getInt("age"));
            }

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
