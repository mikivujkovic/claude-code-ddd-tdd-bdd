# Glossary

The ubiquitous language for the Todo Management domain.

## Core Terms

### Todo Item
**What it is**: A single task or reminder that someone wants to complete.

**Business meaning**: Represents one actionable thing on your list - something you need to do.

**Why it matters**: Each item tracks its own completion status and can be managed independently.

**Examples**:
- "Buy groceries"
- "Call dentist to reschedule"
- "Prepare presentation for Monday"

---

### Title
**What it is**: The descriptive text that explains what needs to be done.

**Business meaning**: The actual words that tell you what the task is about.

**Why it matters**: Without a title, nobody knows what needs to be done.

**Rules**:
- Must have at least some text (cannot be empty or just spaces)
- Should be clear enough that you understand it later

**Examples**:
- Good: "Buy milk and bread at grocery store"
- Bad: "" (empty)
- Bad: "   " (just spaces)

---

### Todo List
**What it is**: The collection that holds all your todo items together.

**Business meaning**: Your personal set of tasks to accomplish.

**Why it matters**: Keeps all related tasks organized in one place.

**What it does**:
- Lets you add new items
- Tracks which items are completed
- Prevents duplicate items

---

### Status
The current state of a Todo Item. Can be either:
- **Pending**: Not yet completed (the initial state)
- **Completed**: Marked as done

### Add
The action of creating a new TodoItem. When you Add a TodoItem, you provide its Title and it starts in Pending status.

### Complete
The action of marking a Pending TodoItem as Completed. This means the task is done.

### Reopen
The action of changing a Completed TodoItem back to Pending status. Used when you need to redo something.

### Rename
The action of changing the Title of a TodoItem while keeping its identity and Status unchanged.

### Delete
The action of permanently removing a TodoItem from the system. Cannot be undone.
