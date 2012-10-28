package controllers;

import java.util.List;

import models.Cliente;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import views.html.index;

import com.google.gson.Gson;

public class Application extends Controller {
  
  private static Gson gson = new Gson();
  
  public static Result index() {
    return ok(index.render("Your new application is ready."));
  }
  
  public static Result clientes() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Cliente>>(Cliente.all());
    return ok(gson.toJson(returnTO));
  }
  
  public static Result novoCliente() {
    RequestBody body = request().body();
    Cliente.create( gson.fromJson(body.asJson().toString(), Cliente.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(gson.toJson(returnTO));
  }
  
  public static Result produtos() {
    return TODO;
  }
  
  public static Result fornecedores() {
    return TODO;
  }
  
  public static Result vendas() {
    return TODO;
  }
  
}