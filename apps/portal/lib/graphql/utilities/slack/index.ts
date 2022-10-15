import { createStepFunctionInstance } from '../aws/setup';
import { v4 as uuid } from 'uuid';

interface SlackNotificationPayload {
  form_name: string;
  name: string;
  email: string;
  message?: string;
  url?: string;
}

export async function sendSlackNotification(payload: SlackNotificationPayload) {
  const stepFunction = createStepFunctionInstance();
  return stepFunction
    .startExecution({
      stateMachineArn: process.env.SLACK_ARN!,
      name: uuid(),
      input: JSON.stringify(payload),
    })
    .promise();
}
