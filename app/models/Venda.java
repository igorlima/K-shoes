package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import play.db.ebean.Model;

import com.google.gson.annotations.Expose;

@Entity
public class Venda extends Model {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue
  @Expose
  public Integer id;
  
  @Expose
  @Column(name="dataVenda")
  public Date dataVenda;
  
  @Expose
  public Double valor;
  
  @Expose
  @Column(name="formaPagamento")
  public String formaPagamento;
  
  @Expose
  @ManyToMany( fetch = FetchType.EAGER )
  @JoinTable( name = "ProdutosVendas", joinColumns = { @JoinColumn( name = "idVenda", referencedColumnName = "ID" ) }, inverseJoinColumns = { @JoinColumn( name = "idProduto", referencedColumnName = "id" ) } )
  public List<Produto> produtos;
  
  @Expose
  @ManyToOne
  @JoinColumn( name = "idCliente", referencedColumnName = "id" )
  public Cliente cliente;
  
  public static Finder<Long, Venda> find = new Finder<Long, Venda>(Long.class, Venda.class);
  
  public static List<Venda> all() {
    List<Venda> vendas = find.all();
    for (Venda venda:vendas) {
      venda.cliente.refresh();
      for (Produto produto:venda.produtos) produto.refresh();
    }
    return vendas;
  }
  
  public static Venda find(Long id) {
    Venda venda = find.byId(id);
    venda.cliente.refresh();
    for (Produto produto:venda.produtos) produto.refresh();
    return venda;
  }
  
  public static Venda create(Venda venda) {
    venda.save();
    return venda;
  }
  
  public static Venda update(Venda venda) {
    venda.update();
    return venda;
  }
  
  public static void delete(Long id) {
    find.ref(id).delete();
  }
}
