using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class Category : BaseEntity
{
    public Guid LevelId { get; private set; }
    public Level Level { get; private set; } = null!;
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Icon { get; private set; } = string.Empty;
    public int Order { get; private set; }

    private readonly List<Topic> _topics = [];
    public IReadOnlyCollection<Topic> Topics => _topics.AsReadOnly();

    private Category() { }

    public static Category Create(
        Guid levelId,
        string title,
        string description,
        string icon,
        int order)
    {
        return new Category
        {
            LevelId = levelId,
            Title = title,
            Description = description,
            Icon = icon,
            Order = order
        };
    }

    public void AddTopic(Topic topic) => _topics.Add(topic);
}
