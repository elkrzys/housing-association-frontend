import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useField, useFormikContext } from 'formik';
import { Box, Text } from '@chakra-ui/react';

const fileTypes = ['PDF'];

const FileDragAndDrop = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [file, setFile] = useState(null);

  const handleChange = file => {
    setFile(file);
    setFieldValue(field.name, file);
  };

  return (
    <FileUploader
      {...props}
      {...field}
      handleChange={handleChange}
      types={fileTypes}>
      <Box
        p="10"
        fontSize="md"
        textAlign="center"
        rounded="md"
        bg={file ? 'blue.100' : 'white'}
        border="1px solid"
        borderColor={file ? 'blue.500' : 'gray.400'}
        _hover={{ bg: 'gray.100' }}>
        {!file ? (
          <Text>Kliknj, aby wybrać plik lub upuść go tutaj</Text>
        ) : (
          <Text textColor={'gray.600'}>
            Wybrany plik: <b>{file.name}</b>
          </Text>
        )}
      </Box>
    </FileUploader>
  );
};
export default FileDragAndDrop;
