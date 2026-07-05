# JAMS (Judicial Archive Management System)

This document provides a technical overview of the Judicial Archive Management System (JAMS). JAMS is an enterprise-grade document ingestion, processing, and retrieval platform built specifically for judicial institutions. It solves the problem of digitizing, indexing, and securely searching massive volumes of physical and digital legal records. The system provides a unified interface for archivists and legal personnel to manage Arabic documents, ensuring strict access control and real-time operational visibility.


# What's JAMS ?

JAMS is a professional archival and document management system designed for judicial institutions. It provides secure document storage, OCR text extraction, and vector-based semantic search to efficiently manage and retrieve legal records.

## Architecture

The system implements a decoupled client-server architecture utilizing a modern, high-performance tech stack:
- **Backend:** Node.js with Express.js handles API routing, authentication, and job orchestration.
- **Frontend:** React application utilizing TypeScript, styled with TailwindCSS and Shadcn UI components.
- **Database:** PostgreSQL stores relational application data and schema configurations. It is equipped with the `pgvector` extension for storing and querying high-dimensional vector embeddings, and `pg_trgm` for trigram-based string matching. Drizzle ORM is used for type-safe database interactions and migrations.
- **Caching and Pub/Sub:** Redis provides fast, in-memory caching for sessions and orchestrates background job queues via BullMQ.
- **Full-Text Search:** Meilisearch acts as a secondary search engine, maintaining inverted indices for sub-100ms full-text retrieval of document metadata and OCR content.
- **Storage:** MinIO functions as an S3-compatible object storage layer for raw files, processed PDFs, and system logs.
- **Real-Time Communication:** Socket.IO enables duplex communication between the server and clients for live dashboard updates and background job progress events.
- **Security:** A custom, hardware-bound licensing system enforces operational constraints by validating cryptographic signatures against machine-specific fingerprints on boot. The system uses a four-state license model (VALID, EXPIRING_SOON, GRACE_PERIOD, EXPIRED) and **never shuts down** — it degrades gracefully to read-only mode, ensuring data is always accessible.

## Key Capabilities

**Document Ingestion**
The system accepts digital files and physical scans via a unified upload pipeline. Uploads are immediately persisted to MinIO object storage, ensuring data durability before any processing occurs. The ingestion pipeline supports bulk operations and automatically deduces file types and required processing steps.

**Optical Character Recognition (OCR)**
For scanned images and image-based PDFs, the system delegates text extraction to Tesseract.js. This process runs in a background queue managed by BullMQ. The workers extract raw text, preserving structural formatting where possible, and store the output for downstream indexing.

**Embedding Generation**
Extracted text and metadata are passed through a local ONNX runtime environment utilizing HuggingFace Transformers. This component generates dense vector embeddings representing the semantic meaning of the document content. These embeddings are then stored in PostgreSQL using `pgvector`.

**Semantic Search**
The primary search interface combines precise keyword matching via Meilisearch with semantic similarity searches via PostgreSQL. When a user queries the system, the input is converted into a vector embedding. The database executes a cosine distance nearest-neighbor search, returning conceptually relevant documents even if exact keywords are absent.

**Role-Based Access Control (RBAC)**
Access to endpoints and data is governed by a strict role hierarchy. Users are assigned specific roles (e.g., admin, operator, viewer) that determine their permission matrix. The backend validates session tokens and user roles before executing any state-mutating operations or returning sensitive records.

**Audit Logging**
Every critical action—from authentication attempts to document modifications—is recorded in a permanent audit trail. These logs capture the user identity, timestamp, targeted resource, and the specific mutation performed, providing forensic visibility into system usage.

**Real-Time Dashboard**
System health metrics, worker queue statuses, and recent activity streams are broadcast to connected clients via Socket.IO. This provides administrators with a live, operational view of processing throughput and infrastructure health without requiring manual page refreshes.

**Arabic RTL Support**
The entire user interface and internal processing pipelines are engineered to support Right-To-Left (RTL) text. This includes specialized OCR training data for Arabic script, bidi-aware text rendering in the frontend, and correct alignment of all UI components.

## Data Flow

A document progresses through the system in a linear, queued pipeline:
1. **Upload:** A client submits a file, which is instantly written to a designated MinIO storage bucket.
2. **Queuing:** A processing job is added to Redis via BullMQ.
3. **OCR Processing:** A background worker retrieves the file from MinIO, extracts text via Tesseract, and updates the database record.
4. **Embedding Generation:** The raw text is chunked and processed by the ONNX runtime to produce vector representations.
5. **Vector Indexing:** The embeddings are committed to the PostgreSQL database in a `pgvector`-enabled column.
6. **Full-Text Indexing:** The document metadata and OCR text are synchronized to the Meilisearch index.
7. **Availability:** The document is now fully retrievable via both semantic and exact-match search queries.

## Security Model

Security is enforced at multiple layers. The foundation is a hardware-bound license file verified on server boot; if the cryptographic signature or machine fingerprint is invalid, the system starts in **degraded mode** — it never exits. The four-state license model (VALID, EXPIRING_SOON, GRACE_PERIOD, EXPIRED) ensures data remains accessible regardless of license status. User authentication relies on secure session management backed by PostgreSQL and Redis. Every API request is subjected to the RBAC middleware, which rejects unauthorized access. Furthermore, the mandatory audit trail ensures non-repudiation for all data modifications.

## Infrastructure

The application relies on several Dockerized services for local development and deployment:
- `jams-postgres`: A PostgreSQL container pre-configured with the `pgvector` extension.
- `jams-redis`: A standard Redis container for queue management and caching.
- `jams-meilisearch`: A search engine container providing rapid full-text capabilities.
- `jams-minio`: An S3-compatible storage container for handling document binaries.

## Development Notes

The project has been fully migrated from Supabase to session-based authentication (express-session + PostgreSQL) and self-hosted infrastructure. Supabase removal is complete as of this branch.

During recent system health validations, a few implementation details were addressed:
- The Meilisearch index initialization logic (`papers` and `jams_global`) was previously missing from the startup sequence and has been integrated into `server/index.ts`.
- The database automated backup script contained hardcoded Windows paths for `pg_dump`; this was corrected to execute the dump directly against the PostgreSQL Docker container.
- An environment constraint remains regarding the local ONNX runtime binary on Windows, which logs an architecture mismatch but does not halt core API services. 

These changes stabilize the core offline capabilities and ensure the system operates entirely within an air-gapped environment.

## Domain Model Clarification

### Core Entities

The product's domain model is a **document archive**, not a case-management system. There is no `cases` table in the schema. The core entities are:

- **Documents** (`documents` table): The central entity. Each document has a title, reference number, category, status, and a `section_id` linking it to a physical storage location. Documents can contain multiple `papers` (individual pages/scanned files).
- **Papers** (`papers` table): Individual pages or scanned files belonging to a document. Each paper has OCR-extracted text, file metadata, and processing status.
- **Folders** (`folders` table): Hierarchical folders within a document used to organize papers.
- **Blocks / Rows / Sections** (`blocks`, `rows`, `sections` tables): A three-level physical storage hierarchy. `blocks` represent major legal departments (e.g., "القسم المدني", "القسم الجنائي"). Each block contains `rows`, and each row contains `sections` — the actual physical location where a document is stored. A document's `section_id` points to the `sections` table.
- **Metadata Registry** (`metadata_registry` table): A polymorphic registry that stores both document categories (`category = 'doc_categories'`) and document statuses (`category = 'doc_statuses'`). Categories include مدني/جنائي/تجاري etc. Statuses include نشط/معلق/مقبول/مؤرشف/مسودة.

### Filter Dropdowns (Documents Page) — Verified Against Schema

1. **الكتلة / القسم** (Block/Section): Backed by the `blocks` table. Represents the top-level legal department (e.g., "القسم المدني" = Civil Division). Despite the label including "قسم", this is NOT the `sections` table — it is the `blocks` table, which in the seed data contains entries like `القسم المدني`. The `sections` table is a finer-grained physical location within a row inside a block. The filter fetches from `/api/blocks` and sends `blockId` to the documents endpoint. **Correction on prior guess**: The label "الكتلة / القسم" refers to the `blocks` table (major legal departments), not a shelf/box physical location. The physical storage hierarchy is `blocks → rows → sections`, where `sections` is the leaf-level physical location. The label is ambiguous because the seeded block labels themselves contain the word "القسم" (e.g., "القسم المدني").

2. **الفئة القضائية** (Judicial Category): Backed by `metadata_registry` where `category = 'doc_categories'`. This is a subject-matter classification: مدني (Civil), جنائي (Criminal), تجاري (Commercial), etc. This matches the prior guess correctly — it is a legal classification, not a physical location.

3. **حالة الملف** (File Status): Backed by `metadata_registry` where `category = 'doc_statuses'`. Document statuses include: نشط (Active), معلق (Pending), مقبول (Approved), مؤرشف (Archived), مسودة (Draft), محذوف (Deleted). These are real document lifecycle statuses.

4. **أرشيف مادي** (Physical Archive) toggle: Not backed by a column filter — it controls whether the document search result list also includes `archive_indexes` entries (physical archive index records). When enabled, a parallel hybrid search is performed against the `archive_indexes` table.

5. **أوراق / وثائق / الكل** (Papers / Documents / All) toggle: Controls the Meilisearch search scope. "وثائق" restricts search to document-level fields (title, reference). "أوراق" restricts to paper-level fields (paper content). "الكل" searches both. This matches the prior guess: "أوراق" = individual papers/pages, "وثائق" = assembled multi-page documents.

### Removal of Fake "Cases" Concept

An earlier `/api/cases` endpoint and a "القضايا" dashboard tab were built by querying the `documents` table and reshaping documents into a fake case shape (caseNumber from doc.reference, title from doc.title, type from doc.category, etc.). This was a domain-model mismatch — there are no cases in the product. The `/api/cases` route has been removed, and the dashboard tab has been renamed to "الوثائق الأخيرة" (Recent Documents) with columns reflecting real document fields. Synthetic SEED-prefixed test documents (301 rows) that were being displayed as fake cases have been deleted from the database.

### Tier 2 — Background Push Notifications (Not Yet Built)

True background push notifications that fire even when the browser/tab is closed require a Service Worker with the Push API, VAPID keys, and a backend that can trigger pushes at the right time. This is separate, properly-scoped infrastructure work. The current Tier 1 implementation handles:
- In-app notifications via the bell dropdown (Radix Popover + `NotificationContext`)
- Desktop notifications via the Notification API when the tab is open, routed through `notification-sw.js` via `postMessage`
- A server-side BullMQ reminder worker that checks every 60s and emits `calendar_reminder` via Socket.IO to `user:{id}` rooms
- Per-category and DND filtering via `notification-preferences.ts`

Tier 2 would add `push` event listeners to the SW, a subscription endpoint on the server, and VAPID-based push delivery so reminders arrive even when no browser tab is open. This is a well-scoped future piece of work, not a gap in the current implementation.

## Future Roadmap

### Case Management Feature (Not Yet Built — Scoped Deliberately)

Legal-case tracking is a genuinely strong feature for a product sold to lawyers and judicial institutions. When built, it deserves its own deliberate schema and implementation — not a bolted-on mapping from documents. Recommended design:

- **`cases` table**: id, case_number, title, case_type, status (active/pending/closed/appealed), court_room, judge, filing_date, hearing_date, next_hearing_date, jurisdiction, created_by, created_at, updated_at.
- **`case_documents` join table**: id, case_id, document_id, role (plaintiff_exhibit/defendant_exhibit/court_filing), filed_by, filed_at. This keeps the clean separation between the document archive and case management — documents exist in the archive independently and are linked to cases as needed.
- **`case_parties` table**: id, case_id, party_name, party_type (plaintiff/defendant/lawyer/judge), contact_info.
- **Hearing/Appearance tracking** could use the existing `calendar_events` table extended with a `case_id` foreign key.
- **Dashboard card**: A dedicated "ملف القضايا" (Case File) card with its own filtered views, hearing calendar integration, and per-case document browser.

This feature should be scoped in its own future development round — not built incidentally. The current product is a document archive, and the UI now correctly reflects that.

## Document Category System

Categories and statuses are managed through the `metadata_registry` table, a polymorphic registry that stores both document categories (`category = 'doc_categories'`) and document statuses (`category = 'doc_statuses'`). This was upgraded to be the authoritative source of truth rather than relying on free-text string matching.

### Schema (metadata_registry upgrades)

The table was enhanced with three new columns:

- `slug` (text, unique) — A permanent, meaningless stable identifier generated server-side as a random base32 id (e.g. `cat-7h2k9x`). It is NEVER derived from or dependent on the Arabic label text. Once created, a slug never changes — even if the admin renames the category. This ensures that nothing downstream (sidebar routes, saved filters, API consumers) breaks when a display name is corrected.
- `is_system` (boolean, default false) — Marks categories that ship with the product by default. System categories can be renamed and recolored but not deleted.
- `deleted_at` (timestamp, nullable) — Enables soft-delete so removing a category from active use doesn't orphan historical documents that still reference it.

A unique index was added on `(category, key)` to prevent duplicate entries, and a unique index on `slug`.

A `category_id` foreign key column (nullable, references `metadata_registry.id`, ON DELETE SET NULL) was added to the `documents` table with an index. The old free-text `category` column is kept temporarily and is scheduled for removal in a follow-up migration once the FK population is verified in production (marked with a TODO comment in the schema).

### Validation (server/validators/category-validator.ts)

A shared validation module enforces rules for both create and edit operations:

- **nameAr** (label_ar): Required, 2–60 characters, must contain at least one Arabic Unicode character (U+0600–U+06FF) unless the `intentionallyNonArabic` flag is set via the admin checkbox "هذا الاسم بلغة أخرى عمداً".
- **nameEn** (label_en): Optional, 0–60 characters, no script restriction.
- **color** (color_code): Required, must match strict 6-digit hex pattern (`^#[0-9A-Fa-f]{6}$`) and pass WCAG AA minimum contrast (≥ 3.0) against both white (#FFFFFF) and the page cream background (#FAF6EE).
- **icon** (icon_name): Required, must be one of the known icon names from the shared icon registry.
- **Duplicate detection**: NFKC normalization + case-fold exact match check. Additionally, a Levenshtein-based similarity score (≥ 0.7) triggers a non-blocking inline warning suggesting the admin use the existing similar category instead.

### Direction-Aware Rendering (client/src/components/ui/category-label.tsx)

The `<CategoryLabel>` component replaces raw string rendering everywhere categories appear. It:
- Detects the first strong directional character in the string to determine RTL vs LTR
- Applies `dir="auto"` and the appropriate font (Cairo for Arabic, Inter for Latin)
- Shows the icon in the category's assigned color
- Falls back to the raw key string if the config is not yet loaded

### Components Upgraded

- **ColorPicker** (`client/src/components/ui/color-picker.tsx`): Replaced Tailwind class-based colors with 12 preset hex swatches from the product palette plus a custom hex input with live contrast validation.
- **IconPicker** (`client/src/components/ui/icon-picker.tsx`): Now renders icons in the currently selected color via the `selectedColor` prop.
- **CategoryDistribution** (`client/src/components/dashboard/CategoryDistribution.tsx`): Replaced the hardcoded `CATEGORY_COLORS` map with dynamic config lookup via `useConfig()`, so colors stay in sync with the admin settings.

### Merge Tool

A `POST /api/admin/config/merge` endpoint accepts `{ sourceId, targetId }`. In a single transaction it:
1. Reassigns every document's `category_id` and `category` from source to target
2. Soft-deletes the source category
3. Returns the affected document count

The admin UI ("دمج تصنيفات" button in the categories tab) provides a simple two-dropdown form. This is the honest fix for the existing "مالي" / "مال" drift — the migration script (Step 6 below) prints all distinct old category values side by side so the admin can review and manually merge any that should be combined, rather than attempting fragile auto-merging.

### Migration Script (server/scripts/migrate-categories-to-table.ts)

Run with `npx tsx server/scripts/migrate-categories-to-table.ts`. It:
1. Reads every distinct value in `documents.category` with counts
2. For each value, finds or creates a matching `metadata_registry` entry (using best-guess defaults for icon/color for unrecognized values)
3. Sets `documents.category_id` for all matching documents
4. Prints a console summary table showing every old string, its document count, and the category it was mapped to
5. The entire operation runs in a transaction; the old `category` column is not modified or dropped

After running the migration, the admin should review the summary and use the Merge tool to combine any entries that should be unified (e.g. "مالي" and "مال" appearing as separate rows). The old `documents.category` column is retained temporarily and should be dropped in a follow-up migration once the new FK column is verified in production.

---

## Enterprise Upgrade (v1.5.0)

> **Objective:** Transform JAMS from a junior-level project into a production-grade system capable of handling dozens of concurrent LAN users with zero perceived latency, resilient external-service fallbacks, automated backup safety nets, and operational observability.

### Architecture Changes

#### Cache Architecture (Three-Tier)

```
┌──────────────────────────────────────────────────────────┐
│                     L1: In-Memory LRU                    │
│              (lru-cache, max 5000 entries)               │
│        TTL per prefix, stale-while-revalidate            │
│              ┌──────────────────────┐                    │
│              │  cache.wrap(key, fn) │                    │
│              └──────────┬───────────┘                    │
│                         │                                │
│              ┌──────────▼───────────┐                    │
│              │   L2: Redis Cluster   │                    │
│              │  (dedicated via ioredis)                  │
│              │  TTL: 30s-300s/prefix                     │
│              └──────────┬───────────┘                    │
│                         │                                │
│              ┌──────────▼───────────┐                    │
│              │   L3: Original fn()   │                    │
│              │   (DB / Meilisearch)  │                    │
│              └──────────────────────┘                    │
│                                                          │
│   CacheInvalidator (7 domains):                          │
│   documents, papers, config, users,                      │
│   categories, dashboard, search                          │
└──────────────────────────────────────────────────────────┘
```

The old single-connection Redis + naive `Map` fallback was replaced with a proper three-tier strategy:

- **L1 (LRU-Cache):** In-process memory with 5000-entry capacity, per-prefix configurable TTL, and stale-while-revalidate semantics. Serves stale data while re-fetching in the background.
- **L2 (Redis):** Two dedicated `ioredis` connections managed by `RedisConnectionManager` — one for cache operations, one for BullMQ queues. Exponentially backed-off retry with health events (`cache_ready`, `cache_error`, `recovered`).
- **L3 (Fallback):** Executes the original fetch function (DB query, Meilisearch call) and populates L1+L2 on success.

TTL is resolved per key prefix via `TTL_CONFIG` (e.g., `documents:` → 60s, `config:` → 300s, `search:` → 30s). All cache keys exist in two namespaces (`cache:` and `jams:`) for backward compatibility — `CacheInvalidator` clears both.

#### Connection Manager

`RedisConnectionManager` (singleton, `EventEmitter`) manages two distinct Redis connections:

| Connection  | Purpose         | Retry Strategy                        | BullMQ Compatible |
|-------------|-----------------|---------------------------------------|-------------------|
| Cache       | L2 cache ops    | 10 retries, exponential backoff       | No                |
| Queue       | BullMQ jobs     | `maxRetriesPerRequest: null`, custom  | Yes               |

Health events propagate to `service-health.ts`, which emits `redis_recovered` on transition from offline to online.

#### Search Fallback Chain

When the primary Meilisearch path (`vectorSearchService`) fails, the request falls through to a three-provider chain:

```
Request → vectorSearchService
            ↓ (on failure)
         searchChain(query)
            ├── Level 1: Meilisearch (papers index)
            │   → returns results with highlighting
            ├── Level 2: PostgreSQL FTS (tsvector + ts_rank_cd)
            │   → Arabic-aware plainto_tsquery
            └── Level 3: PostgreSQL ILIKE (title + content_text)
                → title-priority ordering
```

Each provider has its own circuit breaker (threshold: 5 failures, reset: 30s, half-open: 3 successes). The first provider to return non-empty results wins. If all three fail, empty results are returned.

#### MinIO Backup System

Backup pipeline (triggered automatically every 14 days by `BackupScheduler`):

```
BackupScheduler.checkAndRunBackup()
    ├── performDatabaseBackup()     → pg_dump to ./backups/db/
    └── backupMinioBucket()          → downloads all objects to ./backups/storage/YYYY-MM-DD/
                                       saves JAMS_STORAGE_ENCRYPTION_KEY as .encryption-key
```

The MinIO backup decrypts objects during download using the SSE-C key and stores them as plain files. The encryption key is written as a sidecar (`.encryption-key`, mode `0o600`) in each backup directory. Restore uploads the plain files back to MinIO with the current encryption key.

#### Circuit Breaker State Machine

```
        ┌──────────┐  consecutive failures ≥ threshold   ┌──────────┐
        │  CLOSED  │ ──────────────────────────────────►  │   OPEN   │
        │ (normal) │                                      │ (reject) │
        └────┬─────┘                                      └────┬─────┘
             ▲                                                 │
             │              reset timeout elapsed               │
             │     ┌───────────────────────────────────────────┘
             │     │
        ┌────┴─────▼──────┐  consecutive successes ≥ halfOpenMax  ┌──────────┐
        │   HALF-OPEN     │ ──────────────────────────────────────►│  CLOSED  │
        │  (probing)      │                                        │ (normal) │
        └─────────────────┘                                        └──────────┘
```

Default thresholds: Redis/Meilisearch/MinIO → 5 failures / 30s timeout / 3 successes; PostgreSQL → 3 failures / 15s timeout / 2 successes.

### New Services & Responsibilities

| Service | File | Responsibility |
|---------|------|---------------|
| RedisConnectionManager | `server/lib/redis-connection.ts` | Manages 2 dedicated Redis connections (cache + queue), health events, graceful shutdown |
| Cache Warmer | `server/lib/cache-warmer.ts` | Preloads critical cache keys at startup, auto-refreshes on timer |
| CacheInvalidator | `server/lib/cache-invalidator.ts` | Domain-driven cache invalidation (7 domains), clears both `cache:` and `jams:` keys |
| Circuit Breaker Manager | `server/lib/circuit-breaker.ts` | Per-service circuit breaker (Redis, Meilisearch, MinIO, PostgreSQL) |
| MinIO Backup | `server/lib/minio-backup.ts` | Backup/restore MinIO bucket to local filesystem, encryption key management |
| Search Chain | `server/lib/search/search-chain.ts` | Multi-level search fallback (Meilisearch → pg_fts → pg_ilike) |
| Environment Validator | `server/lib/env-validator.ts` | Boot-time env var validation with clear error/warning messages |
| Backup Scheduler | `server/lib/backup-service.ts` | Automated 14-day backup cycle (DB + MinIO) |
| Upgrade Verifier | `scripts/verify-upgrade.ts` | 91-test verification script for all upgrade phases |

### Configuration Changes

#### New/Modified Environment Variables

| Variable | Default | Required | Notes |
|----------|---------|----------|-------|
| `DATABASE_URL` | — | **Yes** | PostgreSQL connection string |
| `SESSION_SECRET` | — | **Yes** | Min 32 chars; must not be weak default |
| `REDIS_URL` | `redis://127.0.0.1:6379` | No | Used by both cache and queue connections |
| `SEARCH_HOST` | `http://localhost:7700` | No | Meilisearch host |
| `SEARCH_KEY` | `jams_master_key_secure` | No | Meilisearch API key |
| `S3_ENDPOINT` | `http://localhost:9000` | No | MinIO endpoint |
| `S3_ACCESS_KEY` | `minioadmin` | No | Falls back to `MINIO_ROOT_USER` |
| `S3_SECRET_KEY` | `minioadmin` | No | Falls back to `MINIO_ROOT_PASSWORD` |
| `S3_BUCKET` | `jams-archive` | No | MinIO bucket name |
| `JAMS_STORAGE_ENCRYPTION_KEY` | — | No | SSE-C key for MinIO encryption |
| `PORT` | (default from index.ts) | No | Must be numeric if set |
| `JAMS_ENV` | `development` | No | Must be `development`, `production`, or `test` |
| `CORS_ORIGIN` | — | No | Allowed CORS origin |

#### Database Pool Tuning

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `pool.max` | 50 | Concurrent LAN users on single machine |
| `pool.min` | 10 | Baseline for burst handling |
| `idleTimeoutMillis` | 60000 (60s) | Release idle connections |
| `connectionTimeoutMillis` | 15000 (15s) | Fail fast on DB down |
| `maxUses` | 10000 | Recycle to prevent connection bloat |
| `statement_timeout` | 30000 (30s) | Long-query guard |
| `query_timeout` | 30000 (30s) | Long-query guard |
| `keepAlive` | `true` | Prevent firewall drops |
| SSL | `false` | Docker LAN deployment (enable for external) |

#### Cache TTL Configuration

| Key Prefix | TTL (seconds) |
|------------|---------------|
| `documents:` | 60 |
| `papers:` | 60 |
| `config:` | 300 |
| `sessions:` | 30 |
| `search:` | 30 |
| `dashboard:*` | 30 |
| `stats:*` | 60 |
| `category:*` | 300 |
| `user:*` | 300 |

L1 (LRU) uses `allowStale: true` for stale-while-revalidate pattern.

#### Security Hardening

- **Helmet** middleware applied globally (CSP disabled for LAN deployment)
- **CORS** configured with `credentials: true` and specific origin via `CORS_ORIGIN`
- **Session cookie** set to `sameSite: 'lax'`
- **Rate limiter** on `/api/search` (50 requests per 5 minutes per IP)
- **Session secret** validated at boot (min 32 chars, must not be weak default)

#### Monitoring Endpoints

| Endpoint | Auth | Returns |
|----------|------|---------|
| `GET /api/health/circuits` | Admin | Circuit breaker states per service |
| `GET /api/health/system` | None | RAM, CPU, uptime, services, circuits, pool, cache stats |
| `GET /api/admin/diagnostics` | Admin | DB check, schema sample, pending jobs, memory, uptime |
| `GET /api/system/status` | Admin | Workers, system info, timestamp |

### Operational Notes

**Cache Warming Schedule:**
- At startup: all critical keys (config, categories, dashboard stats, user profiles) are preloaded
- Auto-refresh timers: dashboard recent-documents refreshes every 30s
- Warmup is idempotent — second call is a no-op
- Timer handles have `timer.unref()` so they don't prevent process exit

**Backup Schedule:**
- Database: Every 14 days via `pg_dump` to `./backups/db/`
- MinIO storage: Every 14 days (parallel with DB backup) to `./backups/storage/YYYY-MM-DD/`
- Check interval: Every 24 hours (checks `systemSettings.last_db_backup` timestamp)
- First run: Triggers immediately on scheduler init
- All backups are fire-and-forget (errors logged only)

**Graceful Shutdown (in order):**
1. HTTP server stops accepting requests
2. BullMQ workers are closed
3. Cache warmer timers are stopped
4. Both Redis connections are quit
5. Process exits

**Verification:**
- Run `npx tsx scripts/verify-upgrade.ts` — executes 91 static tests across all 7 phases
- Run `npx tsx scripts/runtime-verify.ts` — executes full-stack tests against a running server
- Run `npx tsc --noEmit` — must produce zero errors

### Files Changed/Created (Enterprise Upgrade)

**New Files (9):**
- `server/lib/redis-connection.ts` — Redis connection manager
- `server/lib/cache-warmer.ts` — Cache preloader
- `server/lib/cache-invalidator.ts` — Domain-driven invalidator
- `server/lib/circuit-breaker.ts` — Circuit breaker manager
- `server/lib/minio-backup.ts` — MinIO backup/restore
- `server/lib/env-validator.ts` — Env var validator
- `server/lib/search/search-chain.ts` — Search fallback chain
- `scripts/verify-upgrade.ts` — 91-test static verification script
- `scripts/runtime-verify.ts` — Full-stack runtime verification script

**Modified Files (6):**
- `server/lib/cache.ts` — Three-tier TTL_CONFIG with `jams:` prefixes
- `server/lib/auth.ts` — L1 session cache with versioning
- `server/lib/queue.ts` — Uses RedisConnectionManager
- `server/lib/service-health.ts` — Emits `redis_recovered` event
- `server/lib/search.ts` — Full Meilisearch sync + index settings
- `server/lib/backup-service.ts` — MinIO backup integration
- `server/db.ts` — Pool tuning (max:50, min:10, timeouts:30s)
- `server/index.ts` — Helmet, CORS, env-validator, aligned keys
- `server/routes.ts` — Health endpoints, backup routes, rate limiter
- `server/routes/search.ts` — Search chain fallback + Redis caching
- `server/routes/dashboard.ts` — Circuit + pool status in health
- `client/src/components/layout/header.tsx` — 300ms debounce
- `client/src/components/paper-management.tsx` — 300ms debounce + click fix
- `client/src/components/create-index-modal.tsx` — 300ms debounce

**New Dependencies:**
- `helmet` (npm) — Security headers
- `cors` (npm) — CORS middleware (likely already present)
- `lru-cache` (npm) — L1 in-memory cache

### Known Issues & Fixes

#### 1. Meilisearch ranking rule syntax (fixed)

**Issue:** The `rankingRules` array in `server/lib/search.ts` contained `'sort(ocr_confidence:desc)'` and `'sort(created_at:desc)'`. Meilisearch rejects parameterized sort rules — the `sort` rule must be the bare keyword `"sort"`. This caused `initSearchIndex()` to fail silently, preventing the search index from applying custom settings.

**Fix:** Replaced `'sort(ocr_confidence:desc)'` and `'sort(created_at:desc)'` with a single bare `'sort'` rule. Sort direction is now controlled via `sortableAttributes` (which already included `ocr_confidence` and `created_at`) and the search query's `sort` parameter. Also removed `ocr_corrected_text` from `searchableAttributes` (unnecessary bloat) and `ocr_confidence` from `filterableAttributes` (already in `sortableAttributes`).

**Verification:** Server boots with no `[SEARCH] Init failed` log. Search results return with reasonable ranking.

#### 2. Arabic filename download crash (fixed)

**Issue:** Setting `Content-Disposition: attachment; filename="عقد-إيجار.txt"` directly in the HTTP header causes `TypeError [ERR_INVALID_CHAR]: Invalid character in header content ["Content-Disposition"]` because Node.js rejects non-ASCII characters in header values.

**Fix:** Added `encodeContentDisposition()` helper in `server/routes.ts` that sanitizes filenames (strips path traversal and control characters, limits to 200 chars) and applies RFC 5987 encoding (`filename*=UTF-8''...`) for non-ASCII names. Fixed 4 vulnerable endpoints: folder ZIP download, document ZIP download, paper file download, and annotated PDF export.

**Verification:** Upload a document with Arabic title, download it — the file saves correctly with the original name preserved.

#### 3. Windows CPU load monitoring (limitation, not fixed)

`os.loadavg()` on Windows always returns `[0, 0, 0]` — CPU load monitoring is Unix-only. On Windows deployments, the CPU load fields in `/api/health/system` will show zeros. This is a Node.js platform limitation with no workaround.

#### 4. Other known limitations

- Meilisearch index auto-sync on document mutations is not wired in; the 6-hour `verifyIndexIntegrity` BullMQ job detects drift
- No Prometheus/Grafana integration — health endpoints are manual-check only
- Backup `S3_ENDPOINT` defaults to `localhost` — must be overridden for container-to-container access
- Cache key pattern needs manual updates if new key prefixes are added
