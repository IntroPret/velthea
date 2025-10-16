import PersonalizeClient from "./personalize-client";

export default async function PersonalizePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PersonalizeClient id={id} />;
}
