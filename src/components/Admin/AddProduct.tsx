import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const ProdcutEditor = () => {
  const { quillRef } = useQuill();
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default ProdcutEditor;
