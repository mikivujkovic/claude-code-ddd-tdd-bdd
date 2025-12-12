# BDD Scenario Mapping

Maps BDD scenario steps to application services and domain objects. This bridges business language (Gherkin) with implementation.

---

## Scenario 1: Successfully add a todo item with a valid title

### Given I have an empty todo list
- **Step intent**: Set up test context with a fresh TodoList
- **Suggested service call**: `todoListService.create()` or use existing empty list
- **Domain objects involved**:
  - `TodoList` (aggregate root) - initialized with empty items collection

### When I add a todo item with title "Buy groceries"
- **Step intent**: Execute the Add operation with a valid title
- **Suggested service call**: `todoList.add("Buy groceries")`
- **Domain objects involved**:
  - `TodoList.add()` - orchestrates the operation
  - `Title` - validates "Buy groceries" (INV-ADD-1)
  - `TodoItem` - created with Pending status (INV-ADD-3)

### Then the todo list contains 1 item
- **Step intent**: Verify the list size increased
- **Suggested service call**: `todoList.getItems().length` or `todoList.count()`
- **Domain objects involved**:
  - `TodoList` - returns collection of items

### And the todo item has title "Buy groceries"
- **Step intent**: Verify the item was stored correctly
- **Suggested service call**: `todoList.getItems()[0].getTitle().getValue()`
- **Domain objects involved**:
  - `TodoList.getItems()` - returns items
  - `TodoItem.getTitle()` - returns Title value object
  - `Title.getValue()` - returns string

### And the todo item is marked as incomplete
- **Step intent**: Verify the item starts in Pending status (INV-ADD-3)
- **Suggested service call**: `todoList.getItems()[0].getStatus()`
- **Domain objects involved**:
  - `TodoItem.getStatus()` - returns Status enum
  - Verify status equals `Status.Pending`

---

## Scenario 2: Reject adding a todo item with an empty title

### Given I have an empty todo list
- **Step intent**: Set up test context with a fresh TodoList
- **Suggested service call**: `todoListService.create()` or use existing empty list
- **Domain objects involved**:
  - `TodoList` (aggregate root) - initialized

### When I attempt to add a todo item with an empty title
- **Step intent**: Attempt Add operation that should fail (INV-ADD-1)
- **Suggested service call**: `todoList.add("")` (expect error)
- **Domain objects involved**:
  - `TodoList.add()` - receives empty string
  - `Title` constructor - throws error during validation

### Then I receive an error "Title cannot be empty"
- **Step intent**: Verify correct error message was thrown
- **Suggested service call**: Catch the error from `add()`, verify message
- **Domain objects involved**:
  - Error thrown by `Title` constructor

### And the todo list contains 0 items
- **Step intent**: Verify no item was added (transaction consistency)
- **Suggested service call**: `todoList.getItems().length` or `todoList.count()`
- **Domain objects involved**:
  - `TodoList` - collection remains empty

---

## Scenario 3: Reject adding a todo item with whitespace-only title

### Given I have an empty todo list
- **Step intent**: Set up test context with a fresh TodoList
- **Suggested service call**: `todoListService.create()` or use existing empty list
- **Domain objects involved**:
  - `TodoList` (aggregate root) - initialized

### When I attempt to add a todo item with title "   "
- **Step intent**: Attempt Add with whitespace-only title (INV-ADD-1)
- **Suggested service call**: `todoList.add("   ")` (expect error)
- **Domain objects involved**:
  - `TodoList.add()` - receives whitespace
  - `Title` constructor - validates and throws error (trim check)

### Then I receive an error "Title cannot be empty"
- **Step intent**: Verify whitespace is treated as empty
- **Suggested service call**: Catch the error, verify message matches
- **Domain objects involved**:
  - Error thrown by `Title` validation

### And the todo list contains 0 items
- **Step intent**: Verify no item was added
- **Suggested service call**: `todoList.getItems().length`
- **Domain objects involved**:
  - `TodoList` - collection remains empty

---

## Scenario 4: Add multiple todo items to the list

### Given I have an empty todo list
- **Step intent**: Set up test context
- **Suggested service call**: `todoListService.create()`
- **Domain objects involved**:
  - `TodoList` - initialized

### When I add a todo item with title "Buy groceries"
- **Step intent**: Add first item
- **Suggested service call**: `todoList.add("Buy groceries")`
- **Domain objects involved**:
  - `TodoList.add()` - creates first TodoItem
  - `Title("Buy groceries")` - validated
  - `TodoItem` - created with Pending status

### And I add a todo item with title "Walk the dog"
- **Step intent**: Add second item
- **Suggested service call**: `todoList.add("Walk the dog")`
- **Domain objects involved**:
  - `TodoList.add()` - creates second TodoItem
  - `Title("Walk the dog")` - validated
  - `TodoItem` - created with Pending status

### Then the todo list contains 2 items
- **Step intent**: Verify both items were added
- **Suggested service call**: `todoList.getItems().length`
- **Domain objects involved**:
  - `TodoList` - returns collection with 2 items

### And the first todo item has title "Buy groceries"
- **Step intent**: Verify items are in order
- **Suggested service call**: `todoList.getItems()[0].getTitle().getValue()`
- **Domain objects involved**:
  - `TodoList.getItems()` - returns array
  - First `TodoItem` - at index 0
  - `Title.getValue()` - returns "Buy groceries"

### And the second todo item has title "Walk the dog"
- **Step intent**: Verify second item is correct
- **Suggested service call**: `todoList.getItems()[1].getTitle().getValue()`
- **Domain objects involved**:
  - `TodoList.getItems()` - returns array
  - Second `TodoItem` - at index 1
  - `Title.getValue()` - returns "Walk the dog"

---

## Architecture Notes

**Application Layer** (not yet implemented):
- `TodoListService` - coordinates use cases
- Handles transaction boundaries
- Maps between domain and external interfaces

**Domain Layer** (implemented):
- `TodoList` (aggregate root) - enforces invariants
- `TodoItem` (entity) - represents individual task
- `Title` (value object) - validates title rules
- `Status` (value object/enum) - Pending/Completed

**Key Principles**:
- BDD steps call **domain methods directly** (not UI)
- Error handling happens at **domain layer** (not UI validation)
- **Observable outcomes** = query domain state
- Steps are **stable** regardless of UI framework
