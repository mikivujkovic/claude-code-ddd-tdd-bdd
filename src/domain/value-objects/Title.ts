export class Title {
  private readonly value: string

  constructor(value: string) {
    this.validateNotEmpty(value)
    this.value = value.trim()
  }

  getValue(): string {
    return this.value
  }

  private validateNotEmpty(value: string): void {
    if (!value || value.trim() === '') {
      throw new Error('Title cannot be empty')
    }
  }
}
