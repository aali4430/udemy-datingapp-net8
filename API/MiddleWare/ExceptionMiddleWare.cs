using System.Net;
using System.Text.Json;

namespace API;
public class ExceptionMiddleWare(RequestDelegate next, ILogger<ExceptionMiddleWare> logger, IHostEnvironment env)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            
            logger.LogError(ex,ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
    
            var response = env.IsDevelopment()
            ? new APIException(context.Response.StatusCode,ex.Message,ex.StackTrace)
            : new APIException(context.Response.StatusCode,ex.Message,"Internal Server Error");
            
    
            var option = new JsonSerializerOptions{
                PropertyNamingPolicy =  JsonNamingPolicy.CamelCase
            };
            
            var json  = JsonSerializer.Serialize(response,option);
            await context.Response.WriteAsync(json);

        }
    }

}