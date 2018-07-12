import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

public class Verticle extends AbstractVerticle {
    @Override
    public void start(Future<Void> fut) {
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        router.route("/").handler(this::grettings);
        router.route("/users/:id").handler(this::getUser);
        router.post("/users").handler(this::addUser);

        // Create the HTTP server and pass the "accept" method to the request handler.
        vertx
                .createHttpServer()
                .requestHandler(router::accept)
                .listen(
                        // Retrieve the port from the configuration,
                        // default to 8080.
                        config().getInteger("http.port", 8080),
                        result -> {
                            if (result.succeeded()) {
                                fut.complete();
                            } else {
                                fut.fail(result.cause());
                            }
                        }
                );
    }

    private void addUser(RoutingContext routingContext) {
        JsonObject payload = routingContext.getBodyAsJson();

        Database.addUser(
                payload.getString("name"),
                payload.getInteger("age")
        );

        routingContext.response()
                .setStatusCode(201)
                .putHeader("content-type", "text/plain")
                .end("Success");
    }

    private void getUser(RoutingContext routingContext) {
        String id = routingContext.request().getParam("id");

        if (id == null) {
            routingContext.response().setStatusCode(400).end();
        } else {
            routingContext.response()
                    .putHeader("content-type", "application/json; charset=utf-8")
                    .end(Database.getUser(Integer.valueOf(id)).toString());
        }
    }

    private void grettings(RoutingContext routingContext) {
        HttpServerResponse response = routingContext.response();
        response
                .putHeader("content-type", "text/plain")
                .end("Hello from Vert.x !");
    }

}
