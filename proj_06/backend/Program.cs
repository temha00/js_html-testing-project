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

        // GET all
        app.MapGet("/api/contact_list", () =>
        {
            Console.WriteLine("Hello World");
            var contactJson = File.ReadAllText(filePath);
            var contacts = JsonSerializer.Deserialize<List<Contact>>(contactJson);
            return contacts;
        });

        app.Run("http://127.0.0.1:5300");
    }
}
