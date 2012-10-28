package controllers;

import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import models.Cliente;
import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import views.html.index;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Application extends Controller {
  
  public static Result index() {
    return ok(index.render("Your new application is ready."));
  }
  
  public static Result clientes() {
    ReturnTO returnTO = new ObjectAndMessageReturnTO<List<Cliente>>(Cliente.all());
    return ok(Deserializer.GSON.toJson(returnTO));
  }
  
  public static Result novoCliente() {
    RequestBody body = request().body();
    Cliente.create( Deserializer.GSON.fromJson(body.asJson().toString(), Cliente.class) );
    ReturnTO returnTO = new MessageReturnTO();
    return ok(Deserializer.GSON.toJson(returnTO));
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


class Deserializer {
  protected static Gson GSON = new GsonBuilder()
  .setExclusionStrategies(new ExclusionStrategy() {
    
    @Override
    public boolean shouldSkipField(FieldAttributes arg0) {
      Set<String> ignores = new HashSet<String>();
      ignores.add("beanCollectionTouched");
      ignores.add("ebeanServerName");
      ignores.add("fetchFuture");
      ignores.add("filterMany");
      ignores.add("finishedFetch");
      ignores.add("hasMoreRows");
      ignores.add("loader");
      ignores.add("loaderIndex");
      ignores.add("modifyAddListening");
      ignores.add("modifyAddHolder");
      ignores.add("modifyListening");
      ignores.add("modifyListenMode");
      ignores.add("modifyRemoveListening");
      ignores.add("ownerBean");
      ignores.add("propertyName");
      ignores.add("state");
      ignores.add("_ebean_identity");
      ignores.add("_ebean_intercept");
      ignores.add("_idGetSet");
      
      if (ignores.contains(arg0.getName()))
        return true;
      else
        return false;
    }
    
    @Override
    public boolean shouldSkipClass(Class<?> arg0) {
        return false;
    }
  })
  .excludeFieldsWithModifiers(Modifier.STATIC).create();
}
