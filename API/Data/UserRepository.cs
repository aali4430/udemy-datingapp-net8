

using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext dataContext, IMapper mapper) : IUserRepository
{

    #region "Users"
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
         return await dataContext.Users.FindAsync(id);
     
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string userName)
    {
         return await dataContext.Users.Include(x=>x.photos).SingleOrDefaultAsync(s=>s.Username==userName);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await dataContext.Users.Include(x=>x.photos).ToListAsync();
    }
    void IUserRepository.Update(AppUser user)
    {
        dataContext.Entry(user).State = EntityState.Modified; 
    }
    #endregion

    #region  "Members"
       public async Task<MemberDto?> GetMemberByIdAsync(int id)
    {
          return await dataContext.Users
                    .Where(s=>s.Id==id)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();
    
     
    }

    public async Task<MemberDto?> GetMebmerByUsernameAsync(string userName)
    {
         return await dataContext.Users
                    .Where(s=>s.Username==userName)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await dataContext.Users.ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                    .ToListAsync();
    }

    #endregion

    public async Task<bool> SaveAllAsync()
    {
        return await dataContext.SaveChangesAsync()>0; 
    }

   

    
}