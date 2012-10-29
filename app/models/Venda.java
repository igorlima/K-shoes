package models;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import models.to.MessageReturnTO;
import models.to.ObjectAndMessageReturnTO;
import models.to.ReturnTO;
import play.db.ebean.Model;

import com.google.gson.annotations.Expose;

@Entity
public class Venda extends Model {

  private static final long serialVersionUID = 1L;

  @Id
  @Expose
  @GeneratedValue(strategy = GenerationType.IDENTITY)
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
  @ManyToMany( fetch = FetchType.EAGER, cascade={CascadeType.PERSIST,CascadeType.MERGE} )
  @JoinTable( name = "produtos_vendas", joinColumns = { @JoinColumn( name = "idProduto", referencedColumnName = "id" ) }, inverseJoinColumns = { @JoinColumn( name = "idVenda", referencedColumnName = "id" ) } )
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
  
  public static ReturnTO create(Venda venda) {
    venda.dataVenda = new Date();
    
    Map<Long,Long> quantidadeProdutos = contarProdutos(venda);
    Set<Produto> produtos = new HashSet<Produto>();
    for (Long idProduto : quantidadeProdutos.keySet()) {
      Produto produto = Produto.find(idProduto);
      produtos.add(produto);
      produto.quantidade -= quantidadeProdutos.get(idProduto);
      if (produto.quantidade<0)
        return new MessageReturnTO(ReturnTO.Status.ERROR, "Produto " + produto.nome + " esgotado.");
    }
    for (Produto produto : produtos) produto.save();
    
    venda.save();
    return new ObjectAndMessageReturnTO<Venda>(venda);
  }
  
  public static void delete(Long id) {
    Venda venda = find.ref(id);
    
    Map<Long,Long> quantidadeProdutos = contarProdutos(venda);
    for (Long idProduto : quantidadeProdutos.keySet()) {
      Produto produto = Produto.find(idProduto);
      produto.quantidade += quantidadeProdutos.get(idProduto);
      produto.save();
    }
    
    venda.delete();
  }
  
  private static Map<Long, Long> contarProdutos(Venda venda) {
    Map<Long,Long> quantidadeProdutos = new HashMap<Long, Long>();
    for (Produto produto : venda.produtos) {
      produto.refresh();
      Long qte = quantidadeProdutos.get(produto.id);
      if (qte==null) quantidadeProdutos.put(produto.id, 1L);
      else quantidadeProdutos.put(produto.id, ++qte);
    }
    return quantidadeProdutos;
  }
  
}
