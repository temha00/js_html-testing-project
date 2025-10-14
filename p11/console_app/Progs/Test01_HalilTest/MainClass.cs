using db_lib;
using Microsoft.EntityFrameworkCore;

namespace CmdApp.Progs.Test01_HalilTest
{
    public class MainClass
    {
        public void Execute()
        {


            using (var _db = new _DbContext(CmmFuncs.CmmConnstr()))
            {


                //var comp = new company();
                //comp.company_name = "aaa";
                //_db.companies.Add(comp);
                //_db.SaveChanges();


                //{
                //    var sql = "insert into company (company_name) values('abc') ";
                //    var result = _db.Database.ExecuteSqlRaw(sql);
                //    Console.WriteLine(result);
                //}

                //{
                //    var id = 10;
                //    var sql = $"update company set company_name='öööö' where pk_id = {id} ";
                //    var result = _db.Database.ExecuteSqlRaw(sql);
                //    Console.WriteLine(result);
                //}


                //{
                //    var id = 10;
                //    var sql = $"delete from company where pk_id = {id} ";
                //    var result = _db.Database.ExecuteSqlRaw(sql);
                //    Console.WriteLine(result);
                //}

            }

            Console.WriteLine("done!");

        }

    }
}
