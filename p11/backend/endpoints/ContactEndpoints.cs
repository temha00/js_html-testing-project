using Microsoft.EntityFrameworkCore;
using Dto;
using db_lib;
using Cmm;

namespace endpoints;

public static class ContactEndpoints
{
    public static string connstr = CmmFuncs.CmmConnstr();

    //end points

    public static List<Contact> get()
    {
        using (var _db = new _DbContext(connstr))
        {
            var query = _db.contacts;

            string sql = query.ToQueryString();
            Console.WriteLine(sql);

            var list = query.ToList();

            Console.WriteLine(list.Count());

            var contactsSent = list.Select(c => new Contact
            {
                Id = c.pk_id.ToString(),
                FirstName = c.first_name,
                LastName = c.last_name,
                Phone = c.phone,
                Address = c.address,
                GenderId = c.gender_id.ToString(),
            }).ToList();

            return contactsSent;

        }
    }

    public class ReqData_save : ReqData_cmm
    {
        public Contact? Contact { get; set; }
    }
    public class RespData_save : RespData_cmm
    {
        public Object? Data { get; set; }
    }

    public static RespData_save save(ReqData_save model)
    {
        if (model.Contact.Id == "0")
        {

            var newContact = model.Contact;

            using (var _db = new _DbContext(connstr))
            {
                var gen = new SqlGenerator();
                gen.Add(nameof(contact.first_name), newContact.FirstName);
                gen.Add(nameof(contact.last_name), newContact.LastName);
                gen.Add(nameof(contact.phone), newContact.Phone);
                gen.Add(nameof(contact.address), newContact.Address);
                gen.Add(nameof(contact.gender_id), newContact.GenderId);

                var sql = gen.GetInsertSql(nameof(contact));

                var result = _db.Database.ExecuteSqlRaw(sql);
                Console.WriteLine(result);

                return new RespData_save() { Data = "OK" };
            }
        }
        else
        {
            using (var _db = new _DbContext(connstr))
            {
                var updatedContact = model.Contact;
                var id = int.Parse(model.Contact.Id);

                //var contact = _db.contacts.Where(c => c.pk_id == id).FirstOrDefault();

                //contact.first_name = updatedContact.FirstName;
                //contact.last_name = updatedContact.LastName;
                //contact.phone = updatedContact.Phone;
                //contact.address = updatedContact.Address;
                //contact.gender_id = int.Parse(updatedContact.GenderId);
           
                var gen = new SqlGenerator();
                gen.Add(nameof(contact.first_name), updatedContact.FirstName);
                gen.Add(nameof(contact.last_name), updatedContact.LastName);
                gen.Add(nameof(contact.phone), updatedContact.Phone);
                gen.Add(nameof(contact.address), updatedContact.Address);
                gen.Add(nameof(contact.gender_id), updatedContact.GenderId);

                //some customer view changes made....
                //ahmet's changes
                //halil's changes

                var sql = gen.GetUpdateSql(nameof(contact), id);

                //var sql = $"update contact set first_name = '{contact.first_name}', last_name = '{contact.last_name}', phone = '{contact.phone}', address = '{contact.address}', gender_id = '{contact.gender_id}' where pk_id = {id}";
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

            var gen = new SqlGenerator();

            var sql = gen.GetDeleteSql(nameof(contact), idInt);

            //var sql = $"delete from contact where pk_id = {idInt}";
            var result = _db.Database.ExecuteSqlRaw(sql);
            Console.WriteLine(result);

        }

        return new RespData_delete() { Data = "OK" };
    }

}
