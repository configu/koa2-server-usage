module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    extra: DataTypes.JSON, //预留拓展字段
    name: {//唯一英文名
      type: DataTypes.STRING,
      unique: true
    },
    title: DataTypes.STRING,//中文名
    remark: DataTypes.STRING,//备注
    status: DataTypes.INTEGER, // 项目状态
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    tableName: 'project',
    timestamps: false,
  });

  return Project;
};
