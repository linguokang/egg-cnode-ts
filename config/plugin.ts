import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

plugin.sequelize = {
  package: 'egg-sequelize',
  enable: true,
};

plugin.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

export default plugin;
