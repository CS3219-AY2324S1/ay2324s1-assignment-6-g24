import axios from "axios";

const codeExecutionService = axios.create({
  baseURL: import.meta.env.VITE_CODE_EXECUTION_SERVICE_URL,
});

codeExecutionService.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const getCodeExecutionOutput = async (editorValue: string, language: string | undefined) => {
    const response = await codeExecutionService.post("/execute", {
      code: editorValue,
      language: language?.toLowerCase(),
    });
    return response;
};

export default codeExecutionService;
