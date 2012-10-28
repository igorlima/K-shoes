package controllers;

import java.util.List;

import models.Cliente;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class ClienteController extends Controller {
  
  public static Result all() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Cliente>>(Cliente.all());
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result findById(Long id) {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<Cliente>(Cliente.find(id));
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result novoCliente() {
    RequestBody body = request().body();
    Cliente.create( Deserializer.GSON.fromJson(body.asJson().toString(), Cliente.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
}
