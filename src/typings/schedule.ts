export interface ISchedule {
  id            : string;
  scheduleName  : string;
  isPublic      : boolean;
  authorId      : string;
  authorUsername: string;
  numOfCol      : number;
  numOfRow      : number;
  createdAt     : string;
  updatedAt     : string;
};

export interface ISchedulePreview {
  id            : string;
  scheduleName  : string;
  isPublic      : boolean;
  authorUsername: string;
};