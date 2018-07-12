import io.vertx.core.Vertx;

/**
 * Verticle starter
 * 
 * @version 0.1
 */
public class VertxVerticleMain {

    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new Verticle());
    }

}