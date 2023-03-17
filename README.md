# jira-bulk-sub-task-creator

[![gh-pages build](https://github.com/anushibin007/jira-bulk-sub-task-creator/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/anushibin007/jira-bulk-sub-task-creator/actions/workflows/gh-pages.yml)

# Output will be like:
```
- Setup Process Designer / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Understand the working of the existing code / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Try to reproduce the Customer behavior / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Find a way to implement the new feature / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Check if the new change breaks anything / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Final changes and optimization / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
- Tests / priority:"@inherit" assignee:"@current" fixversion:"@inherit" cfield:"DevPriority:@inherit"
```

# Run your own Docker instance:
```
docker run -tidp80:80 --name jira-bulk-sub-task-creator anushibin007/jira-bulk-sub-task-creator
```
Access it locally at http://localhost
