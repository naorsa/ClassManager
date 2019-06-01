using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using classAWebapi.Models;
using System.Collections;
using MySql.Data.MySqlClient;
using System.Text.RegularExpressions;
using classAServerApi.Models;

namespace classAWebapi.Models
{
    public class CourseDB
    {
        DBConnect dbManager;
        public CourseDB(){
            dbManager = new DBConnect();
        }

        public void addToSql(Course c)
        {
            int courseID = 0;
            string query = "INSERT INTO courses (COURSE_NAME,TEACHER,PRICE,DETAILS) VALUES('" + c.name + "','" + c.teacherName + "','" + c.price + "','" + c.details + "');";
            //open connection
            if (dbManager.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, dbManager.connection);
                cmd.ExecuteNonQuery();
                query = "SELECT LAST_INSERT_ID();";
                cmd = new MySqlCommand(query, dbManager.connection);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    courseID = Int32.Parse(rdr.GetString(0));

                }
                foreach (KeyValuePair<string, string> entry in c.dayAndHour)
                {
                    dbManager.CloseConnection();
                    dbManager.OpenConnection();
                    string day = entry.Key;
                    string hour = entry.Value;
                    Regex rgx = new Regex("[^a-zA-Z0-9 : -]");
                    day = rgx.Replace(day, "");
                    day = day.Substring(5);
                    hour = rgx.Replace(hour, "");
                    hour = hour.Substring(5);
                    query = "INSERT INTO dayofcourse (CID,DAY,HOUR) VALUES(" + courseID + ",'" + day + "','" + hour + "'); ";
                    cmd = new MySqlCommand(query, dbManager.connection);
                    cmd.ExecuteNonQuery();
                }
                dbManager.CloseConnection();
            }
        }

        public ArrayList getAllCourses()
        {

            ArrayList allCourses = new ArrayList();
            string query = "SELECT * FROM courses";
            if (dbManager.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, dbManager.connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Course nc = new Course();
                    nc.id = dataReader.GetInt32(0);
                    nc.name = dataReader.GetString(1);
                    nc.teacherName = dataReader.GetString(2);
                    if(dataReader.GetInt32(3)!=null)
                        nc.price = dataReader.GetInt32(3);
                    nc.details = dataReader.GetString(4);
                    allCourses.Add(nc);
                }
                dataReader.Close();
                dbManager.CloseConnection();
                return allCourses;
            }

            return allCourses;
        }

        public string phoneNums(string cid)
        {
            string phonNumbers="";
            string query = "SELECT users.PHONE_NUMBER "+
                            "FROM student_in_course, users "+
                            "WHERE student_in_course.CID = "+Int32.Parse(cid)+ " AND users.USER_ID = student_in_course.UID;";
            if (dbManager.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, dbManager.connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    phonNumbers = phonNumbers + dataReader.GetString(0)+", ";
                }
            }
            return phonNumbers;

        }
    }
  
}