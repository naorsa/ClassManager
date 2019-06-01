using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using classAWebapi.Models;
using System.Web.Http.Cors;

namespace classAWebapi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class MsgController : ApiController
    {
        SendSMS sender = new SendSMS();
        [HttpGet]
        [Route("msg/{cid}/{msg}")]
        public void sendMsg(string cid,string msg)
        {
            CourseDB cdb = new CourseDB();
            string phoneNums = cdb.phoneNums(cid);
            sender.sendSMS(msg, phoneNums);

        }

    }
}
