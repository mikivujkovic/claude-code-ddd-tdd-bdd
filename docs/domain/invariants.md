# Invariants

Domain rules that must always be true for the Todo List.

---

## Add Todo Item

### INV-ADD-1: Title Cannot Be Empty
**Business Rule**: Every todo item must have a meaningful title.

**Why**: Without a title, the user won't know what task to perform.

**Violation**: Attempting to add an item with empty string, null, or only whitespace.

**Business Impact**: Prevents meaningless entries that clutter the list.

**Examples**:
- Valid: "Buy groceries"
- Invalid: "", "   ", null

---

### INV-ADD-2: Cannot Add Duplicate Items
**Business Rule**: The same title cannot exist twice in the same list.

**Why**: Duplicate tasks create confusion - which one do you complete?

**Violation**: Adding a title that already exists (case-insensitive match).

**Business Impact**: Keeps list clean and prevents accidental re-adding.

**Examples**:
- Valid: Adding "Buy milk" to empty list
- Invalid: Adding "buy milk" when "Buy Milk" already exists

---

### INV-ADD-3: New Items Start Incomplete
**Business Rule**: When added, every todo item begins in the "Pending" state.

**Why**: You add items because you haven't done them yet.

**Violation**: None (this is enforced by the Add operation itself).

**Business Impact**: Ensures consistent behavior - all new items need action.

**Examples**:
- After adding "Call dentist", its status is automatically "Pending"

---

## Future Capabilities

Invariants for Complete, Rename, Reopen, and Delete will be documented when we work on those capabilities.
