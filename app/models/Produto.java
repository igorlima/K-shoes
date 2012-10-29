package models;

import java.util.List;

import javax.persistence.Column;
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
  public Long id;
  
  @Expose
  @Column(name="precoCusto")
  public Double precoCusto;
  
  @Expose 
  @Column(name="precoVenda")
  public Double precoVenda;
  
  @Expose public String nome;
  @Expose public String marca;
  @Expose public Long quantidade;
  @Expose public String modelo;
  
  @ManyToOne
  @JoinColumn( name = "idFornecedor", referencedColumnName = "ID" )
  @Expose
  public Fornecedor fornecedor;
  
  public static Finder<Long, Produto> find = new Finder<Long, Produto>(Long.class, Produto.class);
  
  public static List<Produto> all() {
    List<Produto> produtos = find.all();
    for (Produto produto:produtos) produto.fornecedor.refresh();
    return produtos;
  }
  
  public static Produto find(Long id) {
    Produto produto = find.byId(id);
    produto.fornecedor.refresh();
    return produto;
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
