import sendgrid from "@sendgrid/mail"

interface SendEmailPayload<SubstitutionsType extends Record<string, unknown>> {
  template_id: string;
  dynamicSubstitutions: SubstitutionsType;
}

export interface SendEmailConfig {
  from: string;
  from_name: string;
  to: string;
  template_id: string;
  dynamicSubstitutions: Record<string, unknown>;
}

export async function sendEmail<SubstitutionsType extends Record<string, unknown>>(
  payload: SendEmailPayload<SubstitutionsType>,
  recipientEmail: string,
) {
    const msgConfig = {payload};

    sendgrid.setApiKey(process.env.SENDGRID_APIKEY!);
    const msg: sendgrid.MailDataRequired = {
      from: {
        email: "development@acmutd.co",
        name: "ACM Development",
      },
      to: recipientEmail,
      dynamicTemplateData: msgConfig.payload.dynamicSubstitutions,
      templateId: msgConfig.payload.template_id,
    };

    return sendgrid.send(msg);


}
