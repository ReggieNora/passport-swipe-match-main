import * as Sentry from '@sentry/node';

// Initialize Sentry if DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    // Enable performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    // Enable profiling
    profilesSampleRate: 1.0,
  });

  // Optional: Add global error handler
  process.on('unhandledRejection', (reason) => {
    Sentry.captureException(reason);
  });

  process.on('uncaughtException', (error) => {
    Sentry.captureException(error);
    // After reporting, ensure the process exits to prevent undefined behavior
    process.exit(1);
  });
} else {
  console.warn('Sentry DSN not configured. Error tracking is disabled.');
}

// Export the configured Sentry instance
export default Sentry;

// Helper function to wrap async route handlers with Sentry error tracking
export const withSentry = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      Sentry.captureException(error);
      next(error);
    }
  };
};
