# secrets-util

## Overview

`secrets-util` is a console application written in TypeScript and designed to be run using Deno. The application processes files containing secrets and replaces placeholders with actual values from a configuration file. The processed files are saved with a new name, ensuring the original files are not overwritten.

## Features

- **Configuration File**: The application uses a configuration file (`secrets.env`) to specify the secrets and their corresponding values.
- **Wildcard Support**: Supports wildcard patterns to include files for processing.
- **Recursive Processing**: Can recursively process files in subdirectories based on the configuration.
- **Placeholder Replacement**: Replaces placeholders in the format `!{KEY}` with the corresponding values from the configuration.
- **Output to New Files**: Writes the processed content to new files, preserving the original files.
- **Periodic Processing**: Periodically reprocesses files based on a configurable interval.

## Configuration

The configuration file (`secrets.env`) should be placed in the working directory. It contains key-value pairs of secrets to be replaced in the files.

Example `secrets.env`:
```env
PORT=3001
DB_PASSWORD=password123
ANOTHER=abcdefg