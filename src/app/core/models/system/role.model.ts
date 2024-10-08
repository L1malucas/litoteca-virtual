export class RoleModel {
  id?: number;
  name?: string;
  constructor(options: RoleModel = {}) {
    this.id = options.id || undefined;
    this.name = options.name || undefined;
  }
}
