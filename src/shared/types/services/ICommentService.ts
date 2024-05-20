import { IComment } from "@/shared/types";

export interface ICommentService {
  /**
   * Получить все комментарии
   * @return {Promise.<(IComment[])>}
   * @memberof ICommentsService
   */
  getAll(): Promise<IComment[]>;
  /**
   * Получить комментарий по ID
   * @param {number} itemId
   * @return {Promise.<(IComment)>}
   * @memberof ICommentsService
   */
  getById(itemId: number): Promise<IComment>;
  /**
   * Получить комментарий по ID поста
   * @param {number} itemId
   * @return {Promise.<(IComment[])>}
   * @memberof ICommentsService
   */
  getByPostId(itemId: number): Promise<IComment[]>;
  /**
   * Создать комментарий
   * @param {IComment} item
   * @return {Promise.<(IComment)>}
   * @memberof ICommentsService
   */
  create(item: IComment): Promise<IComment>;
  /**
   * Обновить комментарий
   * @param {number} itemId
   * @param {IComment} item
   * @return {Promise.<(IComment)>}
   * @memberof ICommentsService
   */
  update(itemId: number, item: IComment): Promise<IComment>;
  /**
   * Удалить комментарий
   * @param {number} itemId
   * @memberof ICommentsService
   */
  delete(itemId: number): Promise<void>;
}
