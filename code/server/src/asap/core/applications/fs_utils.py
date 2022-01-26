import os
import pathlib
import shutil

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile


def verify_folder(folder_path):
    pathlib.Path(folder_path).mkdir(parents=True, exist_ok=True)


def copy_to_application_directory(file, application_id):
    filename = file.name
    output_path = os.path.join(get_application_directory(application_id), filename)
    if isinstance(file, InMemoryUploadedFile):
        file_content = file.file.getvalue()
        write_file_bytes(file_content, output_path)
    elif isinstance(file, TemporaryUploadedFile):
        shutil.copy(file.temporary_file_path(), output_path)


def get_applications_fs_path():
    return os.path.normpath(settings.ASAP_APPLICATION_DIR)


def get_application_directory(application_id):
    return os.path.join(get_applications_fs_path(), str(application_id))


def read_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()


def write_file(filepath, content):
    with open(filepath, 'w') as f:
        f.write(content)


def write_file_bytes(content_in_bytes, filepath):
    with open(filepath, 'wb+') as f:
        f.write(content_in_bytes)


