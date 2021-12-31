import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { Box, Text } from '@chakra-ui/react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import '../filepond.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

const fileTypes = ['application/pdf'];

const labels = {
  labelIdle:
    'Przeciągnij i upuść dokument pdf lub <span class="filepond--label-action"> przeglądaj </span>',
  labelFileTypeNotAllowed: 'Pole zawiera nieprawidłowy plik',
  fileValidateTypeLabelExpectedTypes: 'Plik powinien być w formacie pdf',
};

const FileDragAndDrop = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [files, setFiles] = useState();

  const handleFileUpload = files => {
    const [currentFile] = files.map(item => item.file);
    setFiles(files);
    setFieldValue(field.name, currentFile);
    if (currentFile) console.log(currentFile);
  };

  return (
    <div class="filepond-wrapper" style={{ hover: 'background: blue' }}>
      <FilePond
        {...props}
        {...field}
        credits={null}
        acceptedFileTypes={fileTypes}
        instantUpload={false}
        files={files}
        maxFiles={1}
        onupdatefiles={files => handleFileUpload(files)}
        {...labels}
        dropValidation
      />
    </div>
  );
};
export default FileDragAndDrop;
