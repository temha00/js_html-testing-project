using Microsoft.EntityFrameworkCore;
using db_lib;
using Dto;
using Cmm;

namespace endpoints;

public static class CompanyEndpoints
{
    public static string connstr = CmmFuncs.CmmConnstr();

    //end points

    public static List<Company> get()
    {
        using (var _db = new _DbContext(connstr))
        {
            var query = _db.companies;

            string sql = query.ToQueryString();
            Console.WriteLine(sql);

            var list = query.ToList();

            Console.WriteLine(list.Count());

            var companiesSent = list.Select(c => new Company
            {
                Id = c.pk_id.ToString(),
                CompanyName = c.company_name,
            }).ToList();

            return companiesSent;

        }
    }

    public class ReqData_save : ReqData_cmm
    {
        public Company? Company { get; set; }
    }
    public class RespData_save : RespData_cmm
    {
        public Object? Data { get; set; }
    }

    public static RespData_save save(ReqData_save model)
    {
        if (model.Company.Id == "0")
        {

            var newCompany = model.Company;

            using (var _db = new _DbContext(connstr))
            {
                var addCompany = new company();

                addCompany.company_name = newCompany.CompanyName;

                var sql = $"insert into company (company_name) values ('{addCompany.company_name}');";
                var result = _db.Database.ExecuteSqlRaw(sql);
                Console.WriteLine(result);

                return new RespData_save() { Data = "OK" };
            }
        }
        else
        {
            using (var _db = new _DbContext(connstr))
            {
                var updatedCompany = model.Company;
                var id = int.Parse(model.Company.Id);

                var company = _db.companies.Where(c => c.pk_id == id).FirstOrDefault();

                company.company_name = updatedCompany.CompanyName;

                var sql = $"update company set company_name = '{company.company_name}' where pk_id = {id};";
                var result = _db.Database.ExecuteSqlRaw(sql);
                Console.WriteLine(result);

                return new RespData_save() { Data = "OK" };
            }
        }
    }

    public class ReqData_delete : ReqData_cmm
    {
        public string? id;
    }
    public class RespData_delete : RespData_cmm
    {
        public Object? Data { get; set; }
    }

    public static RespData_delete delete(string id)
    {

        using (var _db = new _DbContext(connstr))
        {

            //
            var idInt = Int32.Parse(id);

            //var query = _db.companies.Where(x => x.pk_id == idInt);
            //var company = query.FirstOrDefault();

            var sql = $"delete from company where pk_id = {idInt}";
            var result = _db.Database.ExecuteSqlRaw(sql);
            Console.WriteLine(result);
        }

        return new RespData_delete() { Data = "OK" };
    }
}
