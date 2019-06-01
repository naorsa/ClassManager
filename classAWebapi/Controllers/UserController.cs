using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using classAServerApi.Models;
using System.Net.Http.Headers;
using System.Web;
using System.IO;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using classAWebapi.Models;
using Newtonsoft.Json.Linq;


namespace classAServerApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    /* Controller for user */
    public class UserController : ApiController
    {
        User u;
        UserDB dbManager = new UserDB();

        /* When user wants to login to the application */
        [HttpGet]
        [Route("api/User/{id}/{password}")]
        public HttpResponseMessage getSpecificUSer(int id, string password){
           
            u = dbManager.selectUser(id,password);
            var json = new JavaScriptSerializer().Serialize(u);
            return Request.CreateResponse(HttpStatusCode.OK, json);
        }

        /* When user forgot is password */
        [HttpGet]
        [Route("api/User/{email}/forget")]
        public HttpResponseMessage forgetEmail(string email)
        {
            u = dbManager.selectForgotUser(email);
            u.forgotPassword();
            var json = new JavaScriptSerializer().Serialize(u);
            return Request.CreateResponse(HttpStatusCode.OK, json);
        }


        /* When the manager wants to add new user to the app */
        [HttpPost]
        [Route("api/User/Add")]
        public HttpResponseMessage AddUser()
        {
            var content = Request.Content;
            string jsonContent = content.ReadAsStringAsync().Result;
            JObject o = JObject.Parse(jsonContent);
            User newUser = new User();
            foreach (object item in o)
            {
                KeyValuePair<string, JToken> castItem = (KeyValuePair<string, JToken>)item;
                JToken jtoken;
                if (castItem.Key == "id")
                {
                    jtoken = castItem.Value;
                    string temp = jtoken.ToString();
                    newUser.userID = Int32.Parse(temp);
                }
                if (castItem.Key == "firstName")
                {
                    jtoken = castItem.Value;
                    newUser.firstName = jtoken.ToString();
                }

                if (castItem.Key == "lastName")
                {
                    jtoken = castItem.Value;
                    newUser.lastName = jtoken.ToString();
                }

                if (castItem.Key == "age")
                {
                    jtoken = castItem.Value;
                    string temp = jtoken.ToString();
                    newUser.age = Int32.Parse(temp);
                    
                }
                if (castItem.Key == "email")
                {
                    jtoken = castItem.Value;
                    newUser.email = jtoken.ToString();
                }
                if (castItem.Key == "permission")
                {
                    jtoken = castItem.Value;
                    string temp = jtoken.ToString();
                    newUser.permission = Int32.Parse(temp);

                }

            }
            newUser.makePassword();
            dbManager.AddUser(newUser);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
