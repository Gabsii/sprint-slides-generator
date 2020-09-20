# Changelog

## unreleased

Did some quality control mostly

### Added

- Navigation through header inside the app section
- Meta tags and titles
- Bundle analyzer to cry over how big @zeit-ui is
- Custom 404 page
- Presentation Overview

### Updated

- Login error handling and UX
- simplified layout by using @zeit-ui components everywhere possible

#### Fixed

- Login Problems (no error thrown, etc.)
- Removed some dead code

## [v0.0.3]

### Breaking

- sprints now have a slug property there are some sprints without a slug atm run the seeder using `knex seed:run`

### Added

- Sprints can now be generated
- Better performance by adding prefetching
- Slide Types to unify the way some slides are managed
- Presentation component holds more responsibility now (Slide Navigation, Route Navigation, Fullscreen)
- Added Markdown Parser for story descriptions
- Added an extra route to load profile pictures from Jira

### Updated

- updated presentation library stuff
  - dark mode for spinners
  - bug with overflowable -> line clamping (probably needs a better fix)
- Optimized images
- Updated packages to latest version

### Fixed

- Fixed a critical bug where passwords were exposed in the URL params

## [v0.0.2]

### Breaking

- you now need to run `knex migrate:latest` for the database connection
- database connections, api base urls, etc. are now being handled by an `.env` file

### Added

- Added boards overview
  - one for the teams => loaded immediately 
  - one for other projects => loaded on click
- Added favourite boards
- Added database migrations
- Added dashboard
- Added toasts for global messages
- Added @zeit-ui/react for easier and more aesthetic styling

### Updated

- Improved the Spinner/Loading animations
- Improved Authorization Flows and API abstractions

## [v0.0.1]

### Added 

- Added Basic Auth Login
- Added Login Form
- Added Cookies for Session Management --> Change SECRET in production
- Added Login API
- Added Spinner and Avatar Loader as idle-elements
- Added Breakpoints for responsive designs 
- Added a basic dashboard 
- Added Sprint Presentation Library with default company style
- Added Image Fallback component

[v0.0.3]: https://github.com/Gabsii/sprint-slides-generator/tree/v0.0.1
[v0.0.2]: https://github.com/Gabsii/sprint-slides-generator/tree/v0.0.1
[v0.0.1]: https://github.com/Gabsii/sprint-slides-generator/tree/v0.0.1
[unreleased]: https://github.com/Gabsii/sprint-slides-generator/