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

    //dream list api
    const dreamListApiLambda = new lambda.Function(this, "DreamListApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset("../app/"),
      handler:"DreamList_api.handler",
      layers:[layer]
    });

    const dreamListApi = new apiGateway.RestApi(this, "DreamListRestApi", {
      restApiName: "Dream List API"
    });

    const dreamListApiLambdaApiIntegration = new apiGateway.LambdaIntegration(dreamListApiLambda);
    dreamListApi.root.addProxy({
      defaultIntegration: dreamListApiLambdaApiIntegration
    });

    //dream generator api
    const dreamGeneratorApiLambda = new lambda.Function(this, "DreamGeneratorApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset("../app/"),
      handler:"DreamGenerator_api.handler",
      layers:[layer]
    });

    const dreamGeneratorApi = new apiGateway.RestApi(this, "DreamGeneratorRestApi", {
      restApiName: "Dream Generator API"
    });

    const dreamGeneratorApiLambdaApiIntegration = new apiGateway.LambdaIntegration(dreamGeneratorApiLambda);
    dreamGeneratorApi.root.addProxy({
      defaultIntegration: dreamGeneratorApiLambdaApiIntegration
    });

   
  }
}
