using Microsoft.EntityFrameworkCore;
using db_lib;
using Dto;
using Cmm;

namespace endpoints;

public static class CompanyEndpoints
{
    private static string connstr
    {
        get
        {
            var pass = File.ReadAllText("C:\\creds\\postgresql_pass.txt");
            // var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
            // var connstr = @"Server=localhost\SQLEXPRESS;Database=MYPROJ_CONTACT01;Trusted_Connection=True;TrustServerCertificate=True;";
            var connstr = @$"Server=localhost\SQLEXPRESS;Database=MYPROJ_CONTACT01;User Id=galaxy;Password={pass};TrustServerCertificate=True";
            return connstr;
        }
    }

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

                _db.companies.Add(addCompany);
                _db.SaveChanges();

                return new RespData_save() { Data = "OK" };
            }
        }
        else
        {
            using (var _db = new _DbContext(connstr))
            {
                var updatedCompany = model.Company;
                var id = model.Company.Id;

                var company = _db.companies.Where(c => c.pk_id == int.Parse(id)).FirstOrDefault();

                company.company_name = updatedCompany.CompanyName;

                _db.companies.Update(company);
                _db.SaveChanges();

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

            var query = _db.companies.Where(x => x.pk_id == idInt);
            var company = query.FirstOrDefault();

            _db.companies.Remove(company);
            _db.SaveChanges();

        }

        return new RespData_delete() { Data = "OK" };
    }
}
