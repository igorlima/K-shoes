package controllers;

import java.lang.reflect.Modifier;
import java.util.HashSet;
import java.util.Set;

import play.mvc.Controller;
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
  
}


class Deserializer {
  protected static Gson GSON = new GsonBuilder()
  .excludeFieldsWithModifiers(Modifier.STATIC)
  .setExclusionStrategies(new ExclusionStrategy() {
    @Override public boolean shouldSkipField(FieldAttributes arg0) {
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
    
    @Override public boolean shouldSkipClass(Class<?> arg0) {
        return false;
    }
  })
  .create();
}
