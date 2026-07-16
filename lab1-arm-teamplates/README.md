# Lab 1 – Deploy an Azure Storage Account using ARM Templates and Azure DevOps

## Objective

In this lab, you will learn how to deploy Azure infrastructure using an **Azure Resource Manager (ARM) template** through an **Azure DevOps Pipeline**.

By the end of this lab, you will be able to:

* Understand the structure of an ARM template.
* Use a parameter file to customize deployments.
* Configure an Azure DevOps YAML pipeline.
* Deploy infrastructure automatically using an Azure Resource Manager service connection.

---

# Prerequisites

Before starting this lab, ensure you have the following:

* An Azure subscription
* An Azure DevOps organization and project
* A Git repository
* An Azure Resource Manager Service Connection configured in Azure DevOps
* Permission to create Resource Groups and Storage Accounts

---

# Repository Structure

Your repository should have the following structure:

```text
lab1-arm-templates/
│
├── infra/
│   ├── azuredeploy.json
│   └── azuredeploy.parameters.json
│
├── azure-pipelines.yml
│
└── README.md
```

---

# Lab Overview

This lab consists of three major components:

1. ARM Template
2. Parameter File
3. Azure DevOps Pipeline

---

# Step 1 – ARM Template

File:

```
infra/azuredeploy.json
```

This ARM template deploys a single Azure Storage Account.

The template defines:

* Storage Account resource
* Resource location
* SKU (Standard_LRS)
* Output values

### Resource Created

| Resource        | Type                              |
| --------------- | --------------------------------- |
| Storage Account | Microsoft.Storage/storageAccounts |

---

# Step 2 – Parameters File

File:

```
infra/azuredeploy.parameters.json
```

Instead of hardcoding values inside the template, ARM templates use parameter files.

Current parameter:

```json
{
  "storageAccountName": {
    "value": "az104risdwivedidemo"
  }
}
```

You can change the storage account name without modifying the ARM template.

> **Note:** Storage Account names must be globally unique across Azure.

---

# Step 3 – Azure DevOps Pipeline

File:

```
azure-pipelines.yml
```

The pipeline performs the following actions:

### Checkout Repository

Downloads the repository source code.

---

### Create Resource Group

```bash
az group create \
  --name rg-demo \
  --location "East US"
```

If the Resource Group already exists, Azure simply updates it.

---

### Deploy ARM Template

```bash
az deployment group create \
  --resource-group rg-demo \
  --template-file infra/azuredeploy.json \
  --parameters @infra/azuredeploy.parameters.json
```

This command deploys the Storage Account defined in the ARM template.

---

# Pipeline Variables

| Variable               | Description                     |
| ---------------------- | ------------------------------- |
| azureServiceConnection | Azure DevOps Service Connection |
| resourceGroup          | Resource Group Name             |
| location               | Azure Region                    |

Current values:

```yaml
azureServiceConnection: azlabtesting
resourceGroup: rg-demo
location: East US
```

---

# Running the Pipeline

1. Push the repository to Azure DevOps.
2. Navigate to **Pipelines**.
3. Create a new pipeline.
4. Select the repository.
5. Choose the existing `azure-pipelines.yml`.
6. Run the pipeline.

---

# Verify the Deployment

After the pipeline completes successfully:

1. Open the Azure Portal.
2. Navigate to **Resource Groups**.
3. Open:

```
rg-demo
```

Verify that the following resource exists:

```
Storage Account
```

Also verify:

* Resource Location
* SKU
* StorageV2 kind

---

# Expected Output

The pipeline should complete successfully.

Example output:

```
Deployment succeeded.
```

The ARM template also returns the following output:

```json
{
  "storageAccountName": "az104risdwivedidemo"
}
```

---

# Understanding the Files

| File                        | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| azuredeploy.json            | Defines Azure resources                   |
| azuredeploy.parameters.json | Supplies deployment values                |
| azure-pipelines.yml         | Automates deployment through Azure DevOps |
| README.md                   | Lab instructions                          |

---

# Challenge Exercises

After completing the lab, try the following:

### Challenge 1

Modify the template to create:

* A Storage Account with **Standard_GRS** redundancy.

---

### Challenge 2

Deploy a second Storage Account using a different parameter file.

---

### Challenge 3

Add a second resource to the ARM template, such as:

* App Service Plan
* Virtual Network
* Network Security Group

---

### Challenge 4

Parameterize additional properties such as:

* SKU
* Location
* Resource Name

---

# Troubleshooting

## Storage Account Name Already Exists

**Error**

```
StorageAccountAlreadyTaken
```

**Resolution**

Choose a globally unique storage account name.

---

## Service Connection Authorization Failed

Verify that:

* The Azure Resource Manager Service Connection exists.
* The pipeline has permission to use it.
* The service principal has the **Contributor** role on the subscription or resource group.

---

## Resource Group Not Found

Ensure the pipeline successfully executes:

```bash
az group create
```

before running the deployment.

---

# Learning Outcomes

After completing this lab, you should be able to:

* Explain the purpose of ARM templates.
* Separate infrastructure code from configuration using parameter files.
* Deploy Azure resources through Azure DevOps pipelines.
* Use Azure CLI deployment commands within a YAML pipeline.
* Verify deployed resources in the Azure portal.

---

## Followup Lab (maybe try)

In **Followup Lab**, you will extend this deployment by provisioning additional Azure resources (such as Virtual Networks, Network Security Groups, or App Services) and explore how to manage more complex infrastructure deployments using Infrastructure as Code (IaC).
