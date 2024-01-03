import { Usuario } from "../entity/usuario"

export interface UsuarioRepository {
  all(): Promise<Usuario[]>
  getUserByLogin(login: string): Promise<Usuario>
  insert(usuario: Usuario): Promise<void>
  update(usuario: Usuario): Promise<void>
  delete(id: number): Promise<void>
}
