package controllers;

import java.util.List;

import models.Produto;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class ProdutoController extends Controller {
  
  public static Result all() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Produto>>(Produto.all());
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result findById(Long id) {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<Produto>(Produto.find(id));
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result delete(Long id) {
    Produto.delete(id);
    return ok(Deserializer.GSON.toJson(new MessageReturnTO()));
  }
  
  public static Result create() {
    RequestBody body = request().body();
    Produto.create( Deserializer.GSON.fromJson(body.asJson().toString(), Produto.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result update() {
    RequestBody body = request().body();
    Produto.update( Deserializer.GSON.fromJson(body.asJson().toString(), Produto.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
}
