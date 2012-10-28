package models.to;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.annotations.Expose;

public class MessageReturnTO extends ReturnTO {

  private static final long serialVersionUID = 1L;

  public static final String DEFAULT_ERROR_MESSAGE = "A operação não pode ser executada, verifique sua conexão e tente novamente.";
  public static final String DEFAULT_SUCCESS_MESSAGE = "A operação foi executada com sucesso.";

  @Expose private String message;
  @Expose protected List<String> additionalInformation;

  /**
   * Construtor padrão. Inicializa o objeto com status =
   * {@link Status#SUCCESS} e mensagem de sucesso padrão =
   * {@value #DEFAULT_SUCCESS_MESSAGE}.
   */
  public MessageReturnTO() {

    super(Status.SUCCESS);

    this.message = DEFAULT_SUCCESS_MESSAGE;

  }

  /**
   * <p>Construtor alternativo que inicializará o objeto com o status fornecido
   * como parâmetro e a respectiva mensagem padrao.</p>
   * 
   * <pre>* status:{@value Status#SUCCESS} - mensagem padrão:
   * {@value #DEFAULT_SUCCESS_MESSAGE};</pre>
   * <pre>* status:{@value Status#ERROR} -
   * mensagem padrão: {@value #DEFAULT_ERROR_MESSAGE};</pre>
   * 
   * @param status
   *            {@link Status} a ser utilizado para inicialização do objeto.
   */
  public MessageReturnTO(Status status) {

    super(status);

    if (getStatus().equals(Status.ERROR)) {

      this.message = DEFAULT_ERROR_MESSAGE;

    } else if (getStatus().equals(Status.SUCCESS)) {

      this.message = DEFAULT_SUCCESS_MESSAGE;

    }

  }

  /**
   * Construtor alternativo que inicializará o objeto com o status e mensagem
   * fornecidos.
   * 
   * @param status
   *      {@link Status} a ser utilizado para inicialização do objeto.
   * @param message
   *      {@link String} de mensagem a ser utilizado para inicialização do objeto.
   */
  public MessageReturnTO(Status status, String message) {

    super(status);

    this.message = message;

  }

  /**
   * Método que retorna a mensagem.
   * 
   * @return A mensagem.
   */
  public String getMessage() {
    return message;
  }

  /**
   * Método que retorna a lista de informações complementares.
   * 
   * @return {@link List}a de informacões complementares.
   */
  public List<String> getAdditionalInformation() {
    return additionalInformation;
  }

  /**
   * Método que adiciona uma informacao complementar ao retorno.
   * 
   * @param additionalInformation
   *      Informação complementar.
   */
  public void addAdditionalInformation(String additionalInformation) {

    if (this.additionalInformation == null)
      this.additionalInformation = new ArrayList<String>();

    this.additionalInformation.add(additionalInformation);

  }

}
