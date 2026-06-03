# AWS Certification Map For Club Vivo

## Status

Draft learning map.

This document maps Club Vivo/SIC work to AWS certification study areas. It does not claim certification completion.

## Purpose

Club Vivo is useful as practical learning evidence because it connects AWS study topics to a real product architecture.

The repo is not just a checklist of services. It shows how services fit together for a multi-tenant SaaS product:

- user authentication
- API access
- serverless compute
- tenant-scoped data
- file storage and export
- observability
- IAM boundaries
- infrastructure as code

## Certifications In Scope

### AWS Certified Developer Associate

Most relevant study areas:

- serverless application development
- Lambda handlers and environment configuration
- API Gateway integration patterns
- DynamoDB access patterns
- Cognito authentication flows
- S3 object storage and presigned access patterns
- CloudWatch logs and metrics
- IAM permissions for application roles
- deployment and IaC concepts

### AWS Certified Solutions Architect Associate

Most relevant study areas:

- designing secure application architectures
- identity and access management
- serverless architectures
- cost-aware managed services
- high-level reliability and observability
- data storage choices
- multi-tier application architecture
- infrastructure as code and repeatability

## Service Map

| AWS service | Club Vivo/SIC use | Certification learning evidence |
| --- | --- | --- |
| Cognito | Hosted UI, user pool, app client, JWT-backed auth flow, trigger Lambdas | Identity, authentication, token-based application access |
| API Gateway | HTTP API entry point for Club Vivo backend route families | Secured APIs, route integration, authorizer concepts |
| Lambda | Club Vivo route handlers and Cognito triggers | Serverless compute, handler design, environment variables, operational boundaries |
| DynamoDB | Tenant entitlements table and SIC domain table | Key design, tenant-scoped access, single-table thinking, conditional/domain writes |
| S3 | Session PDF export storage | Object storage, tenant-scoped prefixes, private storage, presigned access |
| CloudWatch | Logs, metrics, alarms, operational signals | Observability, troubleshooting, alerting basics |
| IAM | Lambda access to DynamoDB, S3, Cognito, and platform resources | Least privilege, service roles, policy scoping |
| CDK | Infrastructure definition under `infra/cdk` | Infrastructure as code, repeatable stacks, synth/diff/deploy workflow |

## Developer Associate Study Connections

Club Vivo provides concrete examples for Developer Associate topics:

- Building Lambda-backed API workflows.
- Passing authenticated requests through API Gateway.
- Reading configuration from environment variables.
- Handling platform errors and request logging.
- Working with DynamoDB repositories and tenant-scoped keys.
- Using S3 for private export artifacts.
- Understanding how IAM grants shape what code can do.
- Using CDK as a deployment and infrastructure definition surface.

The practical evidence is strongest when studying how a request moves through the system:

1. User authenticates with Cognito.
2. The web app calls API Gateway.
3. API Gateway validates JWT context.
4. Lambda resolves tenant context.
5. Domain logic reads or writes DynamoDB.
6. Export paths use S3.
7. CloudWatch captures operational signals.

## Solutions Architect Associate Study Connections

Club Vivo also maps well to Solutions Architect Associate design topics:

- Choosing serverless services to reduce operational overhead.
- Designing a multi-tenant SaaS boundary.
- Keeping tenant identity out of client-controlled inputs.
- Using DynamoDB and S3 with tenant-scoped access patterns.
- Applying cost-aware service choices for an early product.
- Using CloudWatch for minimal but real observability.
- Keeping infrastructure repeatable through CDK.

The architecture is intentionally narrow. That is useful for study because it shows why not every AWS service belongs in an early product.

## Practical Learning Evidence

Studying AWS through Club Vivo creates evidence beyond reading:

- architecture diagrams tied to source files
- tenant-isolation contracts
- Lambda route-family inventories
- DynamoDB access-boundary documentation
- runbook and observability docs
- CDK stack source
- product docs that separate shipped behavior from proposed behavior

This evidence can support interview conversations because it connects service knowledge to product and architecture decisions.

## Honest Boundary

This map does not claim:

- AWS certification completion.
- production maturity across every AWS Well-Architected pillar.
- a finished commercial SaaS launch.
- broad analytics, ML, or retrieval infrastructure as active product dependencies.

The learning value is practical and source-grounded: Club Vivo gives a concrete system to study while preparing for AWS Developer Associate and Solutions Architect Associate topics.
