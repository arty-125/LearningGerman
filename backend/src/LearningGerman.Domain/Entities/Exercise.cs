using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class Exercise : BaseEntity
{
    public Guid LessonId { get; private set; }
    public Lesson Lesson { get; private set; } = null!;
    public ExerciseType Type { get; private set; }
    public string Question { get; private set; } = string.Empty;
    public string Instruction { get; private set; } = string.Empty;
    public string OptionsJson { get; private set; } = "[]"; // Serialized ExerciseOption[]
    public string? CorrectAnswer { get; private set; }
    public string? Hint { get; private set; }
    public string Explanation { get; private set; } = string.Empty;
    public int Order { get; private set; }

    private Exercise() { }

    public static Exercise Create(
        Guid lessonId,
        ExerciseType type,
        string question,
        string instruction,
        string explanation,
        int order,
        string? hint = null,
        string? correctAnswer = null,
        string optionsJson = "[]")
    {
        return new Exercise
        {
            LessonId = lessonId,
            Type = type,
            Question = question,
            Instruction = instruction,
            Explanation = explanation,
            Order = order,
            Hint = hint,
            CorrectAnswer = correctAnswer,
            OptionsJson = optionsJson
        };
    }
}
