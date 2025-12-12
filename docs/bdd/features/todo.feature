Feature: Add Todo Item
  As a user
  I want to add todo items to my list
  So that I can track tasks I need to complete

  Scenario: Successfully add a todo item with a valid title
    Given I have an empty todo list
    When I add a todo item with title "Buy groceries"
    Then the todo list contains 1 item
    And the todo item has title "Buy groceries"
    And the todo item is marked as incomplete

  Scenario: Reject adding a todo item with an empty title
    Given I have an empty todo list
    When I attempt to add a todo item with an empty title
    Then I receive an error "Title cannot be empty"
    And the todo list contains 0 items

  Scenario: Reject adding a todo item with whitespace-only title
    Given I have an empty todo list
    When I attempt to add a todo item with title "   "
    Then I receive an error "Title cannot be empty"
    And the todo list contains 0 items

  Scenario: Add multiple todo items to the list
    Given I have an empty todo list
    When I add a todo item with title "Buy groceries"
    And I add a todo item with title "Walk the dog"
    Then the todo list contains 2 items
    And the first todo item has title "Buy groceries"
    And the second todo item has title "Walk the dog"
