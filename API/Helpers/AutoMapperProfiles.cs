using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;
using AutoMapper.Internal;

namespace API.Helpers;
public class AutoMaperProfiles: Profile
{
    public AutoMaperProfiles(){
        CreateMap<AppUser, MemberDto>()
            .ForMember(d=>d.Age,o=>o.MapFrom(s=>s.DateOfBirth.CalculateAge() ))
            .ForMember(d=>d.PhotoUrl, o=> o.MapFrom(s=>s.photos.FirstOrDefault(x=>x.IsMain==true)!.Url));
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto,AppUser>();
        CreateMap<MemberUpdateDto,MemberDto>();
    }
}