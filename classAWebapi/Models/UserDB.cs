using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace classAServerApi.Models
{
    public class UserDB
    {
        DBConnect dbManager;
        public UserDB(){
            dbManager = new DBConnect();
        }
        /* Check if user exit in the database if yes returns him else returns null */
        public User selectUser(int id, string userPassword)
        {
            string query = "SELECT * FROM users WHERE USER_ID = " + id + " AND USER_PASSWORD = " + userPassword;
            int userid = id;
            int permission = 0;
            string password = userPassword;
            String userEmail = "12";
            User u;
            List<string>[] list = new List<string>[1];
            if (dbManager.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query,dbManager.connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    userid = dataReader.GetInt32(0);
                    password = dataReader.GetString(1);
                    permission = dataReader.GetInt32(2);
                    userEmail = dataReader.GetString(3);
                }
                dataReader.Close();
                dbManager.CloseConnection();
                u = new User(userid, password, permission);
                return u;
            }
            else
            {
                return null;
            }
        }

        public User selectForgotUser(string email)
        {
            string query = "SELECT * FROM users WHERE USER_EMAIL = '" + email + "'";
            int userid = 1;
            string password = "0";
            int permission = 0;
            string userEmail = email;
            User u;
            List<string>[] list = new List<string>[1];
            if (dbManager.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, dbManager.connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    userid = dataReader.GetInt32(0);
                    password = dataReader.GetString(1);
                    permission = dataReader.GetInt32(2);
                    userEmail = dataReader.GetString(3);
                }
                dataReader.Close();
                dbManager.CloseConnection();
                u = new User(userid,password,permission,userEmail);
                return u;
            }
            else
            {
                return null;
            }
        }

        //Insert statement
        public void AddUser(User u)
        {
            string query = "INSERT INTO users (USER_ID, USER_PASSWORD, USER_PERMISSION, USER_EMAIL, USER_AGE, USER_FIRSTNAME, USER_LASTNAME) VALUES" + '(' + u.userID + ',' + "'" + u.password + "'" + ',' + u.permission + ',' + "'" +u.email + "'"+ ',' + u.age + ',' + "'" + u.firstName + "'" + ',' + "'" + u.lastName + "'" + ')';

            //open connection
            if (dbManager.OpenConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                MySqlCommand cmd = new MySqlCommand(query, dbManager.connection);

                //Execute command
                cmd.ExecuteNonQuery();

                //close connection
                dbManager.CloseConnection();
            }
        }
    }
}