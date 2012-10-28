package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

import com.google.gson.annotations.Expose;

@Entity
public class Produto extends Model {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue
  @Expose
  public Integer id;
  
  @Expose public String nome;
  @Expose public String marca;
  @Expose public Double precoCusto;
  @Expose public Double precoVenda;
  @Expose public Integer quantidade;
  @Expose public String modelo;
  
  @ManyToOne
  @JoinColumn( name = "idFornecedor", referencedColumnName = "ID" )
  @Expose(serialize=false)
  public Fornecedor fornecedor;
  
  public static Finder<Long, Produto> find = new Finder<Long, Produto>(Long.class, Produto.class);
  
  public static List<Produto> all() {
    return find.all();
  }
  
  public static Produto find(Long id) {
    return find.byId(id);
  }
  
  public static Produto create(Produto produto) {
    produto.save();
    return produto;
  }
  
  public static Produto update(Produto produto) {
    produto.update();
    return produto;
  }
  
  public static void delete(Long id) {
    find.ref(id).delete();
  }
  
}
