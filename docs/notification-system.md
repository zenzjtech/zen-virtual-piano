# Notification System

## Overview

The application uses a centralized notification system built with Material-UI's Snackbar component to provide user feedback throughout the app.

## Architecture

### Components

- **NotificationProvider** (`src/contexts/notification-context.tsx`)
  - Context provider that wraps the entire app
  - Manages notification state (message, severity, visibility)
  - Renders the Snackbar component

- **useNotification Hook**
  - Custom hook to access notification functionality
  - Returns `showNotification` function

## Usage

### Import the Hook

```typescript
import { useNotification } from '@/contexts/notification-context';
```

### Show a Notification

```typescript
const { showNotification } = useNotification();

// Success notification
showNotification('Operation successful!', 'success');

// Error notification
showNotification('Something went wrong', 'error');

// Info notification
showNotification('Information message', 'info');

// Warning notification
showNotification('Warning message', 'warning');
```

## Severity Types

- `success` - Green, for successful operations
- `error` - Red, for errors and failures
- `info` - Blue, for informational messages
- `warning` - Orange, for warnings

## Configuration

- **Auto-hide duration**: 4 seconds
- **Position**: Top-center
- **Variant**: Filled
- **Close behavior**: Clickaway is disabled

## Current Implementations

### Authentication Notifications

1. **Auto-login Success** (`use-auth-restore.ts`)
   - Message: "Welcome back, [Name]! 👋"
   - Severity: Success
   - Trigger: On successful auth session restoration

2. **Manual Login Success** (`header.tsx`)
   - Message: "Welcome, [Name]! 🎹"
   - Severity: Success
   - Trigger: On successful Google OAuth login

3. **Login Error** (`header.tsx`)
   - Message: "Failed to sign in. Please try again."
   - Severity: Error
   - Trigger: On authentication failure

4. **Logout Success** (`header.tsx`)
   - Message: "Signed out successfully"
   - Severity: Info
   - Trigger: On successful logout

5. **Logout Error** (`header.tsx`)
   - Message: "Failed to sign out. Please try again."
   - Severity: Error
   - Trigger: On logout failure

## Future Enhancements

- Add action buttons to notifications (e.g., "Undo")
- Support for notification queue (multiple notifications)
- Configurable duration per notification
- Different positions for different notification types
- Persistent notifications for critical messages
