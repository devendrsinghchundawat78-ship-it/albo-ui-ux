# Keepsake UI

An original-branded React Native / Expo visual prototype of a save-and-organize app. This is a UI study, not Albo code or assets. It uses generic imagery, original copy and in-session mock data. It does not connect to a backend, real AI extraction, social accounts, reminders, maps, or native share services.

## Run

```bash
npm install
npm run start
```

Press `w` for web, `a` for an Android emulator, or `i` for an iOS simulator. On web, `#profile` opens the Profile screen for visual review.

## Explore

Four bottom tabs: Library, Map, Community and Profile. The top-right plus opens Save. Library has search, category filters, a collapsible onboarding checklist and recently saved items. The Profile screen has original sample identity fields, stats, actions and Posts/Recs/Collections/Software tabs. Existing item details, recipe checklist, collections, chat mockup, planner, calendar, cleanup and movie picker remain available. Actions are previews or local session changes only.

Visual direction was updated from two user-supplied current app screenshots of Library and Profile. Other surfaces are interpretations from an older public walkthrough, not an exact or complete copy of a changing proprietary UI. No source-app logos, mascot, photography or exact personal profile content is used. Native Android/iOS runtime has not been verified; web export compiles and its screens were visually checked.

## Local data and optional hosted sync

The app persists saves, collections, archived saves, profile fields and preference choices on the device with AsyncStorage (browser localStorage on web). There is no user account or cross-device sync yet. Saving a link stores its URL and hostname as a local record; it does **not** fetch or analyze the page. Archive/restore and basic profile edits work locally. Theme preference is stored, but the current UI remains designed in dark mode.

`supabase/schema.sql` defines owner-scoped tables and row-level security policies for a future project. `supabase/adapter.js` is an unconnected adapter contract. It is not initialized in the app, and no Supabase credentials, project, Auth or live sync are included. Test the policies and migration before connecting real user data.

Map screen buttons open Google Maps or Apple Maps search externally through their official links. The embedded map artwork is still a mock, not live tiles or synchronized places. A real in-app Google/Apple map needs native map integration, per-platform configuration, and a Google Maps API key for Android; no key is included in this public repo.
