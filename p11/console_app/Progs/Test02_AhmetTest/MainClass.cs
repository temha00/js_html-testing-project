using db_lib;
using Microsoft.EntityFrameworkCore;

namespace CmdApp.Progs.Test02_AhmetTest;

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



            var addCompany = new company();

            addCompany.company_name = "hhh";

            var sql = $"insert into company (company_name) values ({addCompany.company_name});";
            var result = _db.Database.ExecuteSqlRaw(sql);
            Console.WriteLine(result);

            //var sql = $"update company set (company_name = {company.company_name}) where pk_id = {id}";
            //var result = _db.Database.ExecuteSqlRaw(sql);
            //Console.WriteLine(result);
        }

        Console.WriteLine("done!");
    }
}
