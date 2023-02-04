export class RedisString {
  public readonly value: string

  public constructor(value: string) {
    this.value = this.escape(value)
  }

  private escape(value: string): string {
    const matchPunctuation = /[,.<>{}[\]"':;!@#$%^&*()\-+=~|/\\ ]/g
    return value.replace(matchPunctuation, "\\")
  }
}
