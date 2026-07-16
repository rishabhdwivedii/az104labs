Yes. In fact, I think the third lab should **feel like a natural continuation** of Lab 1 (ARM Templates) and Lab 2 (App Service Configuration), while borrowing the **Microsoft Learn writing style**. The goal is that students don't just deploy an App Service—they deploy it into a realistic hub-and-spoke network and configure it securely.

I'd avoid introducing Azure Firewall or Key Vault in the main lab because that increases complexity and cost. Instead, make the core lab about **networking + App Service deployment**, then leave Key Vault as the follow-up challenge.

---

# Lab 3 – Deploy a Secure Web Application in a Hub-and-Spoke Network

## Scenario

Your organization is migrating a web-based application to Azure. The application must be deployed using Infrastructure as Code and securely integrated with Azure networking.

The infrastructure team has already standardized on a **hub-and-spoke network architecture** where:

* The **hub virtual network** hosts shared networking resources.
* The **application virtual network** hosts the web application.
* Resources must communicate privately using **Virtual Network Peering**.
* The web application should be configurable without modifying application code.

Your task is to deploy the networking infrastructure, provision an Azure App Service, integrate it with the application virtual network, and configure the application using Azure App Service Application Settings.

---

## Architecture

```text
                               Internet
                                   |
                          Azure App Service
                                   |
                        VNet Integration
                                   |
                           app-vnet (Spoke)
                        10.1.0.0/16
                ------------------------------
                |                            |
          frontend subnet              backend subnet
          10.1.0.0/24                 10.1.1.0/24
                |
                |
        (Application Integration)
                |
          =========================
             Virtual Network Peering
          =========================
                |
          hub-vnet
         10.0.0.0/16
                |
      AzureFirewallSubnet
         10.0.0.0/26
```

---

# Skilling Tasks

* Deploy Azure resources using ARM Templates.
* Create Virtual Networks and Subnets.
* Configure Virtual Network Peering.
* Deploy an Azure App Service.
* Configure App Service VNet Integration.
* Configure Application Settings.
* Verify application connectivity.

---

# Estimated Time

**45–60 minutes**

---

# Exercise 1 – Deploy Infrastructure using ARM Templates

Deploy the following resources using ARM Templates.

| Resource          | Name        |
| ----------------- | ----------- |
| Resource Group    | RG1         |
| App Service Plan  | asp-demo    |
| Azure App Service | app-demo    |
| app-vnet          | 10.1.0.0/16 |
| hub-vnet          | 10.0.0.0/16 |

---

## Configure app-vnet

| Property        | Value       |
| --------------- | ----------- |
| Address Space   | 10.1.0.0/16 |
| frontend subnet | 10.1.0.0/24 |
| backend subnet  | 10.1.1.0/24 |

---

## Configure hub-vnet

| Property            | Value       |
| ------------------- | ----------- |
| Address Space       | 10.0.0.0/16 |
| AzureFirewallSubnet | 10.0.0.0/26 |

Deploy the template.

Verify all resources were created successfully.

---

# Exercise 2 – Configure Virtual Network Peering

Create bidirectional peering.

| Property        | Value           |
| --------------- | --------------- |
| Local VNet      | app-vnet        |
| Remote VNet     | hub-vnet        |
| Peering Name    | app-vnet-to-hub |
| Reverse Peering | hub-to-app-vnet |

Verify

```
Peering Status

Connected
```

---

# Exercise 3 – Deploy the Sample Application

Deploy the supplied Node.js application to Azure App Service using the Azure DevOps pipeline created in Lab 2.

Verify the application loads successfully.

Expected output

```
Hello from Azure App Service!
```

---

# Exercise 4 – Configure VNet Integration

Configure App Service VNet Integration.

| Property        | Value    |
| --------------- | -------- |
| Virtual Network | app-vnet |
| Subnet          | frontend |

Verify the App Service successfully integrates with the virtual network.

---

# Exercise 5 – Configure Application Settings

Configure the following Application Settings.

| Name        | Value                           |
| ----------- | ------------------------------- |
| GREETING    | Welcome to Azure Networking Lab |
| ENVIRONMENT | Production                      |
| VERSION     | 3.0                             |

Save the configuration.

Refresh the website.

Verify the application reflects the updated values.

---

# Exercise 6 – Validate the Deployment

Verify the following:

✅ App Service is running.

✅ Virtual Network Integration shows **Connected**.

✅ Virtual Network Peering status is **Connected**.

✅ Application displays:

```
Welcome to Azure Networking Lab

Environment : Production

Version : 3.0
```

---

# Challenge Exercise

Your organization now wants to improve security by removing application secrets from App Service Configuration.

Modify your deployment so that:

* An Azure Key Vault is deployed using ARM Templates.
* A Managed Identity is enabled for the App Service.
* GREETING, VERSION, and ENVIRONMENT are stored as Key Vault secrets.
* App Service uses **Key Vault References** instead of plain-text Application Settings.
* Updating a secret in Azure Key Vault changes the application's behavior without redeploying the application.

---

# Key Takeaways

Congratulations on completing the exercise. Here are the main takeaways:

* ARM Templates provide repeatable and consistent infrastructure deployments.
* Azure Virtual Networks isolate application resources using structured CIDR blocks.
* Subnets segment workloads for security and scalability.
* Virtual Network Peering enables secure communication between virtual networks without traversing the public internet.
* Azure App Service can integrate with a Virtual Network to access private resources.
* Application Settings allow configuration changes without modifying application code.
* Infrastructure and application deployment can be automated using Azure DevOps pipelines.

---

## Summary

* **Lab 1** → Infrastructure as Code (ARM Templates)
* **Lab 2** → App Service deployment and configuration
* **Lab 3** → Networking those resources together using **hub-and-spoke architecture**, **VNet peering**, and **App Service VNet Integration**
