using LearningGerman.Domain.Common;

namespace LearningGerman.Domain.Entities;

public class UserProgress : BaseEntity
{
    public Guid UserId { get; private set; }
    public User User { get; private set; } = null!;
    public Guid LessonId { get; private set; }
    public Lesson Lesson { get; private set; } = null!;
    public CompletionStatus Status { get; private set; } = CompletionStatus.NotStarted;
    public int Score { get; private set; } // 0–100
    public int Attempts { get; private set; }
    public DateTime? CompletedAt { get; private set; }

    private UserProgress() { }

    public static UserProgress Create(Guid userId, Guid lessonId)
    {
        return new UserProgress
        {
            UserId = userId,
            LessonId = lessonId,
            Status = CompletionStatus.InProgress,
            Attempts = 1
        };
    }

    public void MarkComplete(int score)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(score);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(score, 100);

        Status = CompletionStatus.Completed;
        Score = score;
        CompletedAt = DateTime.UtcNow;
        Attempts++;
        UpdateTimestamp();
    }

    public void RecordAttempt()
    {
        Attempts++;
        UpdateTimestamp();
    }
}
