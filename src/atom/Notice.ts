export interface NoticeResponse {
  notice: [NoticeItem];
}

export interface NoticeItem {
  content: string;
  createdDt: string;
  customerId: string;
  id: number;
  modifiedDt: string;
  title: string;
  views: number;
}

export interface NoticeDetailItem {
  content: string;
  createdDt: string;
  customerId: string;
  id: number;
  modifiedDt: string;
  noticeCommentList: [
    {
      available: string;
      content: string;
      createdDt: string;
      customerId: string;
      id: number;
      modifiedDt: string;
    }
  ];
  title: string;
  views: number;
}
