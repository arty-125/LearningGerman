using LearningGerman.Domain.Common;

namespace LearningGerman.Application.Features.Progress.DTOs;

public sealed record ProgressDto(
    Guid UserId,
    Guid LessonId,
    CompletionStatus Status,
    int Score,
    int Attempts,
    DateTime? CompletedAt
);

public sealed record UserProgressSummaryDto(
    Guid UserId,
    int TotalLessonsCompleted,
    int TotalAttempts,
    IReadOnlyList<ProgressDto> LessonProgress
);
