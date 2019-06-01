using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Headers;
using System.Web;
using System.IO;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using classAWebapi.Models;
using Newtonsoft.Json.Linq;
using classAServerApi.Models;


namespace classAServerApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class CourseController : ApiController
    {
        CourseDB courseManager = new CourseDB();
        [HttpPost]
        [Route("Course")]
        public HttpResponseMessage setCourse(HttpRequestMessage request)
        {
            var content = request.Content;
            string jsonContent = content.ReadAsStringAsync().Result;
            JObject o = JObject.Parse(jsonContent);
            Course newCourse = new Course();
            foreach (object item in o)
            {
              KeyValuePair<string, JToken> castItem = (KeyValuePair<string, JToken>)item;
                JToken jtoken;
                if (castItem.Key == "teacherName")
                {
                    jtoken = castItem.Value;
                    newCourse.teacherName = jtoken.ToString();
                }

                if (castItem.Key == "name")
                {
                    jtoken = castItem.Value;
                    newCourse.name = jtoken.ToString();
                }
                if (castItem.Key == "days")
                {

                    jtoken = castItem.Value;
                    foreach(object day in jtoken)
                    {
                        JObject ObjectDay = (JObject)day;
                        JToken tokenday = ObjectDay.First;
                        JToken tokenHour = ObjectDay.Last;
                        newCourse.addDay(tokenday.ToString(), tokenHour.ToString());
                    }
                }
            }
            courseManager.addToSql(newCourse);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpGet]
        [Route("Course")]
        public HttpResponseMessage getCourses(HttpRequestMessage request)
        {
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(courseManager.getAllCourses());
            return Request.CreateResponse(HttpStatusCode.OK, json);
        }
    }
}
