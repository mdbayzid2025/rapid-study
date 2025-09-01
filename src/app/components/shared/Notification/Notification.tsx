import React, { useEffect, useState } from 'react'
import { Drawer, List, Button, Spin } from "antd";


// Fake API (simulates server-side pagination)
const fakeApi = (page: number, limit: number): Promise<{ data: string[]; hasMore: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 100;
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, total);

      const data = Array.from({ length: end - start }, (_, i) => `Notification ${start + i + 1}`);
      resolve({ data, hasMore: end < total });
    }, 800); // simulate delay
  });
};


export const Notification = ({open, setOpen}:any) => {
     const [notifications, setNotifications] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


      const loadData = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);   
    const res = await fakeApi(pageNum, 10);
    setNotifications((prev) => [...prev, ...res.data]);
    setHasMore(res.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      // reset when open
      setNotifications([]);
      setPage(1);
      setHasMore(true);
      loadData(1);
    }
  }, [open]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 20 && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(nextPage);
    }
  };

  return (
    <>
      <Drawer
        title="Notifications"
        placement="right"
        width={350}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{ height: "calc(100vh - 64px)", overflowY: "auto", padding: "12px" }}
          onScroll={handleScroll}
        >
          <List
            dataSource={notifications}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          {loading && (
            <div style={{ textAlign: "center", padding: 12 }}>
              <Spin />
            </div>
          )}
          {!hasMore && (
            <div style={{ textAlign: "center", padding: 12, color: "#999" }}>
              🎉 All notifications loaded
            </div>
          )}
        </div>
      </Drawer>
    </>
  )
}
