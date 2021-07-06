const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our user model---objects user and model are moth imported from sequelize
class User extends Model {}

//define table column and configuration
User.init(
    {
    //table column definitions go here
    //define an id column
    id:{
        // use the special sequelize dataTypes object provide What type of data it is
        type: DataTypes.INTEGER,
        //equivalant to sqls NOT NULL option
        allowNull: false,
        //instruct that this is primary key
        primaryKey: true,
        //turn on auto increment
        autoIncrement: true
    },
    //define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    //define a email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //there cannot be any duplicate email values in this table
        unique: true,
        //if allowNull is set to false, we can run our data through validator before creating the table data
        validate: {
            isEmail: true
        }
    },
    // define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //this means the password must be at least four charecters long
            len: [4]
        }
    }
}, {
    //Table configuration options go here (https://sequelize.org/v5/manual/models-definition.html#configuration))
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
});

module.exports = User;

