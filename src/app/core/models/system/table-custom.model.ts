import {
  TableColumnTypeEnum,
  TablePipesTypeEnum,
  TableButtonsEnum,
} from "@enums/table-custom.enum";

export class TableCustom {
  /**
   * @description Nome da classe que será aplicada à div externa da tabela
   */

  class?: string;

  /**
   * @description Array com o nome dos itens da coluna
   */
  columns: Array<string>;

  /**
   * @description Array com os dados que popularão a tabela
   */
  data?: Array<any>;

  /**
   * @description Informar para esconder ou ocultar o filtro.
   */
  displayFilter?: boolean;

  /**
   * @description Informar para esconder ou ocultar o filtro.
   */
  displayPaginator?: boolean;

  /**
   * @description Elemento que vai ser lido como o datasource da tabela expansiva. Deve ser um componente do elemento do array de objetos do datasource da tabela externa.
   */
  elementExpansionDataTable?: string;

  /**
   * @description passar true no caso de tabela expansiva.
   */
  expansive?: boolean;

  /**
   * @description Valores para serem exibidos quando não exister dados na tablea.
   */
  result: {
    /**
     * @description Mensagem exibida quando carrega a tela a primeira vez
     */
    defaultMessage: string;

    /**
     * @description Mensagem exibida quando realiza um filtro e não retorna valor
     */
    noData: string;
  };

  /**
   * @description Permite ordenação na tabela (apenas para a TableCustomPaginator)
   */
  orderBy?: boolean;

  /**
   * @description Tamanho inicial da tabela (default é 5)
   */
  pageSize?: number;

  /**
   * @description Nome que irá aparecer ao exportar a tabela
   */
  reportTitle?: string;

  /**
   * @description Subtitulo da tabela
   * */
  subTitle?: string;

  /**
   * @description Título da tabela
   * */
  title?: string;

  /**
   * @description Tamanho da tabela. Utilizar apenas números pares e não arredondados nas dezenas, caso não seja 100. Por exemplo, se quiser usar 80, use 82
   * */
  width?: string;

  columnData: {
    [key: string]: {
      /**
       * @description Tipo do item da coluna
       * */
      type?:
        | TableColumnTypeEnum.CHECKBOX
        | TableColumnTypeEnum.CUSTOM
        | TableColumnTypeEnum.GROUP_BUTTONS
        | TableColumnTypeEnum.OBJECT
        | TableColumnTypeEnum.SINGLE_BUTTON
        | TableColumnTypeEnum.STRING
        | TableColumnTypeEnum.VALIDATION;

      /**
       * @description Função callback para desabilitar o item da tabela (sem ser botão)
       */
      disabled?: (data: any) => any;

      /**
       * @description Valor que vai do item que vai ser lido no data table
       * */
      element?: string;

      /**
       * @description Elemento para quando precisar setar um formcontrol dentro da tabela
       * */
      elementFormControlName?: (data?: any, event?: any) => void;

      /**
       * @description Marcar quando quiser customizar o header
       */
      headerCheckbox?: boolean;

      /**
       * @description Função para quando marcar o checkbox
       */
      headerFunction?: (data?: any, event?: any) => void;

      /**
       * @description Valor para o tamanho da coluna ao exportar a tabela para pdf
       * */
      reportPdfCellWidth?: number;

      /**
       * @description Column styles do pdfautotable
       * */
      pdfColumnStyles?: [];

      /**
       * @description Valor para o tamanho da coluna ao exportar a tabela para texto
       * */
      reportTxtCellWidth?: number;

      /**
       * @description Caso o valor necessite de alguma transformação, passar a função calback aqui. (Deve implementar a função no helper e chamar ela aqui.)
       * */
      transformData?: (data?: any) => any;

      /**
       * @description valor no caso do tipo ser INPUT
       * */
      valueItem?: any;

      /**
       * @description Header da coluna
       * */
      header?: string;

      /**
       * @description Pipe aplicado ao item da coluna. Para usar um pipe, o tipo tem que ser string. */
      pipe?: TablePipesTypeEnum;

      /**
       * @description Objeto com algum style que queira aplicar ao item da coluna (falta implementar)
       */
      style?: string;

      /**
       * @description Objeto com algum style que queira aplicar ao item da coluna (falta implementar)
       */
      styleCustom?: (data?: any) => string;

      /**
       * @description Pipe para ser usado no relatório, deve ser instanciado no construtor e passado aqui
       */
      reportPipe?: any;

      /**
       * @description Url para imagem da coluna
       */
      urlImg?: string;

      /**
       * @description caso o item da coluna seja butom, informar o tipo do botão.
       */
      buttonType?:
        | TableButtonsEnum.ICON
        | TableButtonsEnum.MINI_FAB
        | TableButtonsEnum.RAISED
        | TableButtonsEnum.STROKED;

      /**
       * @description valores dos botões
       */
      buttons?: {
        /**
         * @description Informar o label caso o tipo do botão seja stroked ou raised
         */
        label?: string | null;

        /**
         * @description Informar o link caso o tipo do botão seja link
         */
        link?: string | null;

        /**@description Informar o icon caso o tipo do botão seja icons */
        icon?: string | null;

        /**
         * @description Informar a cor do texto caso queira
         */
        color?: string | null;

        /**
         * @description Objeto com algum style que queira aplicar ao botão
         */
        styleButton?: (data: any) => string;

        /**
         * @description Mensagem do tooltip
         */
        tooltip?: string;

        /**
         * @description Função  callback ao clicar no botão
         */
        onClick?: (data: any, event?: any) => void;

        /**
         * @description Função  callback para desabilitar o botão
         */
        disabled?: (data: any) => any;

        /**
         * @description Id do botão para permissionamento
         */
        hashButton?: string;
      }[];
    };
  };
}
