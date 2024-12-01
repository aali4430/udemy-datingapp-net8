using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class Seed
{
public static async Task SeedUser(DataContext dataContext)
{
    if(await dataContext.Users.AnyAsync())
    {
return;
    }
    var userData = await File.ReadAllTextAsync("D:\\DESK-TOP-BACKUP\\DESK-TOP-BACKUP-LINUX\\Anguler-Apps\\Udemy-Courses\\FirstAngAppWithAspNetCoreWebApiEFCore\\DatingApp\\API\\Sample-Data\\UsersSeedData.json");
    var options =  new JsonSerializerOptions{
        PropertyNameCaseInsensitive = true
    };
    
    var users = JsonSerializer.Deserialize<List<AppUser>>(userData,options);
    if(users==null)
    {
        return;
    }
    string pass = "P@$$w0rd";
    foreach (var user in users)
    {
        using var hma = new HMACSHA512();
        user.Username = user.Username.ToLower();
      
        user.PasswordHash = hma.ComputeHash(Encoding.UTF8.GetBytes(pass));
        user.PasswordSalt = hma.Key;
        
        dataContext.Users.Add(user);
        
    }
    await dataContext.SaveChangesAsync();
}
}