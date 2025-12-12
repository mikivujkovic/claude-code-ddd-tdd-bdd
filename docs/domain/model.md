# Domain Model

## Aggregates

### TodoList (Aggregate Root)
The primary aggregate that manages all todo items.

**Identity**: TodoListId (for future multi-list support; single list for now)

**Attributes**:
- `items`: Collection of TodoItem - all todo items in the list

**Commands** (behaviors):
- `add(title: string)` - Creates and adds a new TodoItem
  - Validates title is not empty
  - Checks for duplicates
  - Creates item with Pending status
- `findByTitle(title: string)` - Checks if item exists (for duplicate detection)

**Invariants**: See `invariants.md`

---

### TodoItem (Entity within TodoList)
Represents a single task within the TodoList.

**Identity**: TodoItemId (unique identifier)

**Attributes**:
- `id`: TodoItemId - unique identifier
- `title`: Title (non-empty string) - describes the task
- `status`: Status (Pending | Completed) - current state

**Commands** (behaviors):
- `complete()` - Marks a Pending TodoItem as Completed
- `reopen()` - Changes a Completed TodoItem back to Pending
- `rename(newTitle: string)` - Updates the title
- `delete()` - Marks for removal

---

## Value Objects

### Title
A non-empty string that describes what the TodoItem is about.

**Rules**:
- Must not be empty
- Must not be only whitespace

### Status
An enumeration representing the state of a TodoItem.

**Values**:
- `Pending` - not yet done
- `Completed` - marked as done

---

## Design Notes

**Why TodoList is the Aggregate Root**:
- Enforces collection-level invariants (no duplicates)
- Controls lifecycle of TodoItems
- Maintains consistency across all items
- Single entry point for all todo operations

**Why TodoItem is an Entity (not Aggregate Root)**:
- Has identity (TodoItemId) but lives within TodoList
- Cannot exist without a TodoList
- Operations like complete/rename go through the list

**No Repositories Yet**:
Storage is an infrastructure concern. During DDD phase, we only model the aggregate. Repository interfaces will be defined when needed in TDD phase.

---

## Use Case Contracts

### Add Todo Item

**Purpose**: Create a new todo item in the list.

**Inputs**:
- `title` (string) - What needs to be done

**Preconditions**:
- Todo List exists

**Domain Rules** (see invariants.md for details):
- INV-ADD-1: Title cannot be empty
- INV-ADD-2: Cannot add duplicate items
- INV-ADD-3: New items start as Pending

**Output** (success):
- New TodoItem created with:
  - Unique id (generated)
  - Title (provided, trimmed)
  - Status: Pending

**Output** (failure):
- "Title cannot be empty" - when title is blank
- "Item with this title already exists" - when duplicate detected
