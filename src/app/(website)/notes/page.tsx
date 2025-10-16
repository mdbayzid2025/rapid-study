import Container from "@/app/components/shared/Container/Container";
import Notes from "@/app/components/ui/WebsitePage/Notes/Notes";
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
