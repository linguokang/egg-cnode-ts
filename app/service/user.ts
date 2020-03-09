// app/service/news.ts
import { Service } from 'egg';

export default class UserService extends Service {
  // public async list(page?: number): Promise<NewsItem[]> {
  //   return [];
  // }

  /*
   * 根据登录名查找用户
   * @param {String} loginName 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByLoginName(login_name) {
    return this.ctx.model.User.findOne({
      where: { login_name },
    });
  }
}

// export interface NewsItem {
//   id: number;
//   title: string;
// }
