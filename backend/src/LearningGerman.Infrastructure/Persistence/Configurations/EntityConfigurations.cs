using LearningGerman.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LearningGerman.Infrastructure.Persistence.Configurations;

public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
{
    public void Configure(EntityTypeBuilder<Lesson> builder)
    {
        builder.HasKey(l => l.Id);

        builder.Property(l => l.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(l => l.ShortDescription)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(l => l.ContentJson)
            .IsRequired();

        builder.HasMany(l => l.Exercises)
            .WithOne(e => e.Lesson)
            .HasForeignKey(e => e.LessonId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(l => new { l.TopicId, l.Order });
        builder.HasIndex(l => l.LevelId);
    }
}

public class LevelConfiguration : IEntityTypeConfiguration<Level>
{
    public void Configure(EntityTypeBuilder<Level> builder)
    {
        builder.HasKey(l => l.Id);
        builder.Property(l => l.Code).IsRequired().HasMaxLength(3);
        builder.Property(l => l.Title).IsRequired().HasMaxLength(100);
        builder.HasIndex(l => l.Code).IsUnique();

        builder.HasMany(l => l.Categories)
            .WithOne(c => c.Level)
            .HasForeignKey(c => c.LevelId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Title).IsRequired().HasMaxLength(100);
        builder.HasIndex(c => new { c.LevelId, c.Order });

        builder.HasMany(c => c.Topics)
            .WithOne(t => t.Category)
            .HasForeignKey(t => t.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class TopicConfiguration : IEntityTypeConfiguration<Topic>
{
    public void Configure(EntityTypeBuilder<Topic> builder)
    {
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
        builder.HasIndex(t => new { t.CategoryId, t.Order });

        builder.HasMany(t => t.Lessons)
            .WithOne(l => l.Topic)
            .HasForeignKey(l => l.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class UserProgressConfiguration : IEntityTypeConfiguration<UserProgress>
{
    public void Configure(EntityTypeBuilder<UserProgress> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasIndex(p => new { p.UserId, p.LessonId }).IsUnique();
        builder.HasIndex(p => p.UserId);
    }
}
