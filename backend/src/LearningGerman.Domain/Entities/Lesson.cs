using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class Lesson : BaseEntity
{
    public Guid TopicId { get; private set; }
    public Topic Topic { get; private set; } = null!;
    public Guid CategoryId { get; private set; }
    public Guid LevelId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string ShortDescription { get; private set; } = string.Empty;
    public int Order { get; private set; }
    public int EstimatedMinutes { get; private set; }
    public string ContentJson { get; private set; } = string.Empty; // Serialized LessonSection[]

    private readonly List<Exercise> _exercises = [];
    public IReadOnlyCollection<Exercise> Exercises => _exercises.AsReadOnly();

    private Lesson() { }

    public static Lesson Create(
        Guid topicId,
        Guid categoryId,
        Guid levelId,
        string title,
        string shortDescription,
        int order,
        int estimatedMinutes,
        string contentJson)
    {
        return new Lesson
        {
            TopicId = topicId,
            CategoryId = categoryId,
            LevelId = levelId,
            Title = title,
            ShortDescription = shortDescription,
            Order = order,
            EstimatedMinutes = estimatedMinutes,
            ContentJson = contentJson
        };
    }

    public void AddExercise(Exercise exercise) => _exercises.Add(exercise);

    public void UpdateContent(string contentJson)
    {
        ContentJson = contentJson;
        UpdateTimestamp();
    }
}
