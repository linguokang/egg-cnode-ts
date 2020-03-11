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

plugin.passport = {
  enable: true,
  package: 'egg-passport',
};

plugin.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};

plugin.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

export default plugin;
