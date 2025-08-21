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
        var filePath = @"C:\_proj\data\ContactData.json";

        //
        List<Contact> LoadContacts()
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
        void SaveContacts(List<Contact> contacts)
        {
            var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(filePath, json);
        }

        // GET all
        app.MapGet("/api/contact_list", () =>
        {
            Console.WriteLine("Hello World");
            var contactJson = File.ReadAllText(filePath);
            var contacts = JsonSerializer.Deserialize<List<Contact>>(contactJson);
            return contacts;
        });

        // POST new contact object into contact list json
        app.MapPost("/api/contact_list", (Contact newContact) =>
        {
            var contacts = LoadContacts();

            int nextId = contacts.Any()
                ? contacts.Max(c => int.TryParse(c.Id, out var id) ? id : 0) + 1
                : 1;

            newContact.Id = nextId.ToString();
            contacts.Add(newContact);

            SaveContacts(contacts);

            return Results.Ok(newContact);
        });

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

        // DELETE contact by ID
        app.MapDelete("/api/contact_list/{id}", (string id) =>
        {
            var contacts = LoadContacts(); // load existing contacts

            var contactToRemove = contacts.FirstOrDefault(c => c.Id == id);
            if (contactToRemove == null)
                return Results.NotFound(); // 404 if contact not found

            contacts.Remove(contactToRemove);
            SaveContacts(contacts); // save updated list

            return Results.NoContent(); // 204: successful deletion
        });

        app.Run("http://127.0.0.1:5300");
    }
}
