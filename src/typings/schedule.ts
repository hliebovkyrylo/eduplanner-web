export interface ISchedule {
  id            : string;
  scheduleName  : string;
  isPublic      : boolean;
  authorId      : string;
  authorUsername: string;
  createdAt     : string;
  updatedAt     : string;
};

export interface ISchedulePreview {
  id            : string;
  scheduleName  : string;
  isPublic      : boolean;
  authorUsername: string;
};