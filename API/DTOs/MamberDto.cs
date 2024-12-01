namespace API.DTOs;
public class MemberDto
{
public int Id { get; set; }
public string? Username { get; set; }
public string? NickName { get; set; }
public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
public DateTime LastActive { get; set; } = DateTime.UtcNow;
public required string Gender { get; set; }
public string? Introduction { get; set; }
public string? Interests { get; set; }
public  string? LookingFor { get; set; }
public string? City { get; set; }
public string? Country { get; set; }
public string? PhotoUrl { get; set; } 
public List<PhotoDto>? photos { get; set; } 
public int Age { get; set; }

}

public class PhotoDto
{
public int Id { get; set; }
public string? Url { get; set; }
public bool IsMain { get; set; }

}