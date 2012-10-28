package controllers;

import java.util.List;

import models.Fornecedor;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class FornecedorController extends Controller {
  
  public static Result all() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Fornecedor>>(Fornecedor.all());
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result findById(Long id) {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<Fornecedor>(Fornecedor.find(id));
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result delete(Long id) {
    Fornecedor.delete(id);
    return ok(Deserializer.GSON.toJson(new MessageReturnTO()));
  }
  
  public static Result create() {
    RequestBody body = request().body();
    Fornecedor.create( Deserializer.GSON.fromJson(body.asJson().toString(), Fornecedor.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result update() {
    RequestBody body = request().body();
    Fornecedor.update( Deserializer.GSON.fromJson(body.asJson().toString(), Fornecedor.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
}
