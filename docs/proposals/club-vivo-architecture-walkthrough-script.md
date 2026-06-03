# Club Vivo Architecture Walkthrough Script

## Status

Draft 2-3 minute walkthrough script for the Chapter 2 architecture diagram.

## Script

Start with the coach problem.

"Club Vivo starts from a very practical coaching problem. Many nonprofit and grassroots soccer coaches are planning under pressure. They may have limited time, changing player counts, inconsistent equipment, shared space, and mixed player ability. They do not just need theory or a generic drill list. They need something they can run today."

Move to the product.

"That is where Club Vivo fits. Club Vivo is the product. It gives coaches a workspace for planning and reuse. The main wedge is Session Builder, which helps turn practical inputs into a coach-ready session. Quick Soccer Game is the fast lane for one playable activity when the coach needs something simple and engaging quickly."

Point to the top lane.

"In the top lane of the diagram, you can see the coach using the Club Vivo web app. The Coach Workspace organizes the active product story around Session Builder, Quick Soccer Game, Teams, saved Sessions, Feedback, and Export. Equipment and methodology are kept as context unless source inspection confirms they are shipped standalone workspace areas."

Move to the request path.

"The middle lane is the protected request path. A coach signs in through Cognito. The web app calls API Gateway, which uses JWT authorization. Requests then move into the Lambda platform wrapper. That wrapper handles logging, error handling, and tenant-context resolution before domain behavior runs."

Explain the API labels.

"The backend is shown with purpose-based labels instead of vague Lambda names. Session Builder and Quick Soccer Game both use the shared Session Pack Generation API path. Saved sessions, feedback, and export use the Saved Sessions API. Team context uses the Team Management API. Quick Soccer Game is not a separate backend product or separate deployment."

Move to tenant safety.

"The most important platform point is tenant safety. Tenant identity comes from verified auth plus authoritative entitlements. It is not accepted from a request body, query string, or header. If identity or entitlements are missing or invalid, the request fails closed. DynamoDB access and S3 storage stay tenant-scoped by construction."

Move to AWS foundation.

"The bottom lane is the AWS foundation behind the product. DynamoDB stores tenant entitlements and domain records. S3 stores private session export files. CloudWatch gives logs, metrics, and alarms. The infrastructure is managed through CDK, with IAM boundaries treated as part of the product foundation."

Close with the honest boundary.

"This diagram is intentionally conservative. It does not show image analysis, Training Brief, DiagramSequence, RAG, autonomous agents, or Bedrock production generation as shipped runtime behavior. Chapter 2 is about making the current product story clear: Club Vivo is the product, SIC is the AWS SaaS foundation, Session Builder is the main wedge, and Quick Soccer Game is the fast creative lane."

End with the pilot framing.

"For a nonprofit pilot, the question is simple: can a few coaches use Club Vivo to create sessions or quick soccer games that they would actually run, and does it reduce planning stress while keeping program data boundaries protected?"
