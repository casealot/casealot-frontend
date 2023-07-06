export type QnA = {
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
};
