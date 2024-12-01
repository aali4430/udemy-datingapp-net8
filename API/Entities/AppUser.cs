using System;

namespace API.Entities;
using API.Extentions;

public class AppUser
{
public int Id { get; set; }
public required string Username { get; set; }
public byte[] PasswordHash { get; set; } = [];

public byte[] PasswordSalt { get; set; } = [];
public DateOnly DateOfBirth { get; set; }
public required string NickName { get; set; }
public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
public DateTime LastActive { get; set; } = DateTime.UtcNow;
public required string Gender { get; set; }
public string? Introduction { get; set; }
public string? Interests { get; set; }
public  string? LookingFor { get; set; }
public required string City { get; set; }
public required string Country { get; set; }
public List<Photo> photos { get; set; } = [];
// public int GetAge(){
//     return this.DateOfBirth.CalculateAge();
// }
}

