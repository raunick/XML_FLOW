import React from "react";

interface Props {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLayoutChange: (layout: string) => void;
}

const FileUploadAndLayoutButtons: React.FC<Props> = ({ onFileUpload, onLayoutChange }) => {
  return (
    <div style={{ padding: "10px" }}>
      <input type="file" accept=".xml,.txt" onChange={onFileUpload} />
      <button onClick={() => onLayoutChange("TB")}>Vertical Layout</button>
      <button onClick={() => onLayoutChange("LR")}>Horizontal Layout</button>
    </div>
  );
};

export default FileUploadAndLayoutButtons;
