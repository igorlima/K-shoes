package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import play.db.ebean.Model;

import com.google.gson.annotations.Expose;

@Entity
public class Cliente extends Model {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Expose
  public Long id;
	
  @Expose public String nome;
  @Expose public Long cpf;
  @Expose public String cidade;
  @Expose public String endereco;
  
  public static Finder<Long, Cliente> find = new Finder<Long, Cliente>(Long.class, Cliente.class);
	
	public static List<Cliente> all() {
		return find.all();
	}
	
	public static Cliente find(Long id) {
	  return find.byId(id);
	}
	
	public static Cliente create(Cliente cliente) {
	  cliente.save();
	  return cliente;
	}
	
	public static Cliente update(Cliente cliente) {
	  cliente.update();
	  return cliente;
	}
	
	public static void delete(Long id) {
	  find.ref(id).delete();
	}
	
}
