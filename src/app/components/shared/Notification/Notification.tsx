import React, { useEffect, useState } from "react";
import { Drawer, List, Avatar, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { getBaseUrl } from "@/urils/baseUrl";

const PAGE_SIZE = 10;

export const Notification = ({ open, setOpen }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ Load one page of data
  const loadMoreData = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${getBaseUrl()}/notifications?page=${pageNum}&limit=${PAGE_SIZE}`
      );
      const newData = await response.json();

      // stop loading if no data
      if (!newData?.data?.length) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newData?.data]);
        if (newData.length < PAGE_SIZE) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load initial data when drawer opens
  useEffect(() => {
    if (open) {
      setData([]);
      setPage(1);
      setHasMore(true);
      loadMoreData(1);
    }
  }, [open]);

  return (
    <Drawer
      title="Notifications"
      placement="right"
      width={400}
      onClose={() => setOpen(false)}
      open={open}
    >
      <div
        id="scrollableDiv"
        style={{
          height: "calc(100vh - 100px)",
          overflow: "auto",
          padding: "10px 0px",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={() => loadMoreData(page)}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item?.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        "https://imgs.search.brave.com/79G2pzWuzqP-HJnPBrBY2PNIICYl_YfBA7RAHhJF_9I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTU2LzExNTY5/NDkucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs"
                      }
                      size={25}
                    />
                  }
                  title={
                    <Link
                      href="https://ant.design"
                      className="font-semibold text-md"
                    >
                      {item?.title}
                    </Link>
                  }
                  description={item?.message}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Drawer>
  );
};
