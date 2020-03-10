import { Controller } from 'egg';
import * as _ from 'lodash';
import validator from 'validator';


export default class UserController extends Controller {
  async show() {
    const { ctx } = this;
    const loginname = ctx.params.loginname;
    const user = await ctx.service.user.getUserByLoginName(loginname);

    if (!user) {
      ctx.status = 404;
      ctx.body = { success: false, error_msg: '用户不存在' };
      return;
    }

    const userId = user._id;
    const topics = await ctx.service.topic.getTopicsByQuery({ author_id: userId });
    const returnUser: any = _.pick(user, [ 'loginname', 'avatar_url', 'githubUsername', 'create_at', 'score' ]);
    const returnTopics = topics.map(topic => {
      return {
        id: topic._id,
        last_reply_at: topic.last_reply_at,
        title: topic.title,
        author: {
          loginname: user.loginname,
          avatar_url: user.avatar_url,
        },
      };
    });
    const data = returnUser;
    data.recent_topics = returnTopics;
    ctx.body = {
      success: true,
      data,
    };
  }

  async signup() {
    const { ctx } = this;
    const loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
    const email = validator.trim(ctx.request.body.email || '').toLowerCase();
    const pass = validator.trim(ctx.request.body.pass || '');
    const rePass = validator.trim(ctx.request.body.re_pass || '');

    let msg;
    // 验证信息的正确性
    if ([ loginname, pass, rePass, email ].some(item => {
      return item === '';
    })) {
      msg = '信息不完整。';
    } else if (loginname.length < 5) {
      msg = '用户名至少需要5个字符。';
    } else if (!ctx.helper.validateId(loginname)) {
      msg = '用户名不合法。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    } else if (pass !== rePass) {
      msg = '两次密码输入不一致。';
    }
    // END 验证信息的正确性

    if (msg) {
      ctx.status = 404;
      ctx.body = {
        success: true,
        error_msg: msg,
      };
    }

    const users = await ctx.service.user.getUsersByQuery(loginname, email);

    if (users.length > 0) {
      ctx.status = 422;
      ctx.body = {
        success: true,
        error_msg: '用户名或邮箱已被使用。',
        // loginname,
        // email,
      };
      return;
    }

    const passhash = ctx.helper.bhash(pass);

    // create gravatar
    const avatarUrl = ctx.service.user.makeGravatar(email);

    await ctx.service.user.newAndSave(loginname, passhash, email, avatarUrl, false);

    ctx.body = {
      success: true,
      msg: '注册成功',
    };
  }
}
