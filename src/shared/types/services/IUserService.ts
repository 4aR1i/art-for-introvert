import { IUser } from "@/shared/types";

export interface IUserService {
  /**
   * Получить всех пользователей
   * @return {Promise.<(IUser[])>}
   * @memberof IUsersService
   */
  getAll(): Promise<IUser[]>;
  /**
   * Получить пользователя по ID
   * @param {number} itemId
   * @return {Promise.<(IUser)>}
   * @memberof IUsersService
   */
  getById(itemId: number): Promise<IUser>;
  /**
   * Создать пользователя
   * @param {IUser} item
   * @return {Promise.<(IUser)>}
   * @memberof IUsersService
   */
  create(item: IUser): Promise<IUser>;
  /**
   * Обновить пользователя
   * @param {number} itemId
   * @param {IUser} item
   * @return {Promise.<(IUser)>}
   * @memberof IUsersService
   */
  update(itemId: number, item: IUser): Promise<IUser>;
  /**
   * Удалить пользователя
   * @param {number} itemId
   * @memberof IUsersService
   */
  delete(itemId: number): Promise<void>;
}
