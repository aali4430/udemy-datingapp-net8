using API.DTOs;
using API.Entities;

namespace API.Interfaces;
public interface IUserRepository
{

    #region Users
    Task <IEnumerable<AppUser>> GetUsersAsync();
    Task <AppUser?> GetUserByIdAsync(int id);
    Task <AppUser?> GetUserByUsernameAsync(string userName);

    void Update(AppUser user);
    #endregion
    
    #region Mambers
    Task <IEnumerable<MemberDto>> GetMembersAsync();
    Task <MemberDto?> GetMemberByIdAsync(int id);
    Task <MemberDto?> GetMebmerByUsernameAsync(string userName);
    #endregion

    Task<bool> SaveAllAsync();

}