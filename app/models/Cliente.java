package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import play.db.ebean.Model;

@Entity
public class Cliente extends Model {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;
	
	public String nome;
	
	public Long cpf;
	
	public String cidade;
	
	public String endereco;
	
  public static Finder<Long, Cliente> find = new Finder<Long, Cliente>(Long.class, Cliente.class);
	
	public static List<Cliente> all() {
		return find.all();
	}
	
	public static Cliente create(Cliente cliente) {
	  cliente.save();
	  return cliente;
	}
	
	public static void delete(Long id) {
	  find.ref(id).delete();
	}
	
}
