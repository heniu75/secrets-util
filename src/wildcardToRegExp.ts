export function wildcardToRegExp(pattern: string): RegExp {
  const escapedPattern = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const regexPattern = '^' + escapedPattern.replace(/\*/g, '.*') + '$';
  return new RegExp(regexPattern);
}
