# Focusly - Project Todo List

This document outlines a sequential, atomic, and dependency-free task list for the Focusly project based on the PRD, Design System, and Tech Stack recommendations.

## Phase 1: Environment & Infrastructure Setup
- [x] 1. Initialize Next.js 15+ (React 19) frontend project with Tailwind CSS and shadcn/ui.
- [x] 2. Initialize Spring Boot 3.2+ backend project with Web, Data JPA, Security, WebSocket, Redis, Batch, and Flyway dependencies.
- [x] 3. Configure H2 in-memory database dependencies.
- [x] 4. Configure simple Spring Cache instead of Redis.
- [x] 5. Configure Flyway for database migrations in the Spring Boot application.
- [x] 6. Write Flyway migration script for `users` table.
- [x] 7. Write Flyway migration script for core learning tables (`concepts`, `learning_paths`, `user_progress`).
- [x] 8. Write Flyway migration script for quiz and resources tables (`quiz_questions`, `quiz_attempts`, `learning_resources`, `study_sessions`, `tutor_conversations`).
- [x] 9. Configure Spring Boot `application.yml` for H2 and Spring Cache connections.
- [x] 10. Configure Spring Security base setup (disable CSRF, set up stateless session management).
- [x] 11. Implement JWT Authentication Filter and Token Provider in Spring Boot.

## Phase 2: Design System Foundation (Frontend)
- [x] 12. Configure global CSS variables in Next.js (`globals.css`) according to the Design System color palette.
- [x] 13. Install and configure 'Inter' and 'JetBrains Mono' fonts.
- [x] 14. Configure Tailwind CSS theme with the design system's spacing, breakpoints, and colors.
- [x] 15. Create Base Typography components (H1, H2, H3, Body, Caption, Code).
- [x] 16. Build primary, secondary, and ghost Button components with hover/active/disabled states.
- [x] 17. Build Standard and Elevated Card components.
- [x] 18. Build Form Input components (Text Input, Textarea) with focus and error states.
- [x] 19. Build Progress Indicator components (Linear Progress Bar, Circular Progress).
- [x] 20. Build Badge and Tag components with status variants (Success, Warning, Error).
- [x] 21. Install Lucide Icons and build an Icon wrapper component.
- [x] 22. Build layout containers: Sidebar Navigation, Top Navigation, and Main Content area.
- [x] 23. Implement Toast Notification provider for success/error feedback.

## Phase 3: Backend Core Services
- [x] 24. Create JPA Entity models for `User` and Auth domain.
- [x] 25. Create JPA Entity models for `Concept`, `LearningPath`, and `UserProgress`.
- [x] 26. Create JPA Entity models for `QuizQuestion` and `QuizAttempt`.
- [x] 27. Implement Spring Data JPA Repositories for all entity models.
- [x] 28. Implement User Service for registration, login, and profile management.
- [x] 29. Implement Spaced Repetition Service (SM-2 Algorithm) to calculate next review dates.
- [x] 30. Implement AITutorService using WebClient to connect to the Claude API (Anthropic).
- [x] 31. Implement Learning Path Service to generate initial pathways based on user assessment.
- [x] 32. Implement Quiz Service to evaluate answers and update user progress metrics.
- [x] 33. Implement Quiz REST Controller (endpoints for fetching daily quizzes and submitting answers).
- [x] 34. Implement AI Tutor REST Controller (endpoints for asking explanations).
- [x] 35. Set up Spring WebSocket configuration for real-time tutoring chat.
- [x] 36. Configure Scheduled Tasks (Spring Batch/Quartz) to trigger daily review notifications.

## Phase 4: Frontend Feature Implementation
- [x] 37. Build User Registration and Login screens.
- [x] 38. Build the Onboarding Flow: Welcome screen and Learning Preference Survey.
- [x] 39. Build the Onboarding Flow: Initial Knowledge Assessment quiz.
- [x] 40. Integrate Onboarding Flow with backend to generate the initial Learning Path.
- [x] 41. Build the User Dashboard UI (metrics, current streak, active learning paths).
- [x] 42. Integrate Dashboard with backend progress analytics endpoints.
- [x] 43. Build the Learning View interface for studying a concept (text, video, diagrams).
- [x] 44. Build the Spaced Repetition Quiz interface (multiple choice, short answer).
- [x] 45. Integrate the Quiz interface with the backend Quiz Controller.
- [x] 46. Build the Intelligent Tutoring Chat interface (floating or side-panel chat).
- [x] 47. Integrate the Chat interface with the AI Tutor WebSocket/REST backend.
- [x] 48. Build the Progress Analytics & Insights view (charts using recharts or similar library).
- [x] 49. Build the Resource Curation view (displaying recommended articles/videos).

## Phase 5: Polish & Finalization
- [ ] 50. Implement empty states across all views (e.g., "No learning paths yet").
- [ ] 51. Implement global loading states (Skeleton screens) and error fallbacks.
- [ ] 52. Implement micro-interactions (Button scaling, toast animations, celebration confetti).
- [ ] 53. Conduct a keyboard navigation audit to ensure full accessibility (focus rings, ARIA labels).
- [ ] 54. Test responsive layout on mobile (<768px) and tablet sizes.
- [ ] 55. Write unit tests for the Spaced Repetition SM-2 algorithm.
- [ ] 56. Write integration tests for the AI Tutor Service prompt generation.
- [ ] 57. Set up CI/CD pipeline for automated testing and deployment.
