import org.json.JSONObject;
import spark.Request;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        Database.createAll();
        Database.addUser("John", 20);

        exception(Exception.class, (e, req, res) -> e.printStackTrace());
        port(8080);

        get("/",            (req, res)  -> greetings(req));
        get("/users/:id",   (req, res)  -> getUser(req));

        post("/users",      (req, res)  ->  addUser(req));
    }

    private static Object addUser(Request req) {
        JSONObject payload = new JSONObject(req.body());

        Database.addUser(
                (String) payload.get("name"),
                (int) payload.get("age")
        );
        return "Success";
    }

    private static Object getUser(Request req) {
        int id = Integer.parseInt(req.params("id"));

        req.headers("content-type: application/json");
        return Database.getUser(id);
    }

    private static Object greetings(Request req) {
        return "Hello from Spark !";
    }
}
