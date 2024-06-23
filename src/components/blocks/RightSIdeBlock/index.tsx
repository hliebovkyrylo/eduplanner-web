import { StrangerScheduleCard }    from "@components/index";
import { 
  useGetVisitedSchedulesQuery, 
  useRemoveVisitedScheduleMutation 
}                                  from "@redux/api/visitedAPI";
import styles                      from "./rightSideBlock.module.scss";

export const RightSideBlock = () => {
  const { data: visited } = useGetVisitedSchedulesQuery();
  const [removeVisited]   = useRemoveVisitedScheduleMutation();

  const handleRemoveScheduleWrapper = (visitedId: string) => async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    await removeVisited(visitedId);

    window.location.reload();
  };

  return (
    <div className={styles.rightSideCard}>
      <div className={styles.recentlyText}>Have access to</div>
      <div className={styles.schedulesItems}>
        {visited && visited.length > 0 ? (
          visited.map((schedule: any) => (
            <StrangerScheduleCard 
              key={schedule.id}
              id={schedule.id}
              scheduleName={schedule.scheduleName}
              owner={schedule.authorUsername}
              removeSchedule={handleRemoveScheduleWrapper(schedule.id)}
              isPublic={schedule.isPublic}
            />
          ))
        ) : (
          <div className={styles.emptyAccessMessage}>No access available</div>
        )}
      </div>
    </div>
  );
};