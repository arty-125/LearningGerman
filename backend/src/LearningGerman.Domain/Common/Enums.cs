namespace LearningGerman.Domain.Common;

public enum GermanLevel
{
    A1 = 1,
    A2 = 2,
    B1 = 3,
    B2 = 4,
    C1 = 5,
    C2 = 6
}

public enum CompletionStatus
{
    NotStarted = 0,
    InProgress = 1,
    Completed = 2
}

public enum ExerciseType
{
    MultipleChoice = 0,
    FillInBlank = 1,
    Translation = 2,
    WordOrder = 3,
    Matching = 4,
    TrueFalse = 5
}

public enum LessonSectionType
{
    Explanation = 0,
    Example = 1,
    Tip = 2,
    Warning = 3,
    Table = 4,
    List = 5
}
