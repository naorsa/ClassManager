using classAServerApi.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace classAWebapi.Models
{
    public class Course
    {
        public int id { get; set; }
        public string name { get; set; }
        public string teacherName { get; set; }
        public Dictionary<string, string> dayAndHour = new Dictionary<string, string>();
        private static DBConnect dbManager;
        public string details { get; set; }
        public int price { get; set; }


        public void addDay(string day,string hour)
        {
            dayAndHour.Add(day, hour);
        }
        

        }

    }
