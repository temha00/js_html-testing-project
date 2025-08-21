using System.Security.Cryptography.X509Certificates;
using System.Text.Json;

namespace backend;

public class Program
{
    // --- Contact model (can live in Program.cs) ---
    public class Contact
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? GenderId { get; set; }
    }
    private static string filePath = @"C:\_proj\data\ContactData.json";

    public static IResult func_on_get(Contact newContact)
    {
        var contacts = LoadContacts();

        int nextId = contacts.Any()
            ? contacts.Max(c => int.TryParse(c.Id, out var id) ? id : 0) + 1
            : 1;

        newContact.Id = nextId.ToString();
        contacts.Add(newContact);

        SaveContacts(contacts);

        return Results.Ok(newContact);
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

    public static void Main(String[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        var app = builder.Build();

        app.UseCors("AllowAll");

        // Example REST endpoints

        // GET all
        app.MapGet("/api/contact_list", () =>
        {
            Console.WriteLine("Hello World");
            var contactJson = File.ReadAllText(filePath);
            var contacts = JsonSerializer.Deserialize<List<Contact>>(contactJson);
            return contacts;
        });

        // POST new contact object into contact list json
        app.MapPost("/api/contact_list", func_on_get);

        // PUT edited contact object into contact list json
        app.MapPut("/api/contact_list/{id}", (string id, Contact updatedContact) =>
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
        });

        //
        app.MapDelete("/api/contact_list/{id}", (string id) =>
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

        });

        app.Run("http://127.0.0.1:5300");
    }
}
