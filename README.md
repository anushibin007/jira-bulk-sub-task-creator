# jira-bulk-sub-task-creator
A tool to create script for multiple Sub-Tasks in JIRA. Access it here: https://anushibin007.github.io/jira-bulk-sub-task-creator/

# Output will be like:
```- Setup Process Designer / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Understand the working of the existing code / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Try to reproduce the Customer behavior / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Find a way to implement the new feature / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Check if the new change breaks anything / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Final changes and optimization / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Tests / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
```

# Build it yourself using Docker:
```
docker run -tidp80:80 --name jira-bulk-sub-task-creator anushibin007/jira-bulk-sub-task-creator
```
Access it locally at http://localhost
