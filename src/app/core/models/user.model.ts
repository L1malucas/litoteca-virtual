export class UserModel {
  id?: string;
  dataCriacao?: string;
  nome?: string;
  sobrenome?: string;
  email?: string;
  username?: string;
  telefone?: string;
  profissao?: string;
  pais?: string;
  estado?: string;
  cidade?: string;
  fotoReferenceFtp?: string | null;

  constructor(options: Partial<UserModel> = {}) {
    this.id = options.id || "";
    this.dataCriacao = options.dataCriacao || "";
    this.nome = options.nome || "";
    this.sobrenome = options.sobrenome || "";
    this.email = options.email || "";
    this.username = options.username || "";
    this.telefone = options.telefone || "";
    this.profissao = options.profissao || "";
    this.pais = options.pais || "";
    this.estado = options.estado || "";
    this.cidade = options.cidade || "";
    this.fotoReferenceFtp = options.fotoReferenceFtp || "";
  }
}

export class UserRequest {
  id?: string;
  nome?: string;
  sobrenome?: string;
  email?: string;
  username?: string;
  telefone?: string;
  profissao?: string;
  pais?: string;
  estado?: string;
  cidade?: string;
  foto?: string | null;

  constructor(options: UserRequest = {}) {
    this.id = options.id || "";
    this.nome = options.nome || "";
    this.sobrenome = options.sobrenome || "";
    this.email = options.email || "";
    this.username = options.username || "";
    this.telefone = options.telefone || "";
    this.profissao = options.profissao || "";
    this.pais = options.pais || "";
    this.estado = options.estado || "";
    this.cidade = options.cidade || "";
    this.foto = options.foto || "";
  }
}
