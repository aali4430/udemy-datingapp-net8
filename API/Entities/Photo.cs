using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    /// <summary>
    /// Id From Cloud
    /// </summary>
    public string? PublicId { get; set; }
    // Navigation properties
    public AppUser AppUser { get; set; } = null!; // null forgiving operator for EF One-Many with required foreign Key
}