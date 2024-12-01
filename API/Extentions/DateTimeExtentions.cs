using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
namespace API.Extentions;
public static class DateTimeExtentions
{
    public static int CalculateAge(this DateOnly dob)
    {
        var today = DateOnly.Parse(DateTime.Now.ToShortDateString());
        var Age = today.Year - dob.Year;
        if(Age<0)
        {
            Age++;
        }
        return Age;
    }
} 