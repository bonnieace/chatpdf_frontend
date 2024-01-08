import React from "react";

type Props = { pdf_url: string };


const PDFViewer = async ({ pdf_url }: Props) => {
  const formData = new FormData();
  formData.append("url", pdf_url);
  const response = await fetch("http://127.0.0.1:8000/url", {
      method: "POST",
      body: formData,
  })
  const data=await response.json()
  const apiResponse = data.url;
  console.log(apiResponse)
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full h-full"
    ></iframe>
  );
};

export default PDFViewer;