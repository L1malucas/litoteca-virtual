import { ValidatorFn } from "@angular/forms";

import { FormTemplateTypeEnum } from "@enums/form-template-type.enum";
import { ConstantModel } from "./constant.model";

export class FormTemplateModel {
  /**
   * @description Para campos do tipo objeto. Exemplo de utilização: 'livro.descricao'.
   * Caso o objeto livro seja um array, para pegar a descrição do primeiro elemento ficaria desta forma: 'livro.0.descricao'.
   */
  object?: string;

  /**
   * @description Nome do campo que ficará no formControlName
   */
  element?: string;

  /**
   * @description Título do campo
   */
  title?: string;

  /**
   * @description Valor inicial do campo ao iniciar um formulário
   */
  initialValue?: string | boolean | number;

  /**
   * @description Objeto de validadores do campo
   */
  validators?: ValidatorFn | ValidatorFn[];

  /**
   * @description Tamanho em largura (width) do campo.
   */
  size?: string;

  /**
   * @description Tipo do campo. Default: TEXT.
   */
  type?: FormTemplateTypeEnum;

  /**
   * @description Valores que irão popular o campo do tipo SELECT.
   */
  selectData?: ConstantModel[];

  /**
   * @description Máscara do campo
   */
  mask?: string;

  /**
   * @description Flag que mantém os caracteres especiais. Obs: Apenas para campos que utilizam ngx-mask
   */
  sendSpecialCharacters?: boolean;

  /**
   * @description Flag para desabilitar um formulário;
   */
  disabled?: boolean;

  /**
   * @description Valor do objeto que será pego no caso de itens do tipo auto complete
   */
  valuePropertyAutocomplete?: string;

  /**
   * @description Flag para indicar se é requerido para poder marcar no form com o status de obrigatório
   */
  required?: boolean;

  /**
   * @description Pipe para aplicar no campo
   */
  pipe?: string;

  /**
   * @description Função para esconder um item caso ele não exista
   * */
  hiddenItem?: boolean;
}
