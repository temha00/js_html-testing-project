using Cmm;
using Dto;
using Newtonsoft.Json;

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
        // app.MapPost("/api/contact", ContactEndpoints.post);
        // app.MapPut("/api/contact/{id}", ContactEndpoints.put);
        // app.MapDelete("/api/contact/{id}", ContactEndpoints.delete);

        // app.MapGet("/api/contact2", ContactEndpoints.mainHandler);
        app.MapPost("/api/contact", async (HttpRequest request) =>
        {
            try
            {
                //read request body
                using var reader = new StreamReader(request.Body);
                string bodyAsString = await reader.ReadToEndAsync();
                Console.WriteLine(bodyAsString);

                //convert base model & read action.
                var baseModel = JsonConvert.DeserializeObject<ReqData_cmm>(bodyAsString);
                if (baseModel.action == "save")
                {
                    //convert action model & call action.
                    var model = JsonConvert.DeserializeObject<ContactEndpoints.ReqData_save>(bodyAsString);
                    var respData = ContactEndpoints.save(model);
                    return Results.Ok(respData);
                }
                else if (baseModel.action == "edit")
                {
                    var model = JsonConvert.DeserializeObject<ContactEndpoints.ReqData_edit>(bodyAsString);
                    var id = model.Contact.Id;
                    var respData = ContactEndpoints.edit(id, model);
                    return Results.Ok(respData);
                }
                else if (baseModel.action == "delete")
                {
                    var model = JsonConvert.DeserializeObject<ContactEndpoints.ReqData_delete>(bodyAsString);
                    var respData = ContactEndpoints.delete(model.id);
                    return Results.Ok(respData);
                }

                return Results.Ok();
            }
            catch (Exception ex)
            {
                var respData = new RespData_cmm();
                respData.Error = ex.Message;
                respData.ErrorTrace = ex.StackTrace?.ToString();
                return Results.Ok(respData);
            }

        });

        //
        app.Run("http://127.0.0.1:5300");
    }
}
