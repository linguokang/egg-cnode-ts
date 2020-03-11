module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    loginname: STRING(30),
    pass: STRING,
    age: INTEGER,
    last_sign_in_at: DATE,
    email: STRING,
    avatar: STRING,
    access_token: STRING,
    active: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
