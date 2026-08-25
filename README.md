# Real Ease Backend

Real Ease is a real-estate operations platform designed to give property teams a clear, data-driven view of their business. The product direction is represented by the accompanying Arabic dashboard concept: a focused workspace for monitoring properties, listings, sales activity, and performance in one place.

This repository contains the Laravel backend for the Real Ease platform.

## Product Focus

- Centralized property and listing management
- Operational dashboards for real-estate teams
- Sales and portfolio performance reporting
- Arabic-first, right-to-left user experiences
- A dependable API and application foundation for the web client

The current repository is an early Laravel application foundation. Domain modules and authenticated dashboard workflows will be introduced as the product evolves.

## Technology

- PHP 8.2+
- Laravel 12
- SQLite by default for local development
- Vite 7 and Tailwind CSS 4 for frontend assets
- PHPUnit for automated tests

## Requirements

Install the following before getting started:

- PHP 8.2 or newer
- Composer
- Node.js and npm
- A supported database such as SQLite or MySQL

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/mhmod33/real-ease-back.git
cd real-ease-back
composer run setup
```

The setup script installs PHP and JavaScript dependencies, creates the local environment file, generates the application key, runs migrations, and builds frontend assets.

## Local Development

Start the complete development environment with:

```bash
composer run dev
```

This starts the Laravel server, queue listener, application log viewer, and Vite development server.

For a backend-only session:

```bash
php artisan serve
```

The application is then available at `http://localhost:8000`.

## Testing

Run the test suite with:

```bash
composer run test
```

Code style can be checked and applied with Laravel Pint:

```bash
vendor/bin/pint
```

## Project Structure

```text
app/          Application code, controllers, models, and providers
bootstrap/    Framework bootstrap configuration
config/       Application and service configuration
database/     Migrations, factories, and seeders
resources/    Blade views, JavaScript, and CSS source files
routes/       HTTP and console route definitions
tests/        Feature and unit tests
```

## Configuration

Copy `.env.example` to `.env` when setting up manually, then configure the application URL and database connection. Never commit environment files or production credentials.

## Roadmap

- Establish the core property, unit, and listing data models
- Add authentication and role-based access control
- Expose dashboard-ready reporting endpoints
- Support Arabic and English localization with RTL layout metadata
- Add production observability, queues, and deployment documentation

## License

Real Ease is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
