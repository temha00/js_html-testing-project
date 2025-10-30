using Cmm;
using Newtonsoft.Json;
using endpoints;

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
        //app.MapGet("/api/contact", ContactEndpoints.get);
        app.MapGet("/api/contact", async (HttpRequest request) =>
        {
            try
            {
                using var reader = new StreamReader(request.Body);
                string bodyAsString = await reader.ReadToEndAsync();
                Console.WriteLine(bodyAsString);

                var respData = ContactEndpoints.get();
                //return Results.Ok(respData);

                var jsonText = JsonConvert.SerializeObject(respData, Formatting.Indented, new JsonSerializerSettings() { DateFormatString = "yyyy-MM-ddTHH:mm:ss.fff" });
                Console.WriteLine(jsonText);
                return Results.Content(jsonText, "application/json");
            }
            catch (Exception ex)
            {
                var respData = new RespData_cmm();
                respData.Error = ex.Message;
                respData.ErrorTrace = ex.StackTrace?.ToString();
                return Results.Ok(respData);
            }

        });

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

        app.MapGet("/api/company", CompanyEndpoints.get);
        app.MapPost("/api/company", async (HttpRequest request) =>
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
                    var model = JsonConvert.DeserializeObject<CompanyEndpoints.ReqData_save>(bodyAsString);
                    var respData = CompanyEndpoints.save(model);
                    return Results.Ok(respData);
                }
                else if (baseModel.action == "delete")
                {
                    var model = JsonConvert.DeserializeObject<CompanyEndpoints.ReqData_delete>(bodyAsString);
                    var respData = CompanyEndpoints.delete(model.id);
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
