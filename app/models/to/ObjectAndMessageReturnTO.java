package models.to;

import com.google.gson.annotations.Expose;

public class ObjectAndMessageReturnTO<T> extends ReturnTO {

  private static final long serialVersionUID = 1L;

  public static final String DEFAULT_SUCCESS_MESSAGE = "A operação foi executada com sucesso.";

  @Expose private T returnObject;
  @Expose private String message;

  /**
   * Construtor que inicializa o objeto de retorno com o objeto a ser
   * retornado em seu interior, recebido como parâmetro e com mensagem de
   * sucesso padrão = "{@value #DEFAULT_SUCCESS_MESSAGE}".
   * 
   * @param returnObject
   *            Objeto a ser transportado pelo objeto de retorno.
   */
  public ObjectAndMessageReturnTO(T returnObject) {

    super(Status.SUCCESS);

    this.returnObject = returnObject;
    this.message = DEFAULT_SUCCESS_MESSAGE;

  }

  /**
   * Construtor alternativo que inicializa o objeto de retorno com o objeto a
   * ser retornado em seu interior e com mensagem de sucesso, ambos recebidos
   * como parâmetro.
   * 
   * @param returnObject
   *            Objeto a ser transportado pelo objeto de retorno.
   * @param message
   *            {@link String} de mensagem de sucesso a ser utilizado para
   *            inicialização do objeto.
   */
  public ObjectAndMessageReturnTO(T returnObject, String message) {

    super(Status.SUCCESS);

    this.returnObject = returnObject;
    this.message = message;

  }

  /**
   * Método que retorna o objeto a ser transportado dentro do objeto de
   * retorno.
   * 
   * @return Objeto a ser transportado.
   */
  public T getReturnObject() {
    return returnObject;
  }

  /**
   * Método que retorna a mensagem.
   * 
   * @return A mensagem.
   */
  public String getMessage() {
    return message;
  }

}
