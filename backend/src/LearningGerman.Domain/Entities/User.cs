using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class User : BaseEntity
{
    public string DisplayName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string? AvatarUrl { get; private set; }
    public string NativeLanguage { get; private set; } = "en";
    public GermanLevel TargetLevel { get; private set; } = GermanLevel.A1;

    private readonly List<UserProgress> _progress = [];
    public IReadOnlyCollection<UserProgress> Progress => _progress.AsReadOnly();

    private User() { }

    public static User Create(string displayName, string email, string nativeLanguage = "en")
    {
        return new User
        {
            DisplayName = displayName,
            Email = email,
            NativeLanguage = nativeLanguage
        };
    }

    public void SetTargetLevel(GermanLevel level)
    {
        TargetLevel = level;
        UpdateTimestamp();
    }
}
