# API Documentation:
# User Management
1) Create User: /web/api/users (POST)
2) Get User by ID: /web/api/users/{user_id} (GET)
3) Assign Role to User: /web/api/users/{user_id}/roles (POST)
4) Get User Roles: /web/api/users/{user_id}/roles (GET)
# Organization Management
1) Create Organization: /web/api/organizations (POST)
2) Get Organization by ID: /web/api/organizations/{organization_id} (GET)
3) Add User to Organization: /web/api/organizations/{organization_id}/users (POST)
4) Get Users in Organization: /web/api/organizations/{organization_id}/users (GET)
# Session Management
1) Create Session: /web/api/sessions (POST)
2) Get Session by ID: /web/api/sessions/{session_id} (GET)
3) Switch Organization within Session: /web/api/sessions/{session_id}/organizations (PUT)
# Task Management
1) Create Task: /web/api/organizations/{organization_id}/tasks (POST)
2) Get Task by ID: /web/api/tasks/{task_id} (GET)
3) Get Tasks in Organization: /web/api/organizations/{organization_id}/tasks (GET)

# Submission by : 
# Ayush Saxena
# ayushsaxena994@gmail.com