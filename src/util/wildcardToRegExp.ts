export function wildcardToRegExp(pattern: string): RegExp {
  // Escape special characters in the pattern to avoid conflicts with regex syntax
  const escapedPattern = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  
  // Replace wildcard '*' with '.*' to match any character sequence
  // and ensure the entire string is matched by surrounding it with '^' and '$'
  const regexPattern = '^' + escapedPattern.replace(/\*/g, '.*') + '$';
  
  // Create and return a new RegExp object with the constructed pattern
  return new RegExp(regexPattern);
}
