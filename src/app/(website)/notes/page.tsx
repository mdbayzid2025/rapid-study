import Container from "@/components/shared/Container/Container";
import Notes from "@/components/UI-InterFace/WebsitePage/Notes/Notes";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading notes...</div>}>
      <div>
        <Container>
          <Notes />
        </Container>
      </div>
    </Suspense>
  );
};

export default Page;
