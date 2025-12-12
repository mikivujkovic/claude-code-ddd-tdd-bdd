import { describe, it, expect } from 'vitest'
import { Title } from '../../src/domain/value-objects/Title'

describe('Title', () => {
  describe('INV-ADD-1: Title Cannot Be Empty', () => {
    it('should throw error when title is empty string', () => {
      // Given: An empty title string
      const emptyTitle = ''

      // When/Then: Creating a Title should throw error
      expect(() => {
        new Title(emptyTitle)
      }).toThrow('Title cannot be empty')
    })
  })
})
