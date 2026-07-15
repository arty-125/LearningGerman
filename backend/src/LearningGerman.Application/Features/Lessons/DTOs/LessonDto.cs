using LearningGerman.Domain.Common;

namespace LearningGerman.Application.Features.Lessons.DTOs;

public sealed record LessonSummaryDto(
    Guid Id,
    string Title,
    string ShortDescription,
    int Order,
    int EstimatedMinutes,
    Guid TopicId,
    Guid CategoryId,
    Guid LevelId
);

public sealed record LessonDto(
    Guid Id,
    string Title,
    string ShortDescription,
    int Order,
    int EstimatedMinutes,
    Guid TopicId,
    Guid CategoryId,
    Guid LevelId,
    string ContentJson,
    IReadOnlyList<ExerciseSummaryDto> Exercises
);

public sealed record ExerciseSummaryDto(
    Guid Id,
    ExerciseType Type,
    string Question,
    string Instruction,
    int Order
);
