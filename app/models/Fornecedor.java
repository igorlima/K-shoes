package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import play.db.ebean.Model;

@Entity
public class Fornecedor extends Model {

  private static final long serialVersionUID = 1L;

  @Id
	@GeneratedValue
	public Integer id;
	
	public String nome;
	
	public Integer cnpj;
	
	public String cidade;
	
	public String endereco;
	
	public String telefone;
	
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
