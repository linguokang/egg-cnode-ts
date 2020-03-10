// app/service/news.ts
import { Service } from 'egg';
import * as utility from 'utility';
import * as uuid from 'uuid';

export default class UserService extends Service {
  // public async list(page?: number): Promise<NewsItem[]> {
  //   return [];
  // }

  /*
   * 根据登录名查找用户
   * @param {String} loginName 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByLoginName(loginname) {
    return this.ctx.model.User.findOne({
      where: { loginname },
    });
  }

  /*
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  getUsersByQuery(loginname, email) {
    return this.ctx.model.User.findAll({
      where: {
        [this.app.Sequelize.Op.or]: [{ loginname }, { email }],
      },
    });
  }

  makeGravatar(email) {
    return (
      'http://www.gravatar.com/avatar/' +
      utility.md5(email.toLowerCase()) +
      '?size=48'
    );
  }

  newAndSave(loginname, pass, email, avatar_url, active) {
    return this.ctx.model.User.create({
      name: loginname,
      loginname,
      pass,
      email,
      avatar: avatar_url,
      active: active || false,
      accessToken: uuid.v4(),
    });
  }
}

// export interface NewsItem {
//   id: number;
//   title: string;
// }
