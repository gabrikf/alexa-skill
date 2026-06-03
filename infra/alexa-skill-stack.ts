import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "node:path";
import { Construct } from "constructs";

export class AlexaSkillStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const alexaSkillFunction = new nodejs.NodejsFunction(
      this,
      "AlexaSkillHandler",
      {
        runtime: lambda.Runtime.NODEJS_22_X,
        entry: path.join(__dirname, "..", "src", "handler.ts"),
        handler: "handler",
        memorySize: 256,
        timeout: cdk.Duration.seconds(10),
        architecture: lambda.Architecture.ARM_64,
        bundling: {
          minify: true,
          sourceMap: true,
          target: "es2022",
          format: nodejs.OutputFormat.CJS,
          mainFields: ["module", "main"],
        },
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
          OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ?? "",
          LLM_MODEL: process.env.LLM_MODEL ?? "openai/gpt-4o-mini",
        },
      },
    );

    // Allow Alexa service to invoke this Lambda
    alexaSkillFunction.addPermission("AlexaInvoke", {
      principal: new cdk.aws_iam.ServicePrincipal("alexa-appkit.amazon.com"),
      action: "lambda:InvokeFunction",
      eventSourceToken: "amzn1.ask.skill.2b1355d5-fb98-44c9-bb73-ee5cac528486",
    });

    new cdk.CfnOutput(this, "LambdaFunctionArn", {
      value: alexaSkillFunction.functionArn,
      description: "Lambda Function ARN for Alexa Skill configuration",
    });
  }
}
