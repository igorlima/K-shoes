package models.to;

import java.io.Serializable;

import com.google.gson.annotations.Expose;

public abstract class ReturnTO implements Serializable {

  private static final long serialVersionUID = 1L;

  /**
   * Enumerador que contém os possíveis status de resultados de uma
   * solicitacao.
   * 
   * @author diego
   * 
   */
  public static enum Status {

    /**
     * SUCCESS
     */
    ERROR,

    /**
     * ERROR
     */
    SUCCESS;

  }

  private static final Status DEFAULT_STATUS = Status.SUCCESS;

  @Expose private Status status;

  /**
   * Construtor padrão. Inicializa o objeto com o status padrão =
   * {@value #DEFAULT_STATUS}.
   */
  public ReturnTO() {

    super();

    this.status = DEFAULT_STATUS;

  }

  /**
   * Construtor aternativo que recebe como parâmetro o status com o qual o
   * objeto de retorno deve ser inicializado.
   * 
   * @param status
   *            {@link Status} do retorno a ser inicializado no objeto.
   */
  public ReturnTO( Status status ) {

    super();

    this.status = status;

  }

  /**
   * Método que recupera o status do retorno.
   * 
   * @return O {@link Status} do retorno.
   */
  public Status getStatus() {
    return status;
  }

  public Boolean isSuccessful() {
    return status.equals( Status.SUCCESS );
  }
  
}