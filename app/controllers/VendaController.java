package controllers;

import java.util.List;

import models.Venda;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class VendaController extends Controller {
  
  public static Result all() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Venda>>(Venda.all());
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result findById(Long id) {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<Venda>(Venda.find(id));
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result delete(Long id) {
    Venda.delete(id);
    return ok(Deserializer.GSON.toJson(new MessageReturnTO()));
  }
  
  public static Result create() {
    RequestBody body = request().body();
    ReturnTO returnTO = Venda.create( Deserializer.GSON.fromJson(body.asJson().toString(), Venda.class) );
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
}
