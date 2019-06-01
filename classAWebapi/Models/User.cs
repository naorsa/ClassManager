using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;

namespace classAServerApi.Models
{
    /* Class for user */
    public class User
    {
        /* Class properties */

        public int userID { get; set; }
        public string password { get; set; }
        public int permission { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int age { get; set; }
        public string alpha { get; set; }
        public string beta { get; set; }
        public string gamma { get; set; }

        /* Class constructors */

        public User(int userid, string password, int permission){
            userID = userid;
            this.password = password;
            this.permission = permission;
        }

        public User(){
        }

        public User(string email){
            this.email = email;
        }

        public User(int userid, string password, int permission, string email){
            userID = userid;
            this.password = password;
            this.permission = permission;
            this.email = email;
        }

        /* Class methods*/

        /* Send mail for user when he forgot is password */
        public void forgotPassword()
        {

            try
            {
                MailMessage msg = new MailMessage();
                msg.From = new System.Net.Mail.MailAddress("omerHai12345@gmail.com","Noar and Omer");
                msg.To.Add(new System.Net.Mail.MailAddress(email));
                msg.Subject = "Forgot password";
                msg.Body = "Your password is: " + password ;
                msg.IsBodyHtml = true;
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("omerHai12345@gmail.com", "H7PKi905Z");

                smtp.Send(msg);
            }
            catch (Exception ep)
            {
                Console.WriteLine(ep.Message);
            }
        }


        /* Make randomly password for user */
        public void makePassword()
        {
            int i,whichArray,inTheArray = 0;
            Random random = new Random();

            alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            beta = "abcdefghijklmnopqrstuvwxyz";
            gamma = "0123456789";
            for (i = 0; i < 12; i++)
            {
                whichArray = random.Next(3);
                if (whichArray == 0)
                {
                    inTheArray = random.Next(26);
                    password = password + alpha[inTheArray];
                }
                if (whichArray == 1)
                {
                    inTheArray = random.Next(26);
                    password = password + beta[inTheArray];
                }
                if (whichArray == 2)
                {
                    inTheArray = random.Next(10);
                    password = password + gamma[inTheArray];
                }
            }
        }
    }
}