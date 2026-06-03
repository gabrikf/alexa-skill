# Alexa Skill Lambda

A modern TypeScript Alexa Skill deployed as an AWS Lambda function using AWS CDK.

## Stack

- **Runtime:** Node.js 22 (ARM64)
- **Language:** TypeScript 5.7+
- **Bundling:** esbuild (via CDK NodejsFunction)
- **Infrastructure:** AWS CDK v2
- **CI/CD:** GitHub Actions (deploy on merge to master)

## Setup

```bash
npm install
```

## Deploy Manually

```bash
npx cdk deploy
```

## GitHub Actions Setup

Add these secrets to your GitHub repo (Settings → Secrets → Actions):

- `AWS_ACCESS_KEY_ID` — Your AWS access key (gabrielkochf@gmail.com account)
- `AWS_SECRET_ACCESS_KEY` — Your AWS secret key

The workflow deploys automatically on every push to `master`.

## Project Structure

```
├── src/
│   └── handler.ts          # Lambda handler (Alexa Skill)
├── infra/
│   ├── app.ts              # CDK app entry point
│   └── alexa-skill-stack.ts # CDK stack definition
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD
├── cdk.json                # CDK configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Notes

- Replace `REPLACE_WITH_YOUR_SKILL_ID` in `infra/alexa-skill-stack.ts` with your actual Alexa Skill ID once you create it in the Alexa Developer Console.
- The Lambda is deployed to `us-east-1` (required for Alexa skills in NA).
