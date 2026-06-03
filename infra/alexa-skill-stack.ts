import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";
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
        memorySize: 128,
        timeout: cdk.Duration.seconds(8),
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
        },
      },
    );

    // Allow Alexa service to invoke this Lambda
    alexaSkillFunction.addPermission("AlexaInvoke", {
      principal: new cdk.aws_iam.ServicePrincipal("alexa-appkit.amazon.com"),
      action: "lambda:InvokeFunction",
      eventSourceToken: "amzn1.ask.skill.REPLACE_WITH_YOUR_SKILL_ID",
    });

    new cdk.CfnOutput(this, "LambdaFunctionArn", {
      value: alexaSkillFunction.functionArn,
      description: "Lambda Function ARN for Alexa Skill configuration",
    });
  }
}
