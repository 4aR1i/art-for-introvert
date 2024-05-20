import { IPost } from "@/shared/types";

export interface IPostService {
  /**
   * Получить все посты
   * @return {Promise.<(IPost[])>}
   * @memberof IPostsService
   */
  getAll(): Promise<IPost[]>;
  /**
   * Получить пост по ID
   * @param {number} itemId
   * @return {Promise.<(IPost)>}
   * @memberof IPostsService
   */
  getById(itemId: number): Promise<IPost>;
  /**
   * Получить пост по ID пользователя
   * @param {number} itemId
   * @return {Promise.<(IPost[])>}
   * @memberof IPostsService
   */
  getByUserId(itemId: number): Promise<IPost[]>;
  /**
   * Создать пост
   * @param {IPost} item
   * @return {Promise.<(IPost)>}
   * @memberof IPostsService
   */
  create(item: IPost): Promise<IPost>;
  /**
   * Обновить пост
   * @param {number} itemId
   * @param {IPost} item
   * @return {Promise.<(IPost)>}
   * @memberof IPostsService
   */
  update(itemId: number, item: IPost): Promise<IPost>;
  /**
   * Удалить пост
   * @param {number} itemId
   * @memberof IPostsService
   */
  delete(itemId: number): Promise<void>;
}
