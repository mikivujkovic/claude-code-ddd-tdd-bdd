# Bounded Context

## Todo Management

**Purpose**: Manage personal todo items - creating them, tracking their status, and performing basic operations (complete, reopen, rename, delete).

**Responsibilities**:
- Add new todo items with titles
- Track whether todo items are pending or completed
- Complete pending items
- Reopen completed items
- Rename existing items
- Delete items

**Not Responsible For**:
- User authentication or permissions (single-user system assumed)
- Sharing or collaboration features
- Due dates, priorities, or categories (stretch goals only)
- Persistence implementation (infrastructure concern)

**Ubiquitous Language**: See `glossary.md`

**Boundaries**:
This is a single bounded context. All operations happen within "Todo Management". No external contexts need to be integrated at this stage.
