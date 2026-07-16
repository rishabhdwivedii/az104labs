# Lab 2 – Deploy and Configure an Azure App Service

## Objective

In this lab, you will deploy a simple Node.js web application to **Azure App Service** and learn the different ways application configuration can be managed in Azure.

By the end of this lab, you will be able to:

- Deploy a Node.js application to Azure App Service.
- Understand how Azure App Service handles application settings.
- Configure application behavior without changing code.
- Manage environment variables through multiple configuration methods.
- Verify configuration changes through the deployed application.

---

# Prerequisites

Before starting this lab, ensure you have:

- An Azure Subscription
- An Azure App Service
- An Azure DevOps Project
- A Git Repository
- Azure CLI installed (optional)
- Node.js installed (optional for local testing)

---

# Repository Structure

```text
lab2-appservices-config-n-deploy/
│
├── website/
│   ├── app.js
│   └── package.json
│
├── azure-pipeline.yml
│
└── README.md
```

---

# Lab Overview

This lab consists of four major sections:

1. Deploy the application
2. Configure the application
3. Modify configuration without changing code
4. Explore different configuration methods

---

# Understanding the Application

The sample application is a simple Express application.

It reads configuration values from environment variables.

```javascript
const greeting =
    process.env.GREETING ||
    "Hello from Azure App Service!";
```

```javascript
const environment =
    process.env.ENVIRONMENT ||
    "Development";
```

```javascript
const version =
    process.env.VERSION ||
    "1.0";
```

If an environment variable is not defined, the application automatically falls back to a default value.

---

# Running the Application Locally

Install dependencies

```bash
npm install
```

Start the application

```bash
npm start
```

Browse to

```
http://localhost:8080
```

Expected output

```
Hello from Azure App Service!

Environment : Development

Version : 1.0
```

---

# Deploying to Azure App Service

The application can be deployed using several methods.

Examples include:

- Azure DevOps Pipeline
- Visual Studio Code
- Azure CLI
- GitHub Actions
- Zip Deployment
- Local Git Deployment

For this lab, deployment is performed using the provided Azure DevOps pipeline.

---

# Application Configuration

One of the biggest advantages of Azure App Service is that application settings can be changed **without modifying or redeploying the application code**.

Our application currently reads the following configuration values:

| Setting | Purpose |
|----------|----------|
| GREETING | Welcome message displayed on the home page |
| ENVIRONMENT | Indicates the deployment environment |
| VERSION | Displays application version |

---

# Configuring Environment Variables

Azure App Service exposes Application Settings as environment variables to the application.

There are multiple ways to configure these settings.

---

## Method 1 – Azure Portal (Recommended)

Navigate to

```
App Service

↓

Settings

↓

Environment Variables
```

Create the following settings.

| Name | Value |
|------|-------|
| GREETING | Welcome to Azure App Service |
| ENVIRONMENT | Production |
| VERSION | 2.0 |

Save the configuration.

Restart the App Service if prompted.

Refresh the application.

The displayed values should update immediately.

---

## Method 2 – Azure CLI

Application settings can also be configured using Azure CLI.

Example

```bash
az webapp config appsettings set \
    --resource-group <ResourceGroup> \
    --name <AppServiceName> \
    --settings \
    GREETING="Welcome from Azure CLI" \
    ENVIRONMENT="Production" \
    VERSION="2.0"
```

This approach is useful for automation and scripting.

---

## Method 3 – Azure PowerShell

Configuration can also be updated using Azure PowerShell.

This is commonly used in automation scripts and administrative tasks.

---

## Method 4 – Azure DevOps Pipeline

Application settings can be updated during deployment.

This allows each deployment environment (Development, Test, Production) to receive different configuration values.

Example scenarios include:

- Different API endpoints
- Different logging levels
- Different feature flags
- Different connection strings

---

## Method 5 – ARM Templates / Bicep

Infrastructure as Code allows application settings to be deployed together with the App Service.

Benefits include:

- Repeatable deployments
- Version-controlled infrastructure
- Consistent environments

---

## Method 6 – Azure Resource Manager REST API

Configuration can also be managed programmatically through the Azure Management API.

Useful for:

- Automation platforms
- Self-service portals
- Custom deployment tools

---

## Method 7 – Azure SDKs

Azure SDKs for:

- .NET
- Java
- Python
- JavaScript

allow applications and automation tools to update App Service configuration programmatically.

---

# Common App Service Configuration

Besides custom application settings, App Service supports configuring:

- Connection Strings
- Runtime Stack
- Startup Commands
- Always On
- Health Checks
- ARR Affinity
- HTTP Version
- TLS Version
- Diagnostic Logging
- Managed Identity
- Authentication

---

# Configuration Without Code Changes

Notice that nowhere in the application code are the values hardcoded.

Instead, the application reads values dynamically from:

```javascript
process.env
```

This enables the same application package to be deployed to multiple environments without modification.

Example

Development

```
GREETING=Welcome Developers
```

Test

```
GREETING=Testing Environment
```

Production

```
GREETING=Welcome Customers
```

No code changes are required.

---

# Verifying the Configuration

After updating the application settings:

Refresh the website.

You should observe values similar to:

```
Welcome to Azure App Service

Environment : Production

Version : 2.0
```

The hostname will also display the App Service hostname assigned by Azure.

---

# Challenge Exercises

## Challenge 1

Add a new environment variable:

```
TEAM
```

Display it on the webpage.

---

## Challenge 2

Create two deployment environments:

- Development
- Production

Configure different values for:

- GREETING
- VERSION
- ENVIRONMENT

Deploy the same application to both environments.

Observe the different outputs.

---

## Challenge 3

Modify the application to display the current UTC time.

---

## Challenge 4

Display all environment variables beginning with:

```
WEBSITE_
```

Observe the platform-provided values available inside Azure App Service.

---

# Learning Outcomes

After completing this lab, you should be able to:

- Deploy a Node.js application to Azure App Service.
- Configure application settings without modifying application code.
- Understand how Azure App Service exposes environment variables.
- Manage application configuration through multiple Azure tools.
- Differentiate between application code and application configuration.

---

# Follow-up Assignment (Lab 3)

Now that you have completed:

- **Lab 1:** Deploy Infrastructure using ARM Templates
- **Lab 2:** Deploy and Configure an Azure App Service

combine both labs into a single Infrastructure as Code solution.

## Scenario

Your organization wants a fully automated deployment that provisions infrastructure and deploys an application with secure configuration management.

### Objectives

Using ARM Templates (or Bicep), provision the following Azure resources:

- Resource Group
- App Service Plan
- Azure App Service
- Azure Key Vault
- Managed Identity for the App Service

Deploy the Node.js application using an Azure DevOps pipeline.

### Configure the application to retrieve settings from Azure Key Vault.

Store the following secrets in Azure Key Vault:

| Secret | Example Value |
|---------|---------------|
| GREETING | Welcome from Azure Key Vault |
| ENVIRONMENT | Production |
| VERSION | 3.0 |

Grant the App Service's Managed Identity **Get** permission (or the appropriate Azure RBAC role) to read secrets from the Key Vault.

Update the App Service configuration to reference Key Vault secrets using **Key Vault References** instead of hardcoded application settings.

Example:

```
@Microsoft.KeyVault(SecretUri=https://<keyvault-name>.vault.azure.net/secrets/GREETING/)
```

Verify that:

- The application successfully reads values from Azure Key Vault.
- Updating a secret in Key Vault changes the application's behavior without modifying the application code.
- Infrastructure, application deployment, and configuration are all managed through Azure DevOps.

## Stretch Goals

- Parameterize the ARM template for different environments (Development, Test, Production).
- Add deployment stages and approvals to the Azure DevOps pipeline.
- Store sensitive pipeline values in Azure DevOps Variable Groups linked to Azure Key Vault.
- Enable diagnostic logging and Application Insights for the App Service.
- Replace ARM Templates with Bicep and compare the authoring experience.

This follow-up assignment demonstrates a complete Infrastructure as Code workflow, secure secret management using Azure Key Vault, and modern application deployment practices using Azure DevOps.
