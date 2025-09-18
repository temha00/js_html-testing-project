using Microsoft.EntityFrameworkCore;
using Dto;
using PgSql_Data;
using Cmm;

public static class ContactEndpoints
{
    private static string connstr
    {
        get
        {
            var pass = File.ReadAllText("C:\\creds\\postgresql_pass.txt");
            var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
            return connstr;
        }
    }

    //end points

    public static List<Contact> get()
    {
        using (var _db = new MyDbContext(connstr))
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

        var newContact = model.Contact;

        using (var _db = new MyDbContext(connstr))
        {
            var addContact = new contact();

            addContact.first_name = newContact.FirstName;
            addContact.last_name = newContact.LastName;
            addContact.phone = newContact.Phone;
            addContact.address = newContact.Address;
            addContact.gender_id = CmmHelper.ToInt32(newContact.GenderId);

            _db.contacts.Add(addContact);
            _db.SaveChanges();

            return new RespData_save() { Data = "OK" };
        }
    }

    public class ReqData_edit : ReqData_cmm
    {
        public Contact? Contact { get; set; }
    }
    public class RespData_edit : RespData_cmm
    {
        public Object? Data { get; set; }
    }

    public static RespData_edit edit(string id, ReqData_edit model)
    {
        using (var _db = new MyDbContext(connstr))
        {
            var updatedContact = model.Contact;

            var contact = _db.contacts.Where(c => c.pk_id == int.Parse(id)).FirstOrDefault();

            contact.first_name = updatedContact.FirstName;
            contact.last_name = updatedContact.LastName;
            contact.phone = updatedContact.Phone;
            contact.address = updatedContact.Address;
            contact.gender_id = int.Parse(updatedContact.GenderId);


            _db.contacts.Update(contact);
            _db.SaveChanges();

            return new RespData_edit() { Data = "OK" };
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

        using (var _db = new MyDbContext(connstr))
        {

            //
            var idInt = Int32.Parse(id);

            var query = _db.contacts.Where(x => x.pk_id == idInt);
            var contact = query.FirstOrDefault();

            _db.contacts.Remove(contact);
            _db.SaveChanges();

        }

        return new RespData_delete() { Data = "OK" };
    }

    // public static IResult post(Contact newContact)
    // {

    //     using (var _db = new MyDbContext(connstr))
    //     {
    //         var addContact = new contact();

    //         addContact.first_name = newContact.FirstName;
    //         addContact.last_name = newContact.LastName;
    //         addContact.phone = newContact.Phone;
    //         addContact.address = newContact.Address;
    //         addContact.gender_id = int.Parse(newContact.GenderId);

    //         _db.contacts.Add(addContact);
    //         _db.SaveChanges();

    //         return Results.Ok(newContact);
    //     }
    // }

    // public static IResult put(string id, Contact updatedContact)
    // {

    //     using (var _db = new MyDbContext(connstr))
    //     {

    //         var contact = _db.contacts.Where(c => c.pk_id == int.Parse(id)).FirstOrDefault();

    //         contact.first_name = updatedContact.FirstName;
    //         contact.last_name = updatedContact.LastName;
    //         contact.phone = updatedContact.Phone;
    //         contact.address = updatedContact.Address;
    //         contact.gender_id = int.Parse(updatedContact.GenderId);


    //         _db.contacts.Update(contact);
    //         _db.SaveChanges();

    //         return Results.Ok(contact);
    //     }

    // }

    // public static IResult delete(string id)
    // {

    //     using (var _db = new MyDbContext(connstr))
    //     {

    //         //
    //         var idInt = Int32.Parse(id);

    //         var query = _db.contacts.Where(x => x.pk_id == idInt);
    //         var contact = query.FirstOrDefault();

    //         _db.contacts.Remove(contact);
    //         _db.SaveChanges();

    //     }

    //     return Results.Ok();
    // }

}