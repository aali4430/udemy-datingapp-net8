using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions;

public static class ApplicationServiceExtentions
{
    public static IServiceCollection  AddApplicationServices(this IServiceCollection services,
    IConfiguration config
    )
    {

services.AddControllers();

services.AddDbContext<DataContext>(opt=>{
    

opt.UseSqlite(config.GetConnectionString("DefaultConnection"));

} );
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// services.AddEndpointsApiExplorer();
// services.AddSwaggerGen();
services.AddCors();
services.AddScoped<ITokenService,TokenService>();
services.AddScoped<IUserRepository,UserRepository>();
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
return services;
    }
}
