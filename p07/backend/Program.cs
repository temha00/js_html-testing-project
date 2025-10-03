namespace backendProg;

public class Program
{

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

        //
        app.MapGet("/api/contact", ContactEndpoints.get);
        app.MapPost("/api/contact", ContactEndpoints.post);
        app.MapPut("/api/contact/{id}", ContactEndpoints.put);
        app.MapDelete("/api/contact/{id}", ContactEndpoints.delete);

        //
        app.Run("http://127.0.0.1:5300");
    }
}
