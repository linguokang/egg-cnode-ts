import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const apiV1Router = app.router.namespace('/api/v1');

  // const { user, message, topic, reply, collect } = controller;
  const { user } = controller;

  router.get('/', controller.home.index);

  // 用户
  apiV1Router.get('/user/:loginname', user.show);
  // apiV1Router.post('/accesstoken', tokenRequired, user.verify);
};
