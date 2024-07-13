import { UploadFile, UploadProps } from 'antd';
import { useState } from 'react';

type Pops = {
  uploadFiles?: UploadFile[];
  uploadImages?: UploadFile[];
};
const useUploadItem = ({ uploadFiles, uploadImages }: Pops) => {
  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles ?? []);
  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);

  const handleImageChange: UploadProps['onChange'] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  const handleFileChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  return {
    fileList,
    imageList,
    handleImageChange,
    handleFileChange,
  };
};

export { useUploadItem };
