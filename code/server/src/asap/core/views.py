from django.conf import settings
from django.contrib.auth import logout
from rest_framework import status, generics
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from core.email_patterns.emails_patterns import emails_patterns
from core.applications.fs_utils import copy_to_application_directory, get_document, delete_file_from_app_dir
from core.applications.utils import create_application_directory
from core.decorators import authorized_roles
from core.mail import send_email
from core.models import Version, Profile, Rank, Application, ApplicationStep, Step
from core.roles import Role
from core.serializers import VersionSerializer, ProfileSerializer, RankSerializer, ApplicationSerializer, \
    ApplicationStepSerializer
from datetime import date, timedelta


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER,
                         Role.ASAP_QUALITY_DEPT])
def logout_user(request):
    logout(request)
    return Response(True, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER,
                         Role.ASAP_QUALITY_DEPT])
def get_current_user(request):
    user = request.user
    roles = [row['name'] for row in user.groups.values('name')]
    content = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'roles': roles,
    }
    return Response(content, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER,
                         Role.ASAP_QUALITY_DEPT])
def get_current_version(request):
    version = Version.objects.get(pk=1)
    serializer = VersionSerializer(version)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER,
                         Role.ASAP_QUALITY_DEPT])
def get_application(request, application_id):
    application = Application.objects.get(pk=application_id)
    serializer = ApplicationSerializer(application)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER])
def get_cv(request, application_id):
    return get_document(application_id, 'cv_filename')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN, Role.ASAP_DEPT_HEAD, Role.ASAP_APPT_CHAIR, Role.ASAP_DEPT_MEMBER])
def get_letter(request, application_id):
    return get_document(application_id, 'letter_filename')


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def landing_page_applications(request):
    newApplications = ApplicationStep.objects.filter(step_name='DEPT_HEAD_CREATE_NEW_APPLICATION').filter(currentStep=True)
    nApplications = Application.objects.filter(steps__in=newApplications)
    nSerializer = ApplicationSerializer(nApplications, many=True)

    openSteps = ['DEPT_HEAD_FEEDBACK', 'ADMIN_FEEDBACK', 'ADMIN_VERIFY_APPLICATION', 'CHAIR_HEAD_FEEDBACK']
    openApplications = ApplicationStep.objects.filter(step_name__in=openSteps).filter(currentStep=True)
    oApplications = Application.objects.filter(steps__in=openApplications)
    oSerializer = ApplicationSerializer(oApplications, many=True)

    closeSteps = ['APPLICATION_CLOSE', 'CHAIR_HEAD_APPROVE_APPLICATION']
    closeApplications = ApplicationStep.objects.filter(step_name__in=closeSteps).filter(currentStep=True)
    cApplications = Application.objects.filter(steps__in=closeApplications)
    cSerializer = ApplicationSerializer(cApplications, many=True)

    application = dict()
    application['new'] = nSerializer.data
    application['open'] = oSerializer.data
    application['close'] = cSerializer.data

    return Response(application, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def get_admin_applications(request):
    applications = Application.objects.all()
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def get_dept_head_applications(request):
    creator = Profile.objects.get(user=request.user.id)
    department = creator.department
    applications = Application.objects.filter(department=department)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_APPT_CHAIR])
def get_dept_chair_applications(request):
    verifyApplicationsByAdmin = ApplicationStep.objects.filter(step_name='ADMIN_VERIFY_APPLICATION')
    applications = Application.objects.filter(steps__in=verifyApplicationsByAdmin)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_QUALITY_DEPT])
def get_quality_dept_applications(request):
    verifyApplicationsByDeptChair = ApplicationStep.objects.filter(step_name='CHAIR_HEAD_APPROVE_APPLICATION')
    applications = Application.objects.filter(steps__in=verifyApplicationsByDeptChair)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_MEMBER])
def get_member_application(request):
    profile = Profile.objects.get(user_id=request.user.id)
    applications = Application.objects.filter(applicant_id=profile.id).filter(is_done=0)
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def get_dept_candidates(request):
    requestor_id = request.user.id
    requestor_dept = Profile.objects.get(user_id=requestor_id)
    candidates = Profile.objects.filter(department=requestor_dept.department_id)

    serializer = ProfileSerializer(candidates, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def submit_dept_head_application(request, application_id):
    try:
        cv = request.FILES['cv']
        letter = request.FILES['letter']
        candidate_id = request.data['candidateId']
        rank_id = request.data['requestedRankId']
        application_state = {
            'candidate_id': candidate_id,
            'rank_id': rank_id,
            'cv_filename': cv.name,
            'letter_filename': letter.name,
        }
    except Exception:
        return Response("Error", status=status.HTTP_200_OK)

    creator = Profile.objects.get(user=request.user.id)
    department = creator.department
    applicant = Profile.objects.get(user=candidate_id)
    applicant_profile_id = applicant.id
    rank = Rank.objects.get(id=rank_id)

    if Application.objects.filter(applicant=applicant_profile_id).filter(is_done=0).exists():
        return Response(True, status=status.HTTP_200_OK)

    try:
        application = Application.objects.get(id=application_id)
        # TODO - update application
    except Application.DoesNotExist:
        application = None

    if application is None:
        application = Application(creator=creator, applicant=applicant, desired_rank=rank,
                                  application_state=application_state, department=department
                                  )
        application.save()
        create_application_directory(application.id)

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_1,
        defaults={'can_update': True, 'can_cancel': True, 'currentStep': True}
    )

    copy_to_application_directory(cv, application.id)
    copy_to_application_directory(letter, application.id)

    addresee = 'devasap08@gmail.com'  # TODO: change email to admin address
    email_headline = 'New Application Created'
    wanted_action = 'application_created'
    degree = creator.degree
    sendEmail(addresee, email_headline, wanted_action, creator, degree)

    addresee = 'devasap08@gmail.com'  # TODO: change email to creator address
    email_headline = 'Application Successfully Created'
    wanted_action = 'application_received'
    degree = applicant.degree
    sendEmail(addresee, email_headline, wanted_action, applicant, degree)

    return Response(False, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_MEMBER])
def submit_dept_member_application(request, application_id):
    try:
        cv = request.FILES['cv']
        letter = request.FILES['letter']
        candidate_id = request.data['candidateId']
        rank_id = request.data['requestedRankId']
        application_state = {
            'candidate_id': candidate_id,
            'rank_id': rank_id,
            'cv_filename': cv.name,
            'letter_filename': letter.name,
        }
    except Exception:
        return Response(True, status=status.HTTP_200_OK)

    creator = Profile.objects.get(user=request.user.id)
    department = creator.department
    applicant = Profile.objects.get(user=candidate_id)
    rank = Rank.objects.get(id=rank_id)

    try:
        application = Application.objects.get(id=application_id)
        # TODO - update application
    except Application.DoesNotExist:
        application = None

    if application is None:
        application = Application(creator=creator, applicant=applicant, desired_rank=rank,
                                  application_state=application_state, department=department
                                  )
        application.save()
        create_application_directory(application.id)

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_1,
        defaults={'can_update': True, 'can_cancel': True, 'currentStep': True}
    )

    copy_to_application_directory(cv, application.id)
    copy_to_application_directory(letter, application.id)

    addresee = 'devasap08@gmail.com'  # TODO: change email to admin address
    email_headline = 'New Application Created'
    wanted_action = 'application_created'
    degree = creator.degree
    sendEmail(addresee, email_headline, wanted_action, creator, degree)

    addresee = 'devasap08@gmail.com'  # TODO: change email to creator address
    email_headline = 'Application Successfully Created'
    wanted_action = 'application_received'
    degree = applicant.degree
    sendEmail(addresee, email_headline, wanted_action, applicant, degree)

    return Response(application.id, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_ADMIN])
def submit_admin_application(request, application_id):
    try:
        submit = request.data['submission']
        cv_comments = request.data['cvComments']
        letter_comments = request.data['letterComments']
        application = Application.objects.get(id=application_id)
        application_state = application.application_state
        application_state['cv_comments'] = cv_comments
        application_state['letter_comments'] = letter_comments
        ApplicationStep.objects.filter(application_id=application_id).update(currentStep=False)
    except Exception:
        return Response(True, status=status.HTTP_200_OK)

    match submit:
        case 'submit':
            Application.objects.filter(id=application_id).update(application_state=application_state)

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_4,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': True}
            )

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to dph & lecturer mails
            email_headline = 'Application Approved By Admin'
            wanted_action = 'admin_approve'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_4, status=status.HTTP_200_OK)

        case 'feedback':
            application = Application.objects.get(id=application_id)
            Application.objects.filter(id=application_id).update(application_state=application_state)
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_3,
                defaults={'can_update': False, 'can_cancel': True, 'currentStep': True}
            )
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': False}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to dph address
            email_headline = 'New Feedback From Admin'
            wanted_action = 'admin_feedback'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_3, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def inquiries_table(request):
    admin_id = request.user.id

    requests_table = [
        {
            'admin_reaching': admin_id,
            'candidate': 1,
            'requestedRank': "Manager",
            'submissionDate': "25-11-2021",
            'stageNumber': 3,
            'stageName': "interview",
        }
    ]

    return Response(requests_table, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def get_remaining_days(request, candidate_id):
    profile = Profile.objects.get(user_id=candidate_id)
    new_date = get_new_date(profile.joined_date)
    return Response(new_date, status=status.HTTP_200_OK)


def get_new_date(joined_date):
    elapsed_date = (date.today() - joined_date).days
    STAGE_ONE = 365
    STAGE_TWO = 1460
    STAGE_THREE = 2555
    dictionary = dict()
    if elapsed_date <= STAGE_ONE:
        # TODO change the hebrew here !
        dictionary['finish_date'] = date.today() + timedelta(days=STAGE_ONE - elapsed_date)
        dictionary['stage'] = "א'"
    elif STAGE_ONE < elapsed_date < STAGE_TWO:
        dictionary['finish_date'] = date.today() + timedelta(days=STAGE_TWO - elapsed_date)
        dictionary['stage'] = "ב'"
    else:
        dictionary['finish_date'] = date.today() + timedelta(days=STAGE_THREE - elapsed_date)
        dictionary['stage'] = "ג'"

    return dictionary


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_HEAD])
def handle_dept_head_application(request, application_id):
    try:
        action = request.data['requiredAction']
        cv_comments = request.data['cvComments']
        letter_comments = request.data['letterComments']
        application = Application.objects.get(id=application_id)
        application_state = application.application_state
        application_state['cv_comments'] = cv_comments
        application_state['letter_comments'] = letter_comments
        ApplicationStep.objects.filter(application_id=application_id).update(currentStep=False)
        Application.objects.filter(id=application_id).update(application_state=application_state)  # TODO: check if needed
    except Exception:
        return Response(True, status=status.HTTP_200_OK)

    match action:
        case 'submit':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': True, 'can_cancel': False, 'currentStep': True}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin & lecturer mails
            email_headline = 'Your Department-Head Has Approved The Application'
            wanted_action = 'dph_approve'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_1, status=status.HTTP_200_OK)

        case 'feedback':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_2,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': True}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin & lecturer mails
            email_headline = 'You Got Feedback On Your Application'
            wanted_action = 'dph_feedback'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_2, status=status.HTTP_200_OK)

        case 'close':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_0,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': True}
            )
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )
            Application.objects.update_or_create(
                id=application_id, is_done=0,
                defaults={'is_done': 1}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin & lecturer mails
            email_headline = 'Your Application Denied'
            wanted_action = 'dph_deny'
            reviewer_name = Profile.objects.get(user=request.user.id)
            degree = reviewer_name.degree
            sendEmail(addresee, email_headline, wanted_action, reviewer_name, degree)

            return Response(Step.STEP_0, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_APPT_CHAIR])
def handle_appt_chair_application(request, application_id):
    try:
        action = request.data['requiredAction']
        cv_comments = request.data['cvComments']
        letter_comments = request.data['letterComments']
        application = Application.objects.get(id=application_id)
        application_state = application.application_state
        application_state['cv_comments'] = cv_comments
        application_state['letter_comments'] = letter_comments
        ApplicationStep.objects.filter(application_id=application_id).update(currentStep=False)
        Application.objects.filter(id=application_id).update(application_state=application_state)  # TODO: check if needed
    except Exception:
        return Response(True, status=status.HTTP_200_OK)

    match action:
        case 'submit':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_5,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_6,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': True}
            )
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )
            Application.objects.update_or_create(
                id=application_id, is_done=0,
                defaults={'is_done': 1}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin & dph & lecturer mails
            email_headline = 'Application Approved By Apartment Chair'
            wanted_action = 'chair_approve'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_6, status=status.HTTP_200_OK)

        case 'feedback':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_5,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': True}
            )

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_4,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': False}
            )

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': True, 'can_cancel': True, 'currentStep': False}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin address
            email_headline = 'New Feedback From Apartment Chair'
            wanted_action = 'chair_feedback'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_5, status=status.HTTP_200_OK)

        case 'close':
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_6,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_1,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )
            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_5,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': False}
            )

            ApplicationStep.objects.update_or_create(
                application=application, step_name=Step.STEP_0,
                defaults={'can_update': False, 'can_cancel': False, 'currentStep': True}
            )
            Application.objects.update_or_create(
                id=application_id, is_done=0,
                defaults={'is_done': 1}
            )

            addresee = 'devasap08@gmail.com'  # TODO:change to admin & dph & lecturer mails
            email_headline = 'Application Denied By Apartment Chair'
            wanted_action = 'chair_deny'
            sendEmail(addresee, email_headline, wanted_action)

            return Response(Step.STEP_0, status=status.HTTP_200_OK)


@api_view(['POST'])
@renderer_classes([JSONRenderer])
@authorized_roles(roles=[Role.ASAP_DEPT_MEMBER])
def handle_dept_member_application(request, application_id):
    try:
        cv_comments = request.data['cvComments']
        letter_comments = request.data['letterComments']
        application = Application.objects.get(id=application_id)
        application_state = application.application_state
        application_state['cv_comments'] = cv_comments
        application_state['letter_comments'] = letter_comments
        ApplicationStep.objects.filter(application_id=application_id).update(currentStep=False)
    except Exception:
        return Response(True, status=status.HTTP_200_OK)

    cv = request.FILES['cv']
    if cv:
        print("cv: ", cv)
        print(delete_file_from_app_dir(application_state['cv_filename'], application.id))
        application_state['cv_filename'] = cv.name
        copy_to_application_directory(cv, application.id)
    #if request.FILES['letter'] in locals():
    #    letter = request.FILES['letter']
    #    application_state['letter_filename'] = letter.name
    #    copy_to_application_directory(letter, application.id)

    Application.objects.filter(id=application_id).update(application_state=application_state)  # TODO: check if needed
    application.save()

    ApplicationStep.objects.update_or_create(
        application=application, step_name=Step.STEP_1,
        defaults={'can_update': True, 'can_cancel': False, 'currentStep': True}
    )
    addresee = 'devasap08@gmail.com'  # TODO:change to dph mail
    email_headline = 'Lecturer Has Edited An Application'
    wanted_action = 'member_edit'
    candidate = Profile.objects.get(id=application.applicant_id)
    degree = candidate.degree
    sendEmail(addresee, email_headline, wanted_action, candidate, degree)
    return Response(Step.STEP_1, status=status.HTTP_200_OK)

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class RankList(generics.ListCreateAPIView):
    queryset = Rank.objects.all()
    serializer_class = RankSerializer


class RankDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rank.objects.all()
    serializer_class = RankSerializer


def sendEmail(mail_addresses, wanted_headline, action_type, name_to_replace=None, degree=None):
    message = emails_patterns[action_type]
    if name_to_replace is not None:
        message = message.replace("%name", str(name_to_replace))
    if degree is not None:
        message = message.replace("%degree", str(degree))
    send_email(settings.SENDGRID_SENDER, mail_addresses,
               wanted_headline,
               message)
