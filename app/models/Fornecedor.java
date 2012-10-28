package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.google.gson.annotations.Expose;

import play.db.ebean.Model;

@Entity
public class Fornecedor extends Model {

  private static final long serialVersionUID = 1L;

  @Id
	@GeneratedValue
	@Expose
	public Integer id;
	
  @Expose public String nome;
  @Expose public Integer cnpj;
  @Expose public String cidade;
  @Expose public String endereco;
  @Expose public String telefone;
	
	public static Finder<Long, Fornecedor> find = new Finder<Long, Fornecedor>(Long.class, Fornecedor.class);
  
  public static List<Fornecedor> all() {
    return find.all();
  }
  
  public static Fornecedor find(Long id) {
    return find.byId(id);
  }
  
  public static Fornecedor create(Fornecedor fornecedor) {
    fornecedor.save();
    return fornecedor;
  }
  
  public static Fornecedor update(Fornecedor fornecedor) {
    fornecedor.update();
    return fornecedor;
  }
  
  public static void delete(Long id) {
    find.ref(id).delete();
  }
  
}
