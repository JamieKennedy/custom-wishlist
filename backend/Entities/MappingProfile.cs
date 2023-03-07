using AutoMapper;
using Entities.Models.User;

namespace Entities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User
            CreateMap<UserRegistrationDto, User>()
                .ForMember(user => user.UserName,
                    opt => opt.MapFrom(userRegistrationDto => userRegistrationDto.Email));
        }

        public static IMapper CreateMapper()
        {
            return new MapperConfiguration(configuration => configuration.AddProfile(new MappingProfile())).CreateMapper();
        }
    }
}