# ─── Stage 1: Build & publish ────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /app

COPY . .
RUN dotnet publish src/LearningGerman.API/LearningGerman.API.csproj \
    --configuration Release \
    --output /app/publish \
    --no-self-contained

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=builder /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production

# Railway injects PORT; ASP.NET 8 reads ASPNETCORE_HTTP_PORTS automatically
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

CMD ["dotnet", "LearningGerman.API.dll"]
