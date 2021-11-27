from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_email(from_email, to_emails, subject, html_content):
    message = Mail(from_email=from_email, to_emails=to_emails, subject=subject, html_content=html_content)
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)  # TODO - replace with logger
