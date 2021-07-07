const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our user model---objects user and model are moth imported from sequelize
class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table column and configuration
User.init({
            //table column definitions go here
            //define an id column
            id: {
                // use the special sequelize dataTypes object provide What type of data it is
                type: DataTypes.INTEGER,
                //equivalent to mysql's NOT NULL option
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
                    //this means the password must be at least four characters long
                    len: [4]
                }
            }
        }, {
            //where we add our hooks to secure the bcrypt password hook function
            hooks: {
                //set up beforeCreate lifecycle "hook" functionality
                // beforeCreate(userData) {
                //     return bcrypt.hash(userData.password, 10).then(newUserData => {
                //         return newUserData
                //     });
                // }

                //same function as above but easier to read!
                    async beforeCreate(newUserData) {
                        newUserData.password = await bcrypt.hash(newUserData.password, 10);
                        return newUserData;
                    },
                    //set up beforeUpdate lifecycle "hook" functionality--- allows user to update there password- must add option to quey in router.put for it to work!
                    async beforeUpdate(updatedUserData) {
                        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                        return updatedUserDatal
                    }
            },
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
            }
        );

        module.exports = User;