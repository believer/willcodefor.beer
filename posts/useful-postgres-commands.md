---
title: useful postgres commands
excerpt: Useful Postgres commands and queries that I tend forget
date: '2022-01-27T12:53'
tags:
  - topic/postgres
  - til
  - activity/writing
  - status/done
layout: layouts/post.njk
modified: '2022-02-08'
modifiedDateTime: '2022-02-08 16:32'
created: '2022-01-27'
createdDateTime: '2022-01-27 12:53'
---

Useful Postgres commands and queries that I tend forget.

### PSQL
- `\c databaseName` - Connect to a database
- `\dt` - List all tables (relations)

### Queries

```sql
-- Create a comma separated list of all values of an enum
SELECT ENUM_RANGE(NULL::enum_name)
```

### Command line

```bash
# Standard database dump
pg_dump -h host -U user databasename > filename.sql

# Only export the data, not the database structure
pg_dump -h host -U user --data-only databasename > filename.sql

# Create a tar archive
pg_dump -h host -U user -F t databasename > filename.tar
```