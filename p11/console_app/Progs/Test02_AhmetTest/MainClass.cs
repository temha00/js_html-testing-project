using db_lib;
using db_lib.Tools;

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

            var gen = new SqlGenerator<contact>();

            //var gen = new db_lib.Tools.SqlGen();
            gen.Add(x => x.first_name, "aaaa");
            gen.Add(x => x.last_name, "aaaa");
            gen.Add(x => x.phone, "aaaa");
            gen.Add(x => x.address, "aaaa");
            gen.Add(x => x.gender_id, "1");

            var sql = gen.GetInsertSql();
            Console.WriteLine(sql);

            //gen.Add((x) => x.company_name, "aaaa");
            //var sql = gen.GetUpdateSql(6);

            //var sql = gen.GetDeleteSql(6);
            Console.WriteLine(sql);

            //var result = _db.Database.ExecuteSqlRaw(sql);
            //Console.WriteLine(result);

            //var addCompany = new company();

            //addCompany.company_name = "hhh";

            //var sql = $"insert into company (company_name) values ({addCompany.company_name});";
            //var result = _db.Database.ExecuteSqlRaw(sql);
            //Console.WriteLine(result);

            //var sql = $"update company set (company_name = {company.company_name}) where pk_id = {id}";
            //var result = _db.Database.ExecuteSqlRaw(sql);
            //Console.WriteLine(result);
        }

        Console.WriteLine("done!");
    }
}
