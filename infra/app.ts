import * as cdk from "aws-cdk-lib";
import { AlexaSkillStack } from "./alexa-skill-stack";

const app = new cdk.App();

new AlexaSkillStack(app, "AlexaSkillStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? "us-east-1",
  },
});
