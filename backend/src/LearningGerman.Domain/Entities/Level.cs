using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class Level : BaseEntity
{
    public string Code { get; private set; } = string.Empty; // "A1", "A2" etc.
    public GermanLevel GermanLevel { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Color { get; private set; } = string.Empty;
    public int Order { get; private set; }

    private readonly List<Category> _categories = [];
    public IReadOnlyCollection<Category> Categories => _categories.AsReadOnly();

    private Level() { } // EF Core

    public static Level Create(
        string code,
        GermanLevel germanLevel,
        string title,
        string description,
        string color,
        int order)
    {
        return new Level
        {
            Code = code,
            GermanLevel = germanLevel,
            Title = title,
            Description = description,
            Color = color,
            Order = order
        };
    }

    public void AddCategory(Category category) => _categories.Add(category);
}
