import React from "react";
import { Drawer, List, Avatar, Skeleton, Divider, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import DOMPurify from "dompurify";

export const Notification = ({
  open,
  setOpen,
  notifications,
  hasMore,
  loadMore,
  page,
  loading,
  hadnleReadAll,
}: any) => {
  const getNavigateUrl = (item: any) => {
    return `/${
      item?.type?.toLowerCase() === "note"
        ? "notes"
        : item?.type?.toLowerCase() === "assignment"
        ? "assignments"
        : "events"
    }`;
  };


  return (
    <Drawer
      title={<div className="flex justify-between items-center">
          <span>Notifications</span>
          <Button
            size="small"
            onClick={()=>hadnleReadAll()}            
          >
            Mark all as read
          </Button>
        </div>}
      placement="right"
      width={400}
      onClose={() => setOpen(false)}
      open={open}
    >
      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 100px)", overflow: "auto", padding: "10px 0px" }}
      >
        <InfiniteScroll
          dataLength={notifications.length}
          next={() => loadMore(page)}
          hasMore={hasMore}          
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>No more notifications 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={notifications}
            renderItem={(item: any) => (
              <List.Item key={item?._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item?.image ||
                        "https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
                      }
                      size={25}
                    />
                  }
                  title={
                    <Link
                      href={`${getNavigateUrl(item)}`}
                      className="font-bold text-[14px]"
                    >
                      {item?.title}
                    </Link>
                  }
                  description={
                    <span
                      className="text-slate-500 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.message),
                      }}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Drawer>
  );
};
