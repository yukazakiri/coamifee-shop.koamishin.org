# Contribution Guide

- [Environment Setup](#environment-setup)
- [Where to start?](#where-to-start)
- [Development Discussion](#development-discussion)
- [Which Branch?](#which-branch)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Coding Style](#coding-style)
- [Code Quality](#code-quality)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Pre Commit](#pre-commit)
- [Code of Conduct](#code-of-conduct)

## Environment Setup

Set up your local environment by following the [installation documentation](../getting-started/installation.mdx#install-locally)

Make sure you have the following installed:
- PHP 8.4+
- Node.js 18+
- Composer
- Git
- Docker (optional, for containerized development)

## Where to start?

If you want to start right away, we recommend you to start from the open issues in the `Todo` state.

You can find them [here](https://github.com/yukazaki/coamifee-shop/issues?q=is%3Aissue+is%3Aopen+label%3A%22Todo%22)

They're sorted by priority. So feel free to pick an unassigned one. Drop a comment so we can assign it to you.

### Focus Areas

We're currently focusing on these development phases:

- **Phase 2 (In Progress)**: Core business features
  - Product Management
  - Inventory Management
  - Order Processing
  - Customer Management

- **Phase 3 (Planned)**: Advanced features
  - Analytics & Reporting
  - Advanced POS features
  - Inventory optimization
  - Customer experience enhancements

:::warning
If you want to work on something which is not listed in the `Todo` issues. Please read the below section!
:::

## Development Discussion

You may propose new features or improvements of existing behavior in the repository's [Discussion Board](https://github.com/yukazaki/coamifee-shop/discussions). If you propose a new feature, please be willing to implement at least some of the code that would be needed to complete the feature.

Informal discussion regarding bugs, new features, and implementation of existing features takes place in the `#ideas` channel of our [Discord](https://discord.gg/coamifee-shop) server.

### Feature Proposal Guidelines

When proposing new features, please include:
- **Problem Statement**: What problem does this solve for coffee shop owners?
- **User Story**: How would a coffee shop owner use this feature?
- **Technical Approach**: How do you envision implementing it?
- **Mockups/Wireframes**: Visual representation if applicable

:::warning
Please do not refactor any existing code without discussing it with the maintainers first.
:::

## Which Branch?

All bug fixes should be sent to the latest version that supports bug fixes (currently `1.x`).

Minor features that are fully backward compatible with the current release may be sent to the latest stable branch (currently `1.x`).

Major new features or features with breaking changes should always be sent to the `main` branch, which contains the upcoming major release.

### Branch Strategy

- `main`: Latest development, may contain unstable features
- `1.x`: Current stable release branch
- `1.x-develop`: Development for current release cycle

## Security Vulnerabilities

If you discover a security vulnerability within the Coffee Shop Management System, please email to security@coamifee-shop.com.

All security vulnerabilities will be promptly addressed.

## Coding Style

The coding style is already hardcoded in configurations inside the project.

### PHP Code Style

For PHP codes you may run:
```bash
./vendor/bin/pint
```

### Frontend Code Style

For frontend codes and bash scripts you may run:
```bash
npm run format
```

Code style is enforced by the CI pipeline, so please ensure your code passes all checks before submitting a pull request.

### Laravel Conventions

Follow Laravel conventions:
- Use Laravel's built-in features and helpers
- Follow Laravel naming conventions
- Use Eloquent relationships instead of raw queries when possible
- Implement proper validation using Form Requests

## Code Quality

We use [PHPStan](https://phpstan.org/) for static analysis of the PHP code and [ESLint](https://eslint.org/) for the frontend code.

You can run the static analysis tools locally by running the following commands:

```bash
# For PHP code
./vendor/bin/phpstan analyse

# For JavaScript/TypeScript code
npm run lint
```

Code quality is enforced by the CI pipeline, so please ensure your code passes all checks before submitting a pull request.

## Testing Requirements

All contributions must include tests. We use [Pest](https://pestphp.com/) for testing.

### Test Types

- **Unit Tests**: Test individual classes and methods
- **Feature Tests**: Test application features and workflows
- **Browser Tests**: Test user interactions in a real browser

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/ProductTest.php

# Run with coverage
php artisan test --coverage
```

### Testing Guidelines

- Write tests before implementing features (TDD approach)
- Test both success and failure scenarios
- Mock external dependencies
- Test database interactions
- Ensure tests cover edge cases

## Documentation

All new features must include appropriate documentation:

### Code Documentation

- Add PHPDoc blocks to all classes and methods
- Document complex business logic
- Include usage examples in docblocks

### User Documentation

- Update relevant documentation files if changing user-facing features
- Add screenshots or examples for new features
- Update API documentation if adding new endpoints

### Inline Comments

- Use comments sparingly and only for complex logic
- Prefer self-documenting code over excessive comments
- Document business rules and domain-specific logic

## Pre Commit

To ensure all actions will pass, you can locally run the pre-commit command:

```bash
composer pre-commit
```

This command will:
- Format your code
- Run tests
- Check PHPStan
- Verify code style
- Check for security issues

## Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Write** tests for your feature
4. **Implement** the feature
5. **Run** the pre-commit checks: `composer pre-commit`
6. **Commit** your changes with descriptive messages
7. **Push** to your fork
8. **Create** a Pull Request

### Commit Message Format

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(pos): add split payment functionality

Implement split payment feature for POS system
allowing customers to pay with multiple methods.

Closes #123
```

```
fix(inventory): resolve stock calculation issue

Fix negative stock values when processing refunds
due to incorrect inventory movement tracking.
```

## Code of Conduct

Violations of the code of conduct should be reported to conduct@coamifee-shop.com.

### Our Pledge

- Participants should embrace tolerance toward differing opinions
- It is imperative for participants to use language and exhibit behaviors that avoid personal attacks and demeaning comments
- When evaluating the statements and actions of others, it is crucial to presume positive intentions
- Any behavior deemed as reasonably constituting harassment is strictly prohibited

### Expected Behavior

- Be respectful and inclusive
- Focus on what is best for the coffee shop community
- Show empathy towards other community members
- Accept constructive criticism gracefully

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Personal attacks or insults
- Public or private harassment
- Publishing others' private information

## Getting Help

If you need help with contributing:

- **Discord**: Join our [Discord server](https://discord.gg/coamifee-shop)
- **GitHub Discussions**: Ask questions in [discussions](https://github.com/yukazaki/coamifee-shop/discussions)
- **Issues**: Report bugs or request features in [issues](https://github.com/yukazaki/coamifee-shop/issues)

## Recognition

Contributors are recognized for their valuable contributions:

- **Contributors section**: All contributors are listed in the README
- **Release notes**: Significant contributors are mentioned in release notes
- **Community highlights**: Outstanding contributions are featured in our blog

Thank you for contributing to the Coffee Shop Management System! Your contributions help make coffee shop management better for everyone.