export interface QnA {
  available: string;
  content: string;
  createdDt: string;
  customerId: string;
  id: number;
  modifiedDt: string;
  qnaCommentList: [
    {
      content: string;
      createdDt: string;
      customerId: string;
      id: number;
      modifiedDt: string;
      title: string;
    }
  ];
  title: string;
  views: number;
}

export interface QnAList {
  content: string;
  createdDt: string;
  customerId: string;
  id: number;
  modifiedDt: string;
  title: string;
  views: number;
}

export interface QnaListResponseType {
  header: {
    code: number;
    message: string;
  };
  body: {
    qna: QnAList[];
  };
}
