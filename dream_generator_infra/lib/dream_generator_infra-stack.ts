import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';

export class DreamGeneratorInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_11]
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset("../app/"),
      handler:"DreamGenerator_api.handler",
      layers:[layer]
    });

    const dreamGeneratorApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "Dream Generator API"
    });

    const lambdaApiIntegration = new apiGateway.LambdaIntegration(apiLambda);
    dreamGeneratorApi.root.addProxy({
      defaultIntegration: lambdaApiIntegration
    });
  }
}
