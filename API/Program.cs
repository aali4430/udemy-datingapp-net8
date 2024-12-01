using System.Text;
using API.Data;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using API.Extentions;
using Microsoft.AspNetCore.Diagnostics;
using API;
using System.Security.Cryptography;
//using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// add application services
builder.Services.AddApplicationServices(builder.Configuration);
// add identity services
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleWare>();

// Configure the HTTP request pipeline.
/*Commented Intentionally*/
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseAuthorization();
app.UseCors(cor=>{
    cor.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
// use services out side the scope of dependency injection using ServiceLocator Pattern
// we are creating the database and seed the data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try{
var context = services.GetRequiredService<DataContext>();
await context.Database.MigrateAsync();
await Seed.SeedUser(context);
}
catch{
    var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError("Error Occured while using the migration");
throw;
}

app.Run();
