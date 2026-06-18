# Security Specification - Medicare Platform

## Data Invariants
- `Appointment` documents must have a `patientId` matching the creator's UID.
- `Notification` documents are only readable by the `userId` field matching the request auth UID.
- `CMSContent` is publicly readable but only writable by users with the `admin` role (verified via `users` collection lookup).
- `User` profiles are only writable by the owner.
- `Doctor` profiles can be created by admins.

## The Dirty Dozen Payloads

1. **Identity Spoofing (Appointment)**: Create appointment with `patientId` of another user.
2. **Identity Spoofing (User Profile)**: Update `role` field on own profile to `admin`.
3. **Privilege Escalation (CMS)**: Non-admin trying to update `hero` content.
4. **Data Leak (Notification)**: Reading notifications belonging to `userId: "other_user"`.
5. **PII Breach (User)**: Reading `email` of another user's profile.
6. **Orphaned Write (Appointment)**: Creating appointment with non-existent `doctorId`.
7. **Resource Poisoning (Doctor)**: Injecting 2MB string into `bio` field.
8. **State Shortcutting (Appointment)**: Directly setting `status: "Confirmed"` during creation.
9. **Timestamp Manipulation**: Manually setting `createdAt` to a past date.
10. **Shadow Field Injection**: Adding `isVerified: true` to a user profile update.
11. **Bypassing Master Gate**: Updating an appointment without valid project membership (not applicable here, but similar to cross-tenant check).
12. **Unauthorized Deletion**: Deleting another user's appointment.

## Test Runner (Logic Check)
The tests will verify that all above payloads return `PERMISSION_DENIED`.
