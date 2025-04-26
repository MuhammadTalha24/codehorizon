import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const isSignedIn = useAuth();
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);
  const handleStar = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in page or show a message
      return;
    }
    await star({ snippetId });
  };

  return <div>StarButton</div>;
}

export default StarButton;
