using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using OldData;
using PgSql_Data;

public static class ContactEndpoints
{
    private static string filePath = @"C:\_proj\data\ContactData.json";

    private static string connstr
    {
        get
        {
            var pass = File.ReadAllText("C:\\creds\\postgresql_pass.txt");
            var connstr = @"Host=localhost;Database=postgres;Username=postgres;Password=" + pass;
            return connstr;
        }
    }


    //
    public static List<Contact> LoadContacts()
    {
        if (!File.Exists(filePath))
            return new List<Contact>(); // empty list if file doesn't exist

        var json = File.ReadAllText(filePath);

        // Return empty list if file is empty
        if (string.IsNullOrWhiteSpace(json))
            return new List<Contact>();

        return JsonSerializer.Deserialize<List<Contact>>(json) ?? new List<Contact>();
    }

    // Save contacts back to JSON file
    public static void SaveContacts(List<Contact> contacts)
    {
        var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(filePath, json);
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

            var contactsSent = list.Select(c => new OldData.Contact
            {
                Id = c.pk_id.ToString(),
                FirstName = c.first_name,
                LastName = c.last_name,
                Address = c.address,
                Phone = c.phone,
                GenderId = c.gender_id.ToString(),
            }).ToList();

            return contactsSent;

            // Console.WriteLine("Hello World");
            // var contactJson = File.ReadAllText(filePath);
            // var contacts = JsonSerializer.Deserialize<List<Contact>>(contactJson);
            // return contacts;
        }
    }

    public static IResult post(Contact newContact)
    {
        // var contacts = LoadContacts();

        // int nextId = contacts.Any()
        //     ? contacts.Max(c => int.TryParse(c.Id, out var id) ? id : 0) + 1
        //     : 1;

        // newContact.Id = nextId.ToString();
        // contacts.Add(newContact);

        // SaveContacts(contacts);

        // return Results.Ok(newContact);

        using (var _db = new MyDbContext(connstr))
        {
            var query = _db.contacts;

            string sql = query.ToQueryString();
            Console.WriteLine(sql);

            var list = query.ToList();

            Console.WriteLine(list.Count());

            int nextId = list.Any()
                ? list.Max(c => int.TryParse(c.pk_id.ToString(), out var id) ? id : 0) + 1
                : 1;

            newContact.Id = nextId.ToString();

            var addContact = new contact();

            addContact.pk_id = int.Parse(newContact.Id);
            addContact.first_name = newContact.FirstName;
            addContact.last_name = newContact.LastName;
            addContact.phone = newContact.Phone;
            addContact.address = newContact.Address;
            addContact.gender_id = int.Parse(newContact.GenderId);

            query.Add(addContact);
            _db.SaveChanges();

            return Results.Ok(addContact);
        }
    }

    public static IResult put(string id, Contact updatedContact)
    {
        // Load all contacts
        var contacts = LoadContacts();

        // Find the one to update
        var contact = contacts.FirstOrDefault(c => c.Id == id);
        if (contact is null)
            return Results.NotFound(); // no match found

        // Update fields
        contact.FirstName = updatedContact.FirstName;
        contact.LastName = updatedContact.LastName;
        contact.Phone = updatedContact.Phone;
        contact.Address = updatedContact.Address;
        contact.GenderId = updatedContact.GenderId;

        // Save the updated list
        SaveContacts(contacts);

        return Results.Ok(contact); // return the updated object
    }

    public static IResult delete(string id)
    {
        //once kontaktlari al
        //yeni bos array olustur
        //kontaktlari loopa sok
        //id si esit olani yeni listeye koyma, idsi esit olmayanlari yeni listeye koy
        var json = File.ReadAllText(filePath);
        var contacts = JsonSerializer.Deserialize<List<Contact>>(json);
        if (contacts == null)
            contacts = new List<Contact>();

        var newContacs = new List<Contact>();

        foreach (var contact in contacts)
        {
            Console.WriteLine(contact.Id);
            if (id != contact.Id)
            {
                newContacs.Add(contact);
            }
        }

        var newJson = JsonSerializer.Serialize(newContacs);
        File.WriteAllText(filePath, newJson);

        return Results.Ok();
    }

}