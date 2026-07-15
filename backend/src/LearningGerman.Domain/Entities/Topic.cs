using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class Topic : BaseEntity
{
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = null!;
    public Guid LevelId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public int Difficulty { get; private set; } // 1–5
    public int EstimatedMinutes { get; private set; }
    public int Order { get; private set; }
    public string Tags { get; private set; } = string.Empty; // JSON array stored as string

    private readonly List<Lesson> _lessons = [];
    public IReadOnlyCollection<Lesson> Lessons => _lessons.AsReadOnly();

    private Topic() { }

    public static Topic Create(
        Guid categoryId,
        Guid levelId,
        string title,
        string description,
        int difficulty,
        int estimatedMinutes,
        int order)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(difficulty, 1);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(difficulty, 5);

        return new Topic
        {
            CategoryId = categoryId,
            LevelId = levelId,
            Title = title,
            Description = description,
            Difficulty = difficulty,
            EstimatedMinutes = estimatedMinutes,
            Order = order
        };
    }

    public void AddLesson(Lesson lesson) => _lessons.Add(lesson);
}
